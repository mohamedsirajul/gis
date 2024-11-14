var textStyleCache_building_ppt = {}
var clusterStyleCache_building_ppt = {}
var selectedClusterStyleCache_building_ppt = {}
var style_building_ppt = function(feature, resolution) {

    if (feature.hide === true) {
        return null;
    }

    var value = ""
    var gisId = feature.get("GISID");
    var isSubmitted = window.isGisIdSubmitted && window.isGisIdSubmitted(gisId);
    
    var style = [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(0,0,0,1.0)",
            lineDash: [3],
            width: 0
        }),
        fill: new ol.style.Fill({
            color: isSubmitted ? "rgba(76,175,80,0.8)" : "rgba(255,182,193,1.0)"
        })
    })];
    var selectionStyle = [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: [3],
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })];
    var labelText = feature.get("GISID");
    var key = value + "_" + labelText

    if (!textStyleCache_building_ppt[key]) {
        var text = new ol.style.Text({
            font: '16.5px Calibri,sans-serif',
            text: labelText,
            fill: new ol.style.Fill({
                color: "rgba(0, 0, 0, 255)"
            }),
        });
        textStyleCache_building_ppt[key] = new ol.style.Style({
            "text": text
        });
    }
    var allStyles = [textStyleCache_building_ppt[key]];
    var selected = lyr_building_ppt.selectedFeatures;
    if (selected && selected.indexOf(feature) != -1) {
        allStyles.push.apply(allStyles, selectionStyle);
    } else {
        allStyles.push.apply(allStyles, style);
    }
    return allStyles;
};

window.isGisIdSubmitted = function(gisId) {
    return localStorage.getItem(`building_color_${gisId}`) !== null;
};

window.updateBuildingColor = function(gisId, color) {
    localStorage.setItem(`building_color_${gisId}`, color);
    if (window.lyr_building_ppt) {
        window.lyr_building_ppt.changed();
    }
};

window.getBuildingColor = function(gisId) {
    return localStorage.getItem(`building_color_${gisId}`) || 'rgba(255,182,193,1.0)';
};