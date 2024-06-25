import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import "./dashboard.css";

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const BolderTypography = styled(Typography)({
  fontWeight: "bold",
});

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: "white",
  color: "#000000",
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  height: "100px",
}));

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin_login";
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://luisnellai.xyz/siraj/admin/getAllUsers.php"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center">
        <Alert variant="danger">Error: {error.message}</Alert>
      </Container>
    );
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

  return (
    <Container>
      <h1 className=" my-4">Users</h1>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed">
          <CustomToolbar>
            <BolderTypography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Hello, GIS!
            </BolderTypography>
            <div className="datime">
              <p className="insidedateime">
                {currentTime.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
                | {currentTime.toLocaleTimeString("en-US")}
              </p>
            </div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <AccountCircle style={{ fontSize: "30px" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </CustomToolbar>
        </AppBar>
      </Box>
      <Main
        sx={{
          marginTop: "30px",
          width: "100%",
        }}
      >
        <Row>
          {users.map((user) => (
            <Col key={user.user_id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {user.email}
                    <br />
                    {/* Add more fields as necessary */}
                  </Card.Text>

                  <Button
                    onClick={() => handleCardClick(user.user_id)}
                    style={{ cursor: "pointer" }}
                  >
                    Assign Task
                  </Button>
                  <Button
                    onClick={() => handleviewClick(user.user_id)}
                    style={{ cursor: "pointer" }}
                  >
                    View Task
                  </Button>
                  <Button
                    onClick={() => handleviewSurvey(user.user_id)}
                    style={{ cursor: "pointer" }}
                  >
                    View Survey Data
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Main>
    </Container>
  );
};

export default Users;
