import {
  DeleteOutlined,
  HeartFilled,
  HeartOutlined,
  LeftCircleOutlined,
  UserOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { Badge } from "antd";
import { Popconfirm, Statistic } from "antd";
import { Spin } from "antd";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  List,
  Row,
  Space,
  Tag,
} from "antd";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";
import LayoutApp from "../../components/layout/Layout";

import "./scss/article.scss";
import useArticleViewModel from "./view-model/article.view-model";

export const ArticlePage = () => {
  const {
    form,
    favorite,
    onFinishComment,
    article,
    comments,
    deleteComment,
    checkLike,
    articlesSort,
    type,
    handleBack,
    openArticle,
    id,
  } = useArticleViewModel();

  return (
    <LayoutApp>
      <Row
        style={{ color: "#000", flexFlow: "initial" }}
        className="containerPage"
      >
        <Col span={18} style={{ padding: "20px 50px" }}>
          {article.loading ? (
            <div>
              Cargando...
              <Spin size="large" />
            </div>
          ) : (
            article &&
            article.article && (
              <>
                <div className="containerArrow" onClick={() => handleBack()}>
                  <LeftCircleOutlined
                    style={{
                      fontSize: "35px",
                      color: "#9013FE",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div className="containerActions">
                  <p className="right">
                    {`Fecha de creacion: ${article.article.creation_date}`}
                  </p>
                  <div className="tag-like">
                    <Tag className="left" color="geekblue">
                      CIENCIA
                    </Tag>
                    <div className="favorite" onClick={() => checkLike()}>
                      <Statistic
                        value={favorite && favorite.value}
                        prefix={
                          favorite.like ? (
                            <HeartFilled
                              className="icon"
                              style={{ fontSize: "20px", color: "#c62626" }}
                            />
                          ) : (
                            <HeartOutlined
                              className="icon"
                              twoToneColor="#eb2f96"
                              style={{ fontSize: "20px", color: "#c62626" }}
                            />
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="containerTitle">
                  <h2 className="title">{article.article.title}</h2>
                </div>
                <div className="content">
                  <img
                    src={article.article.url_image}
                    alt="Imagen del artículo"
                  />
                  <div className="text">
                    <p>{article.article.small_text}</p>
                  </div>
                  <div className="long-text">
                    <p>{article.article.long_text}</p>
                  </div>
                </div>
                <div
                  style={{ textAlign: "initial" }}
                  className="containerComments"
                >
                  <Divider
                    orientation="left"
                    style={{ borderBlockStart: "0 rgba(5, 5, 5, 0.2)" }}
                  >
                    Comentarios
                  </Divider>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinishComment}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="comment"
                      rules={[
                        {
                          required: true,
                          message: "Porfavor introduzca un comentario!",
                        },
                        { type: "string" },
                        { type: "string", min: 1 },
                      ]}
                    >
                      <TextArea
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        showCount
                        maxLength={100}
                        // onChange={onChange}
                        placeholder="Escribe un comentario"
                        style={{ lineHeight: "2" }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Space>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                  <List
                    dataSource={comments.reverse()}
                    renderItem={(comment) => (
                      <List.Item
                        actions={
                          (type === 1 || id === comment.creator) && [
                            <Popconfirm
                              title="Deseas eliminar el comentario?"
                              icon={
                                <WarningFilled style={{ color: "#c62626" }} />
                              }
                              onConfirm={() => deleteComment(comment.id_date)}
                              cancelText="No"
                              okText="Si"
                            >
                              <DeleteOutlined key="delete" />
                            </Popconfirm>,
                          ]
                        }
                        key={comment.id_date}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              size="large"
                              style={{ backgroundColor: "#2b2d42" }}
                              icon={<UserOutlined />}
                            />
                          }
                          title={
                            <a href="https://ant.design">{comment.name}</a>
                          }
                          description={comment.content}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </>
            )
          )}
        </Col>
        <Divider
          style={{
            borderInlineStart: "1px solid #00000050",
            margin: "10px 0px",
            height: "auto",
          }}
          type="vertical"
        />
        <Col span={6} style={{ padding: "20px" }} className="otherArticles">
          {articlesSort &&
            articlesSort.map((articleSort) => {
              return (
                <Badge.Ribbon
                  key={articleSort._id}
                  text={articleSort.nameCategory}
                  color="volcano"
                >
                  <Card
                    style={{ width: "auto", marginBottom: "20px" }}
                    cover={
                      <img
                        alt="example"
                        src={articleSort.url_image}
                        onClick={() => openArticle(articleSort.slug)}
                      />
                    }
                  >
                    <Meta
                      title={articleSort.title}
                      description={articleSort.small_text}
                    />
                  </Card>
                </Badge.Ribbon>
              );
            })}
        </Col>
      </Row>
    </LayoutApp>
  );
};
