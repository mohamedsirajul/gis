import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewSurvey = () => {
  const { user_id } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `https://luisnellai.xyz/siraj/getallbuildingdata.php/${user_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProperties(data.properties || []); // Ensure data.properties is defined or default to an empty array
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user_id]);

  const handleBack = () => {
    window.location.href = "/dashboard/users";
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Back</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {properties.length === 0 ? (
          <Alert severity="info">
            No properties found for user ID {user_id}
          </Alert>
        ) : (
          properties.map((property, index) => (
            <Card
              key={index}
              variant="outlined"
              style={{ marginBottom: "20px" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={`data:image/jpeg;base64,${property.image}`} // Assuming property.image is a base64 encoded image string
                alt={property.BuildingName}
                style={{ width: "300px" }}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Building Name: {property.BuildingName}
                </Typography>
                <Typography>Gisid: {property.Gisid}</Typography>
                <Typography>Total Floors: {property.TotalFloor}</Typography>
                <Typography>
                  Address: {property.address1}, {property.address2}
                </Typography>
                <Typography>Area: {property.area}</Typography>
                <Typography>
                  City: {property.city}, State: {property.state}
                </Typography>
                <Typography>
                  Pin Code: {property.pinCode}, Ward: {property.Ward}
                </Typography>
                <Typography>
                  Property Ownership: {property.property_ownership}
                </Typography>
                <Typography>Building Type: {property.buildingtype}</Typography>
                <Typography>
                  Owner: {property.Owner}, Mobile: {property.Mobile}
                </Typography>
                <Typography>
                  Hoarding: {property.Hoarding}, Mobile Tower:{" "}
                  {property.MobileTower}
                </Typography>
                <Typography>
                  Ramp: {property.ramp}, Area of Plot: {property.areaofplot}
                </Typography>
                <Typography>
                  Head Rooms: {property.headRooms}, Lift Rooms:{" "}
                  {property.liftRooms}
                </Typography>
                <Typography>
                  Location: {property.location}, OHT: {property.oht}, Parking:{" "}
                  {property.parking}
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  style={{ marginTop: "20px" }}
                >
                  Floor Information:
                </Typography>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="building-floor-table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Area</TableCell>
                        <TableCell>Establishment</TableCell>
                        <TableCell>Establishment Name</TableCell>
                        <TableCell>Flat No</TableCell>
                        <TableCell>Floor</TableCell>
                        <TableCell>Occupancy</TableCell>
                        <TableCell>Usage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {property.floorInformation.map((floor, floorIndex) => (
                        <TableRow key={floorIndex}>
                          <TableCell>{floor.area}</TableCell>
                          <TableCell>{floor.establishment}</TableCell>
                          <TableCell>{floor.establishmentName}</TableCell>
                          <TableCell>{floor.flatNo}</TableCell>
                          <TableCell>{floor.floor}</TableCell>
                          <TableCell>{floor.occupancy}</TableCell>
                          <TableCell>{floor.usage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </>
  );
};

export default ViewSurvey;
