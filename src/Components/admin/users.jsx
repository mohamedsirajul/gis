import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Card, Container, Row, Col } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
const Surveyors = () => {
  const [surveyors, setSurveyors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for managing the dialog
  const [openDialog, setOpenDialog] = useState(false);

  // State for form fields
  const [newSurveyor, setNewSurveyor] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  // State for handling success and error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Validation errors state
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [addressError, setAddressError] = useState("");

  // State for managing menu
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  // Fetch surveyor data on component mount
  useEffect(() => {
    fetchSurveyors();
  }, []);

  // Function to fetch surveyor data
  const fetchSurveyors = async () => {
    try {
      const response = await axios.get(
        "https://luisnellai.xyz/siraj/admin/getAllUsers.php"
      );
      setSurveyors(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form fields and validation errors when dialog is closed
    setNewSurveyor({
      name: "",
      email: "",
      password: "",
      mobile: "",
      address: "",
    });
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setMobileError("");
    setAddressError("");
  };

  // Function to handle input change in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSurveyor((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset validation errors when user starts typing
    switch (name) {
      case "name":
        setNameError("");
        break;
      case "email":
        setEmailError("");
        break;
      case "password":
        setPasswordError("");
        break;
      case "mobile":
        setMobileError("");
        break;
      case "address":
        setAddressError("");
        break;
      default:
        break;
    }
  };

  // Function to validate form fields before submission
  const validateForm = () => {
    let isValid = true;

    if (!newSurveyor.name) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!newSurveyor.email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newSurveyor.email)) {
      setEmailError("Email is invalid");
      isValid = false;
    }
    if (!newSurveyor.password) {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (!newSurveyor.mobile) {
      setMobileError("Mobile number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(newSurveyor.mobile)) {
      setMobileError("Mobile number is invalid (must be 10 digits)");
      isValid = false;
    }
    if (!newSurveyor.address) {
      setAddressError("Address is required");
      isValid = false;
    }

    return isValid;
  };

  // Function to handle form submission
  const handleAddSurveyor = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://luisnellai.xyz/siraj/admin/add_user.php",
          newSurveyor
        );
        setSuccessMessage("Surveyor added successfully!");
        handleCloseDialog();
        fetchSurveyors(); // Refresh surveyor list after adding new surveyor
      } catch (error) {
        setErrorMessage("Failed to add surveyor");
        console.error("Error adding surveyor:", error);
      }
    } else {
      setErrorMessage("Please fill in all fields correctly");
    }
  };

  // Function to handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCardClick = (user_id) => {
    // history.push(`/user/${id}`);
    console.log(user_id);
    window.location.href = `/assignTask/${user_id}`;
  };

  const handleviewClick = (user_id) => {
    // history.push(`/user/${id}`);
    console.log(user_id);
    window.location.href = `/viewTask/${user_id}`;
  };

  const handleviewSurvey = (user_id) => {
    // history.push(`/user/${id}`);
    console.log(user_id);
    window.location.href = `/viewSurvey/${user_id}`;
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">Error fetching data: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Surveyor Management
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={menuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <Container>
        {/* Toolbar */}
        {/* Main content */}
        {/* <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "1rem" }}
          onClick={handleOpenDialog}
          endIcon={<AddIcon />}
        >
          Add Surveyor
        </Button> */}
        <Row xs={1} md={2} className="g-4">
          {surveyors.map((surveyor) => (
            <Col key={surveyor.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{surveyor.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {surveyor.email}
                    <br />
                    <strong>Mobile:</strong> {surveyor.mobile}
                    <br />
                    <br />
                    <Button
                      onClick={() => handleCardClick(surveyor.user_id)}
                      style={{ cursor: "pointer" }}
                    >
                      Assign Task
                    </Button>
                    <Button
                      onClick={() => handleviewClick(surveyor.user_id)}
                      style={{ cursor: "pointer" }}
                    >
                      View Task
                    </Button>
                    <Button
                      onClick={() => handleviewSurvey(surveyor.user_id)}
                      style={{ cursor: "pointer" }}
                    >
                      View Survey Data
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* Dialog for adding new surveyor */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Surveyor</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={newSurveyor.name}
              onChange={handleInputChange}
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              value={newSurveyor.email}
              onChange={handleInputChange}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="text"
              fullWidth
              value={newSurveyor.password}
              onChange={handleInputChange}
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              margin="dense"
              id="mobile"
              name="mobile"
              label="Mobile"
              type="text"
              fullWidth
              value={newSurveyor.mobile}
              onChange={handleInputChange}
              error={!!mobileError}
              helperText={mobileError}
            />
            <TextField
              margin="dense"
              id="address"
              name="address"
              label="Address"
              type="text"
              fullWidth
              value={newSurveyor.address}
              onChange={handleInputChange}
              error={!!addressError}
              helperText={addressError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleAddSurveyor}
              variant="contained"
              color="primary"
            >
              Add Surveyor
            </Button>
          </DialogActions>
        </Dialog>
        {/* Success and Error Messages */}
        {successMessage && (
          <Alert severity="success" style={{ marginTop: "1rem" }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" style={{ marginTop: "1rem" }}>
            {errorMessage}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default Surveyors;
