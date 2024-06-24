import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h1 className="text-center my-4">Users</h1>
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
    </Container>
  );
};

export default Users;
