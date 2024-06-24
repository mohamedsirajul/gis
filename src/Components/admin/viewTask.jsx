import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const ViewSurvey = () => {
  const { user_id } = useParams();
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `https://luisnellai.xyz/siraj/admin/get_assigned_task.php/${user_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTask(data.properties); // Assuming data structure { properties: [...] }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user_id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

  return (
    <Container>
      {task.map((property, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: "20px" }}>
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
            <Typography variant="body1">Gisid: {property.Gisid}</Typography>
            <Typography variant="body1">
              Total Floors: {property.TotalFloor}
            </Typography>
            <Typography variant="body1">
              Address: {property.address1}, {property.address2}
            </Typography>
            <Typography variant="body1">Area: {property.area}</Typography>
            <Typography variant="body1">
              City: {property.city}, State: {property.state}
            </Typography>
            <Typography variant="body1">
              Pin Code: {property.pinCode}, Ward: {property.Ward}
            </Typography>
            <Typography variant="body1">
              Property Ownership: {property.property_ownership}
            </Typography>
            <Typography variant="body1">
              Building Type: {property.buildingtype}
            </Typography>
            <Typography variant="body1">
              Owner: {property.Owner}, Mobile: {property.Mobile}
            </Typography>
            <Typography variant="body1">
              Hoarding: {property.Hoarding}, Mobile Tower:{" "}
              {property.MobileTower}
            </Typography>
            <Typography variant="body1">
              Ramp: {property.ramp}, Area of Plot: {property.areaofplot}
            </Typography>
            <Typography variant="body1">
              Head Rooms: {property.headRooms}, Lift Rooms: {property.liftRooms}
            </Typography>
            <Typography variant="body1">
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
              <Table sx={{ minWidth: 650 }} aria-label="building-floor-table">
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
      ))}
    </Container>
  );
};

export default ViewSurvey;
