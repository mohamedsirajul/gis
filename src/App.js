import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Paper,
  Button,
  Button as MuiButton,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const buildingTypeOptions = [
  "Super Structure",
  "Special Building",
  "Vacant Land",
  "Independent Building",
  "Flats in Multi Storied Building",
  "Central Government 33%",
  "Central Government 75%",
  "State Government",
  "Cell Phone Tower",
  "Cinema Theater",
  "Hospital",
  "Hotel / Lodging House",
  "Kalyana Mandapam",
  "Educational Institution",
  "Central Government 50%",
  "Flat",
  "Hostel",
];

const buildingUsedAsOptions = [
  "Mixed",
  "Residential",
  "Commercial",
  "Others",
  "Vacant Land",
];

const PROPERTY_OWNERSHIP = [
  "Mixed",
  "Residential",
  "Commercial",
  "Others",
  "Vacant Land",
];

const PROPERTY_TYPE = [
  "Mixed",
  "Residential",
  "Commercial",
  "Others",
  "Vacant Land",
];

function App() {
  const [data, setData] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [streetOptions, setStreetOptions] = useState([]);
  const [assessmentOptions, setAssessmentOptions] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedStreet, setSelectedStreet] = useState("");
  const [selectedBuildingUsedAs, setSelectedBuildingUsedAs] = useState("");
  const [selectedBillNo, setSelectedBillNo] = useState("");
  const [selectedDoorNo, setselectedDoorNo] = useState("");
  const [selectedOwner, setselectedOwner] = useState("");
  const [selectedAreaodplot, setselectedAreaodplot] = useState("");
  const [selectedmobile, setselectedmobile] = useState("");

  const [floorInformation, setFloorInformation] = useState([
    {
      id: 1,
      floor: "",
      area: "",
      usage: "",
      occupancy: "",
      flatNo: "",
      establishment: "",
      establishmentName: "",
    },
  ]);

  const addFloorInformation = () => {
    const newId = floorInformation.length + 1;
    setFloorInformation([
      ...floorInformation,
      {
        id: newId,
        floor: "",
        area: "",
        usage: "",
        occupancy: "",
        flatNo: "",
        establishment: "",
        establishmentName: "",
      },
    ]);
  };

  const handleFloorChange = (id, event) => {
    const updatedFloorInfo = floorInformation.map((item) =>
      item.id === id
        ? { ...item, [event.target.name]: event.target.value }
        : item
    );
    setFloorInformation(updatedFloorInfo);
  };

  const deleteFloorInformation = (id) => {
    const updatedFloorInfo = floorInformation.filter((item) => item.id !== id);
    setFloorInformation(updatedFloorInfo);
  };

  useEffect(() => {
    if (selectedBillNo) {
      console.log(selectedBillNo);

      fetch("https://luisnellai.xyz/siraj/getbybillno.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ billnum: selectedBillNo }),
      })
        .then((response) => response.json())
        .then((datas) => {
          // console.log(datas);

          let data = datas;
          console.log(data);
          console.log(data.NewDoorNo);
          setselectedDoorNo(data.NewDoorNo);
          setselectedOwner(data.Owner_name);
          setselectedAreaodplot(data.PlotArea);
          setselectedmobile(data.Mobileno);
        })
        .catch((error) => {
          console.error("Error sending POST request:", error);
        });
    }
  }, [selectedBillNo]);

  useEffect(() => {
    // Fetch data from API
    fetch("https://luisnellai.xyz/siraj/getproperty.php")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const uniqueWards = [...new Set(data.map((item) => item.WardName))];
        setWardOptions(uniqueWards);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedWard) {
      const streets = data
        .filter((item) => item.WardName === selectedWard)
        .map((item) => item.StreetName);
      const uniqueStreets = [...new Set(streets)];
      setStreetOptions(uniqueStreets);
      setSelectedStreet(""); // Reset street selection
      setAssessmentOptions([]); // Reset assessment numbers
    }
  }, [selectedWard, data]);

  useEffect(() => {
    if (selectedStreet) {
      const assessments = data
        .filter((item) => item.StreetName === selectedStreet)
        .map((item) => item.AssesmentNo);
      setAssessmentOptions(assessments);
    }
  }, [selectedStreet, data]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GIS</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
          <Typography variant="h5">Heading Location</Typography>
          <Box mt={3}>
            <Row>
              <Col md={4} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="Zone" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={4} className="mt-3">
                <FormControl fullWidth>
                  <InputLabel>Ward</InputLabel>
                  <Select
                    label="Ward"
                    variant="outlined"
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                  >
                    {wardOptions.map((ward) => (
                      <MenuItem key={ward} value={ward}>
                        {ward}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
              <Col md={4} className="mt-3">
                <FormControl fullWidth>
                  <InputLabel>Street Name</InputLabel>
                  <Select
                    label="Street Name"
                    variant="outlined"
                    value={selectedStreet}
                    onChange={(e) => setSelectedStreet(e.target.value)}
                    disabled={!selectedWard}
                  >
                    {streetOptions.map((street) => (
                      <MenuItem key={street} value={street}>
                        {street}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
            </Row>
          </Box>
        </Paper>
        <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
          <Typography variant="h5">Property Information</Typography>
          <Box mt={3}>
            <Row className="mt-3">
              <Col md={6}>
                <FormControl fullWidth className="mt-3">
                  <InputLabel>Property Ownership</InputLabel>
                  <Select label="Building Type">
                    {PROPERTY_OWNERSHIP.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
              <Col md={6}>
                <FormControl fullWidth className="mt-3">
                  <InputLabel>Building Type</InputLabel>
                  <Select label="Building Type">
                    {buildingTypeOptions.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={12}>
                <FormControl component="fieldset">
                  <RadioGroup row aria-label="status" name="status">
                    <FormControlLabel
                      value="active"
                      control={<Radio />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="new"
                      control={<Radio />}
                      label="New"
                    />
                    <FormControlLabel
                      value="inactive"
                      control={<Radio />}
                      label="Inactive"
                    />
                    <FormControlLabel
                      value="completed"
                      control={<Radio />}
                      label="Completed"
                    />
                  </RadioGroup>
                </FormControl>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={4} className="mt-3">
                <FormControl fullWidth>
                  <InputLabel>Bill No</InputLabel>
                  <Select
                    label="Bill No"
                    variant="outlined"
                    onChange={(e) => setSelectedBillNo(e.target.value)}
                    disabled={!selectedStreet}
                  >
                    {assessmentOptions.map((assessment) => (
                      <MenuItem key={assessment} value={assessment}>
                        {assessment}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth variant="outlined">
                  <TextField
                    label="New Door Number"
                    value={selectedDoorNo}
                    variant="outlined"
                  />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="GIS ID" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <InputLabel>Building Used As</InputLabel>
                  <Select
                    label="Building Used As"
                    variant="outlined"
                    value={selectedBuildingUsedAs}
                    onChange={(e) => setSelectedBuildingUsedAs(e.target.value)}
                  >
                    {buildingUsedAsOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField
                    label="Name of Assessee"
                    variant="outlined"
                    value={selectedOwner}
                  />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="Building Name" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="Total Floor" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField
                    label="Area of Plot"
                    variant="outlined"
                    value={selectedAreaodplot}
                  />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    value={selectedmobile}
                  />
                </FormControl>
              </Col>
            </Row>
          </Box>
        </Paper>
        <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
          <Typography variant="h5">Address Details</Typography>
          <Box mt={3}>
            <Row>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="Address 1" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="Address 2" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="Area" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="Location" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="City" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="State" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="Pincode" variant="outlined" />
                </FormControl>
              </Col>
            </Row>
          </Box>
        </Paper>
        {floorInformation.map((item, index) => (
          <Paper
            elevation={3}
            style={{ padding: "20px", margin: "20px 0" }}
            key={item.id}
          >
            <Typography variant="h5">Floor Information</Typography>

            <Typography variant="h6">Floor Data {index + 1}</Typography>
            <Box mt={3}>
              <Row>
                <Col md={6} className="mt-3">
                  <FormControl fullWidth>
                    <TextField
                      name="floor"
                      label="Floor"
                      variant="outlined"
                      value={item.floor}
                      onChange={(e) => handleFloorChange(item.id, e)}
                    />
                  </FormControl>
                </Col>
                <Col md={6} className="mt-3">
                  <FormControl fullWidth>
                    <TextField
                      name="area"
                      label="Area"
                      variant="outlined"
                      value={item.area}
                      onChange={(e) => handleFloorChange(item.id, e)}
                    />
                  </FormControl>
                </Col>
                <Col md={6} className="mt-3">
                  <FormControl fullWidth>
                    <TextField
                      name="usage"
                      label="Usage"
                      variant="outlined"
                      value={item.usage}
                      onChange={(e) => handleFloorChange(item.id, e)}
                    />
                  </FormControl>
                </Col>
                <Col md={6} className="mt-3">
                  <FormControl fullWidth>
                    <TextField
                      name="occupancy"
                      label="Occupancy"
                      variant="outlined"
                      value={item.occupancy}
                      onChange={(e) => handleFloorChange(item.id, e)}
                    />
                  </FormControl>
                </Col>
                <Col md={6} className="mt-3">
                  <FormControl fullWidth>
                    <TextField
                      name="flatNo"
                      label="Flat No."
                      variant="outlined"
                      value={item.flatNo}
                      onChange={(e) => handleFloorChange(item.id, e)}
                    />
                  </FormControl>
                </Col>
                <Col md={6} className="mt-3">
                  <FormControl fullWidth>
                    <TextField
                      name="establishment"
                      label="Establishment"
                      variant="outlined"
                      value={item.establishment}
                      onChange={(e) => handleFloorChange(item.id, e)}
                    />
                  </FormControl>
                </Col>
                <Col md={6} className="mt-3">
                  <FormControl fullWidth>
                    <TextField
                      name="establishmentName"
                      label="Establishment Name"
                      variant="outlined"
                      value={item.establishmentName}
                      onChange={(e) => handleFloorChange(item.id, e)}
                    />
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mt-3">
                  {index > 0 && (
                    <IconButton
                      color="secondary"
                      onClick={() => deleteFloorInformation(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Col>
                <Col md={12} className="mt-3">
                  <Button onClick={addFloorInformation}>
                    Add Floor Data
                    <AddIcon />
                  </Button>
                </Col>
              </Row>
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end"></Box>
          </Paper>
        ))}

        <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
          <Typography variant="h5">Facility</Typography>
          <Box mt={3}>
            <Row>
              <Col md={6}>
                <FormControl component="fieldset">
                  <RadioGroup row aria-label="hoarding" name="hoarding">
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Hoarding Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="Hoarding No"
                    />
                  </RadioGroup>
                </FormControl>
              </Col>
              <Col md={6}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="mobile_phone_tower"
                    name="mobile_phone_tower"
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Mobile Phone Tower Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="Mobile Phone Tower No"
                    />
                  </RadioGroup>
                </FormControl>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="No. of Head Rooms" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="No. of Lift Rooms" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="Parking" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="Ramp" variant="outlined" />
                </FormControl>
              </Col>
              <Col md={6} className="mt-3">
                <FormControl fullWidth>
                  <TextField label="OHT" variant="outlined" />
                </FormControl>
              </Col>
            </Row>
          </Box>
        </Paper>
        <Box mt={4} textAlign="center">
          <MuiButton variant="contained" color="primary">
            Submit
          </MuiButton>
        </Box>
      </Container>
    </div>
  );
}

export default App;
