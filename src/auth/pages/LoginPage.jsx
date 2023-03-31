import React from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import { startLoginWithEmailPassword } from "../../store/auth/thunks";

export const LoginPage = () => {
  const dispatch = useDispatch();

  const onFinish = ({ email, password }) => {
    // console.log("Received values of form: ", values);

    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  return (
    <div className="container-form">
      <h3>INGRESAR</h3>
      <div className="form">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Porfavor introduzca su correo!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Correo"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Porfavor introduzca su contraseña!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Ingresar
            </Button>
            <div>
              O <a href="/register">Registrar ahora!</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
