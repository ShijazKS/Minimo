import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      setLoading(true);

      await axios.post("/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something missed!");
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="signup-page flex min-h-screen flex-col items-center justify-between md:p-20 md:py-36 py-20 ">
      <div className="sign bg-gradient-to-r from-amber-500 to-pink-500 shadow-xl p-4 rounded-lg bg-white">
        <div className="py-10 bg-white rounded-xl md:px-8">
          <h2 className="font-bold text-3xl text-center mb-4">Sign Up</h2>
          <div className="px-8">
            <Form
              name="basic"
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
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="name"
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
                wrapperCol={{
                  xs: { span: 16, offset: 7 },
                  md: { span: 16, offset: 9 }, // Medium screen offset
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="text-sm font-bold leading-none text-white transition duration-300 hover:bg-purple-700 focus:ring-4 focus:ring-purple-100 bg-purple-500"
                >
                  Register {loading && <Spin />}
                </Button>
              </Form.Item>
              <p className="text-md text-center leading-relaxed text-gray-900">
                Already registered ?{" "}
                <Link to="/login" className="font-bold text-blue-700">
                  Sign In
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
