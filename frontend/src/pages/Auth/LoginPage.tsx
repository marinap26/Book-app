import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";

import { message } from "antd";
import styles from "./Auth.module.css";
import useAuth from "../../hooks/useAuth";
import useAuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuthService();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { username, password } = values;
    try {
      await login(username, password);
      navigate("/books");
    } catch (error) {
      message.error("Failed to login!");
    }
  };

  return (
    <div className={styles.container}>
      <Form
        style={{ width: 480 }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Username required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password required!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div className={styles.buttons}>
            <Button htmlType="submit" style={{backgroundColor:"#001529", color:"#F2EFEA"}}>
              Login
            </Button>
            <Button onClick={() => navigate("/register")} style={{backgroundColor:"#001529", color:"#F2EFEA",}}>
              Register
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
