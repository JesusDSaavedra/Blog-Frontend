import React from 'react'
import {
  Button,
  Form,
  Input,
} from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

import './LoginPage.css';



export const RegisterPage = () => {

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className='container-form'>
    <h3>REGISTRAR</h3>
    <div className="form">
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="nickname"
        rules={[
          {
            required: true,
            message: 'Porfavor ingrese su nombre!',
            whitespace: true,
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre"/>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'La entrada no es válida!',
          },
          {
            required: true,
            message: 'Porfavor ingrese su correo!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Correo" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Porfavor ingrese su contraseña!',
          },
        ]}
        hasFeedback
      >
        <Input.Password 
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Porfavor confirme su contraseña!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password 
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirmar contraseña"
        />
      </Form.Item>


      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: 'Porfavor ingrese su numero telefonico!',
          },
        ]}
      >
        <Input
          prefix={<PhoneOutlined rotate={90} className="site-form-item-icon" />} placeholder="Telefono"
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="register-form-button">
          Registrar
        </Button>
        <div>
          O <a href="/login">Ingresar ahora!</a>
        </div>
      </Form.Item>
    </Form>
    </div>
  </div>
  )
}
