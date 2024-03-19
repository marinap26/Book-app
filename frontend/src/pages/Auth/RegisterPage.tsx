import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";

import { message } from "antd";
import styles from "./Auth.module.css";
import useAuth from "../../hooks/useAuth";
import useAuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {register} = useAuthService()

  const onFinish = async (values: any) => {
    const { username, password } = values;
    try {
      await register(username, password);
      navigate("/login");
    } catch (error) {
      message.error("Registration failed!");
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
          <Button style={{backgroundColor:"#001529", color:"#F2EFEA"}} htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterPage;
