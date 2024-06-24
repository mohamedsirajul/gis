import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const BuildingTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://luisnellai.xyz/siraj/getallbuildingdata.php")
      .then((response) => {
        setData(response.data.properties);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      {data.map((property, index) => (
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
    </div>
  );
};

export default BuildingTable;
