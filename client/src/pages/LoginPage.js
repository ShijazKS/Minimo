import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login Successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("invalid username or password");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-page flex min-h-screen flex-col items-center justify-between md:p-20 md:py-36 py-20 ">
      <div className="sign bg-gradient-to-r from-fuchsia-500 to-cyan-500 shadow-lg p-4 rounded-lg bg-white">
        <div className="py-10 bg-white rounded-xl md:px-8">
          <h2 className="font-bold text-3xl text-center mb-4">Sign In</h2>
          <div className="px-8">
            <Form
              name="basic"
              layout="vertical"
              labelCol={{
                span: 16,
              }}
              wrapperCol={{
                span: 24,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input size="large" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 1,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  xs: { span: 16, offset: 8 },
                  md: { span: 16, offset: 9 },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="text-sm font-bold leading-none text-white transition duration-300 hover:bg-purple-700 focus:ring-4 focus:ring-purple-100 bg-purple-500 p-2"
                >
                  Sign In {loading && <Spin />}
                </Button>
              </Form.Item>
              <p className="text-md text-center leading-relaxed text-gray-900">
                Not registered yet?{" "}
                <Link to="/signup" className="font-bold text-blue-700">
                  Create an Account
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
