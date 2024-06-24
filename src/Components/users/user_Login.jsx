import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Divider,
  Tag,
  message,
} from "antd";
import jwtDecode from "jwt-decode";

const { Meta } = Card;

const UserLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        "https://luisnellai.xyz/siraj/admin/user_login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const user_token = data.token; // Assuming the API returns a token upon successful login
        localStorage.setItem("user_token", user_token);

        // Decode JWT token if needed
        // const userData = jwtDecode(user_token);
        // localStorage.setItem("Empid", userData.empId);

        // Display success message and navigate to '/prop_details'
        message.success("Logged in successfully", 5);
        navigate("/prop_details"); // Use navigate hook to redirect programmatically
      } else {
        // Server responded with an error status
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      // Display error message if login fails
      message.error(`Unable to login: ${error.message || "Unknown error"}`, 5);
    }
  };

  return (
    <div className="login" style={{ marginTop: "8%" }}>
      <Form
        form={form}
        layout="vertical"
        name="login"
        style={{ width: "100%", display: "block" }}
        size="large"
        scrollToFirstError={{
          behavior: "smooth",
        }}
        onFinish={onFinish}
      >
        <Row gutter={[16, 16]}>
          <Col sm={24} md={8} xxl={9} />
          <Col sm={24} md={8} xxl={6}>
            <Card className="login__card">
              <Meta
                description={
                  <div className="login__detail">
                    <Divider>
                      <Tag color="orange" style={{ fontSize: 14 }}>
                        User Login
                      </Tag>
                    </Divider>
                    <Form.Item
                      name="email"
                      label="Email id"
                      rules={[
                        {
                          required: true,
                          message: "Email id is missing",
                        },
                      ]}
                    >
                      <Input placeholder="Enter email id" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Password is missing",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Enter password" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        size="large"
                        className="login__submit"
                        block
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserLogin;
