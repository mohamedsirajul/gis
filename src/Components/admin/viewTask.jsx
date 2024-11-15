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
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

const ViewSurvey = () => {
  const { user_id } = useParams();
  const [tasks, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedStreet, setSelectedStreet] = useState("");
  const [removing, setRemoving] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `https://terralensinnovations.com/siraj/admin/get_assigned_task.php/${user_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTask(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user_id]);

  const handleEditClick = () => {
    setSelectedWard("");
    setSelectedStreet("");
    setOpenDialog(true);
  };

  const handleRemove = async () => {
    if (!selectedWard || !selectedStreet) {
      setNotification({ open: true, message: 'Please select ward and street', severity: 'error' });
      return;
    }

    setRemoving(true);
    try {
      const tasksToRemove = tasks.filter(task => 
        task.WardName === selectedWard && 
        task.StreetName === selectedStreet
      );

      const userId = tasksToRemove[0]?.user_id;
      
      const assessmentNumbers = tasksToRemove.map(task => task.AssesmentNo);

      const response = await fetch('https://terralensinnovations.com/siraj/admin/remove_assinedtask.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          ward_name: selectedWard,
          street_name: selectedStreet,
          assessment_numbers: assessmentNumbers,
        }),
      });

      if (response.ok) {
        setNotification({ open: true, message: 'Tasks removed successfully', severity: 'success' });
        await fetchTasks();
        setOpenDialog(false);
      } else {
        setNotification({ open: true, message: 'Failed to remove tasks', severity: 'error' });
      }
    } catch (error) {
      console.error('Error removing tasks:', error);
      setNotification({ open: true, message: 'Error removing tasks', severity: 'error' });
    } finally {
      setRemoving(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

  const handleBack = () => {
    window.location.href = "/users";
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Assigned Task Information</Typography>
        </Toolbar>
      </AppBar>
      <br />
      <Container>
        <Card variant="outlined" style={{ marginTop: "20px" }}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Typography variant="h6" component="h3">
                Assigned Task Information
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleEditClick}
              >
                Edit Assigned Task
              </Button>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="building-table">
                <TableHead>
                  <TableRow>
                    <TableCell>User Id</TableCell>
                    <TableCell>Ward Name</TableCell>
                    <TableCell>Street Name</TableCell>
                    <TableCell>Assessment No</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((property, index) => (
                    <TableRow key={index}>
                      <TableCell>{property.user_id}</TableCell>
                      <TableCell>{property.WardName}</TableCell>
                      <TableCell>{property.StreetName}</TableCell>
                      <TableCell>{property.AssesmentNo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog 
              open={openDialog} 
              onClose={() => setOpenDialog(false)}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Edit Assigned Task</DialogTitle>
              <DialogContent>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Ward</InputLabel>
                  <Select
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                  >
                    {[...new Set(tasks.map(task => task.WardName))].map((ward) => (
                      <MenuItem key={ward} value={ward}>
                        {ward}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Street</InputLabel>
                  <Select
                    value={selectedStreet}
                    onChange={(e) => setSelectedStreet(e.target.value)}
                    disabled={!selectedWard}
                  >
                    {tasks
                      .filter(task => task.WardName === selectedWard)
                      .map(task => task.StreetName)
                      .filter((street, index, self) => self.indexOf(street) === index)
                      .map((street) => (
                        <MenuItem key={street} value={street}>
                          {street}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} disabled={removing}>Cancel</Button>
                <Button 
                  onClick={handleRemove} 
                  color="error"
                  disabled={!selectedWard || !selectedStreet || removing}
                >
                  {removing ? <CircularProgress size={24} /> : 'Remove Street Tasks'}
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
      />
    </>
  );
};

export default ViewSurvey;
