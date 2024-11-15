var textStyleCache_building_ppt = {}
var clusterStyleCache_building_ppt = {}
var selectedClusterStyleCache_building_ppt = {}



// Function to get the color for a given GISID
window.getBuildingColor = function(gisId) {
    try {
        // Convert gisId to string to ensure consistent comparison
        gisId = String(gisId);
        
        // Get and parse the green GISIDs from localStorage
        const greenGisIdsString = localStorage.getItem('submitted_gisid');
        const greenGisIds = greenGisIdsString ? JSON.parse(greenGisIdsString) : [];
        
        // Debug logging
        console.log('Green GIS IDs:', greenGisIds);
        console.log('Current GIS ID:', gisId);
        console.log('Is included:', greenGisIds.includes(gisId));
        
        // Check if the gisId is in the greenGisIds array
        if (greenGisIds && Array.isArray(greenGisIds) && greenGisIds.includes(gisId)) {
            return 'rgba(0,255,0,1.0)';  // Green color
        }
        
        return 'rgba(255,182,193,1.0)';  // Default light red color
    } catch (error) {
        console.error('Error in getBuildingColor:', error);
        return 'rgba(255,182,193,1.0)';  // Default color in case of error
    }
};

// Function to initialize green GIS IDs if not already set
window.initializeGreenGisIds = function() {
    if (!localStorage.getItem('building_color_green_gisIds')) {
        const initialGisIds = ["380", "390", "123", "456"];
        localStorage.setItem('building_color_green_gisIds', JSON.stringify(initialGisIds));
    }
};

// Style function for buildings
var style_building_ppt = function(feature, resolution) {
    if (feature.hide === true) {
        return null;
    }

    var gisId = feature.get("GISID");
    
    // Get color from the getBuildingColor function
    var buildingColor = window.getBuildingColor(gisId);
    
    var style = [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(0,0,0,1.0)",
            lineDash: [3],
            width: 0
        }),
        fill: new ol.style.Fill({
            color: buildingColor
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

    // Add labels
    var labelText = feature.get("GISID");
    var key = labelText;

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
    if (selected && selected.indexOf(feature) !== -1) {
        allStyles.push.apply(allStyles, selectionStyle);
    } else {
        allStyles.push.apply(allStyles, style);
    }
    
    return allStyles;
};

// Utility functions to manage green GIS IDs
window.addGreenGisId = function(gisId) {
    gisId = String(gisId);
    const greenGisIds = JSON.parse(localStorage.getItem('building_color_green_gisIds') || '[]');
    if (!greenGisIds.includes(gisId)) {
        greenGisIds.push(gisId);
        localStorage.setItem('building_color_green_gisIds', JSON.stringify(greenGisIds));
        if (window.lyr_building_ppt) {
            window.lyr_building_ppt.changed();
        }
    }
};

window.removeGreenGisId = function(gisId) {
    gisId = String(gisId);
    const greenGisIds = JSON.parse(localStorage.getItem('building_color_green_gisIds') || '[]');
    const index = greenGisIds.indexOf(gisId);
    if (index > -1) {
        greenGisIds.splice(index, 1);
        localStorage.setItem('building_color_green_gisIds', JSON.stringify(greenGisIds));
        if (window.lyr_building_ppt) {
            window.lyr_building_ppt.changed();
        }
    }
};

// Utility function to check if a GISID has a custom color set
window.isGisIdSubmitted = function(gisId) {
    return localStorage.getItem(`building_color_${gisId}`) !== null || window.isGreenGisId(gisId);
};