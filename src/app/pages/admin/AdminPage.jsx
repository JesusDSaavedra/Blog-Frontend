import React from "react";
import { Col, Row } from "antd";

import "./scss/admin.scss";

import { Avatar, Button, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import LayoutApp from "../../components/layout/Layout";
import { useRef } from "react";
import { TweenOneGroup } from "rc-tween-one";
import { Input } from "antd";
import { Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, UsergroupDeleteOutlined, UserOutlined } from "@ant-design/icons";
import useAdminViewModel from "./view-model/admin.view-model";
import Actions from "./Actions";

export const AdminPage = () => {


  const { users, initLoading, deleteUser, openCurrentDelete, setOpenCurrentDelete} = useAdminViewModel();

  // const { token } = theme.useToken();
  const [tags, setTags] = useState(["Tag 1", "Tag 2", "Tag 3"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
        style={{ fontSize: '15px', borderColor: '#9013FE', margin: '10px', padding: '5px 12px', fontWeight: 'bold'}}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  const tagPlusStyle = {
    background: "#fff",
    border: '1px dashed #9013FE',
    width: '100px',
    padding: '2px',
    textAlign: 'center',
    alignItems: 'center',
  };

  const checkActions = (array, user) => {
    return array.map((arr) => (
      <Actions
        action={arr}
        user={user}
        deleteUser={deleteUser}
        setOpenCurrentDelete={setOpenCurrentDelete}
        openCurrentDelete={openCurrentDelete}
      />
    ));
  };

  return (
    <LayoutApp>
      <Row style={{ color: "#000", padding: "15px 0", height: "90Vh", width: '100%' }}>
        <Col 
          span={12}
          style={{ padding: "0 50px", textAlign: 'center'}} 
        >
          <h4>ADMINISTRAR CATEGORIAS</h4>
          <>
            <div style={{ marginBottom: 16 }} className='container-categories'>
              <TweenOneGroup
                enter={{
                  scale: 0.8,
                  opacity: 0,
                  type: "from",
                  duration: 100,
                }}
                onEnd={(e) => {
                  if (e.type === "appear" || e.type === "enter") {
                    e.target.style = "display: inline-block";
                  }
                }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                appear={false}
              >
                {tagChild}
              </TweenOneGroup>
            </div>
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag onClick={showInput} style={tagPlusStyle}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </>
        </Col>
        <Col
          span={12}
          style={{ padding: "0 50px", borderLeft: "1px solid #c3c3c3", textAlign: 'center' }}
        >
          <div className="container-users">
            <h4>USUARIOS</h4>
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={users}
              renderItem={(user) => (
                <List.Item
                  style={{ textAlign: "initial" }}
                  actions={checkActions(user.actions, user)}
                >
                  <Skeleton 
                    avatar
                    title={false}
                    loading={initLoading} 
                    active>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                              size="large"
                              style={{ backgroundColor: "#2b2d42" }}
                              icon={<UserOutlined />}
                        />
                      }
                      title={<a href="https://ant.design">{user.name}</a>}
                      description={user.email}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </LayoutApp>
  );
};
