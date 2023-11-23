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
  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate("/");
    }
  },[navigate]);

  return (
    <div className="bg-blue-200 flex min-h-screen flex-col items-center justify-between p-24">
      {/* <h1>hi</h1> */}
      <div className="rounded-md bg-white flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable py-10">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex iteoms-center xl:p-10">
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
              <h3 className="mb-3 text-4xl font-extrabold text-center text-dark-grey-900">
                Sign Up
              </h3>
              <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-gray-900 bg-gray-100 hover:bg-gray-300  focus:ring-4 focus:ring-gray-300">
                <img
                  className="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt=""
                />
                Sign up with Google
              </a>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-gray-400 grow" />
                <p className="mx-4 text-gray-500">or</p>
                <hr className="h-0 border-b border-solid border-gray-400 grow" />
              </div>
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

              {/* <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  // disabled='true'
                  htmlType="submit"
                  className="text-sm font-bold leading-none text-white transition duration-300 hover:bg-purple-700 focus:ring-4 focus:ring-purple-100 bg-purple-500"
                >
                  Register {loading && <Spin/>}
                </Button>
              </Form.Item>
              <p className="text-sm text-center leading-relaxed text-gray-900">
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
