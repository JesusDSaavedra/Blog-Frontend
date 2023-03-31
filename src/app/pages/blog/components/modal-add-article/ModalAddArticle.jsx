import React from "react";
import { Button, Modal } from "antd";

import {
  AutoComplete,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import useModalAddArticleViewModel from "./view-model/modal-add-article.view-model";

const { Option } = Select;

export const ModalAddArticle = ({
  isModalOpen,
  handleOk,
  handleCancel,
  categories,
  setAddNewArticle,
}) => {
  const { form, onFinish } = useModalAddArticleViewModel(
    handleCancel,
    setAddNewArticle
  );
  // const categoriesWithoutAll = [...categories].slice(1)

  return (
    <>
      <Modal
        title="CREAR ARTICULO"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
        footer={null}
        centered
      >
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
            padding: "30px",
          }}
        >
          <Form.Item
            name="id_category"
            rules={[
              {
                required: true,
                message: "Porfavor seleccione la  categoria!",
              },
            ]}
          >
            <Select placeholder="Selecciona la categoria">
              {categories.map((category) => {
                return (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Porfavor ingrese el titulo!",
                whitespace: true,
              },
              {
                pattern: /^[a-zA-Z0-9 ]*$/,
                message: "No debes inluir caracteres especiales",
              },
            ]}
          >
            <Input placeholder="Titulo" />
          </Form.Item>

          <Form.Item
            name="small_text"
            rules={[
              {
                required: true,
                message: "Porfavor ingrese un Introduccion corta",
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 2 }}
              showCount
              maxLength={400}
              placeholder="Introduccion"
            />
          </Form.Item>

          <Form.Item
            name="long_text"
            rules={[
              {
                required: true,
                message: "Porfavor ingrese la describcion",
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 5, maxRows: 5 }}
              showCount
              maxLength={4000}
              placeholder="Descripcion"
            />
          </Form.Item>

          <Form.Item
            name="url_image"
            rules={[
              { required: true, message: "Ingrese la url de la imagen" },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
          >
            <Input placeholder="URL Imagen" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Publicar
          </Button>
        </Form>
      </Modal>
    </>
  );
};
