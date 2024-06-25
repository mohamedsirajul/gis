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
import jwtDecode from "jwt-decode"; // Correct import statement for jwt-decode

const { Meta } = Card;

const UserLogin = () => {
  const [form] = Form.useForm(); // Correct usage of useForm outside the component

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

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      console.log(data);
      const user_token = data.token; // Assuming the API returns a token upon successful login
      localStorage.setItem("user_token", user_token);

      //   Decoding JWT token to get employee data
      //   const userData = jwtDecode(token);
      // localStorage.setItem("Empid", empData.empId);

      // Display success message and navigate to '/assigntask'
      message.success("Logged in successfully", 5);
      window.location.href = "/prop_details";
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
