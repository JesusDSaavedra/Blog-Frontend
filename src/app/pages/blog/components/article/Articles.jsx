import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, FloatButton, Segmented, Tag } from "antd";
const { Meta } = Card;

import { ModalAddArticle } from "../modal-add-article/ModalAddArticle";
import useBlogViewModel from "../../view-model/blog.view-model";
import Actions from "../Actions";

export const Articles = () => {
  const {
    showModal,
    handleOk,
    handleCancel,
    isModalOpen,
    statesCategories,
    statesArticles,
    setAddNewArticle,
    articlesVisible,
    deleteArticle,
    segmentValue,
    setOpenCurrentDelete,
    onChangeSegment,
    openCurrentDelete,
    openArticle,
  } = useBlogViewModel();

  const checkActions = (array, article) => {
    return array.map((arr) => (
      <Actions
        action={arr}
        article={article}
        deleteArticle={deleteArticle}
        setOpenCurrentDelete={setOpenCurrentDelete}
        openCurrentDelete={openCurrentDelete}
      />
    ));
  };

  return (
    <>
      <div className="">
        {!statesCategories.loading ? (
          <div style={{ color: "black" }}>Cargando...</div>
        ) : (
          <Segmented
            options={statesCategories.categoriesSort}
            onChange={(e) => onChangeSegment(e)}
            value={segmentValue}
          />
        )}
      </div>
      <div className="container-articles">
        {statesArticles.loading ? (
          <div style={{ color: "black" }}>Cargando...</div>
        ) : (
          articlesVisible.map((article) => {

            console.log(article.actions)
            return (
              <Badge.Ribbon
                key={article._id}
                text={article.nameCategory}
                color="volcano"
              >
                <Card
                  style={{
                    width: 400,
                  }}
                  cover={
                    <img
                      alt="image"
                      src={article.url_image}
                      onClick={() => openArticle(article.slug)}
                    />
                  }
                  actions={checkActions(article.actions, article)}
                >
                  <Meta
                    title={article.title}
                    description={article.small_text}
                  />
                </Card>
              </Badge.Ribbon>
            );
          })
        )}
      </div>
      <FloatButton
        onClick={showModal}
        icon={<PlusOutlined />}
        type="primary"
        style={{ right: 24 }}
      />
      <ModalAddArticle
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        categories={statesCategories && statesCategories.categoriesApi}
        setAddNewArticle={setAddNewArticle}
      />
    </>
  );
};

export default Articles;
