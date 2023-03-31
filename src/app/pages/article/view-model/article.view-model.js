import { Form } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Cookie } from "../../../../store/cookie/cookie";

const useArticleViewModel = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { type, id } = useSelector((state) => state.auth.user);
  const { articles } = useSelector((state) => state.blog);

  const [form] = Form.useForm();
  const [favorite, setFavorite] = useState({
    like: false,
    value: 0,
  });
  const [article, setArticle] = useState({
    loading: true,
    article: undefined,
  });
  const [comments, setComments] = useState([]);
  const [returnGetArticle, setReturnGetArticle] = useState(false);
  const [articlesSort, setArticlesSort] = useState([]);

  const saveLike = async () => {
    setFavorite({ like: true, value: favorite.value + 1 });
    const url = `${import.meta.env.VITE_URL_APP}/api/article/like/${
      article && article.article && article.article._id
    }`;
    await axios.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookie.getToken()}`,
        },
      }
    );
  };

  const deleteLike = async () => {
    setFavorite({ like: false, value: favorite.value - 1 });
    const url = `${import.meta.env.VITE_URL_APP}/api/article/like/${
      article && article.article && article.article._id
    }`;
    await axios.delete(url, {
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookie.getToken()}`,
      },
    });
  };

  const checkLike = () => {
    if (favorite.like) {
      deleteLike();
      return;
    }
    saveLike();
  };

  const deleteComment = async (idDate) => {
    const url = `${import.meta.env.VITE_URL_APP}/api/article/comment/${
      article && article.article && article.article._id
    }`;
    await axios.delete(url, {
      data: {
        id_date: idDate,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookie.getToken()}`,
      },
    });
    setReturnGetArticle(true);
  };

  const saveComment = async (comment, id) => {
    const url = `${import.meta.env.VITE_URL_APP}/api/article/comment/${id}`;
    await axios.post(
      url,
      { content: comment },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookie.getToken()}`,
        },
      }
    );
  };

  const onFinishComment = ({ comment }) => {
    saveComment(comment, article && article.article && article.article._id);
    form.resetFields();
    setReturnGetArticle(true);
  };

  const getArticleBySlug = async (fisrt = true) => {
    const url = `${import.meta.env.VITE_URL_APP}/api/article/slug/${slug}`;
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookie.getToken()}`,
      },
    });
    setComments(data.article[0].comments);
    const userLike =
      data && data.article[0] && data.article[0].likes.includes(id);
    setFavorite({
      like: userLike ? true : false,
      value: data.article[0].likes.length,
    });
    selectArticles(articles, data.article[0]);
    if (fisrt) {
      setArticle({ article: data.article[0], loading: false });
      return;
    }
  };

  const handleBack = () => {
    navigate("/blog", { replace: true });
  };

  const selectArticles = (articles, currentArticle) => {
    const articlesSameCategory = articles.filter((art) => {
      if (
        art.id_category === currentArticle.id_category &&
        art._id !== currentArticle._id
      ) {
        return art;
      }
    });
    if (articlesSameCategory.length >= 4) {
      setArticlesSort(articlesSameCategory.slice(0, 4));
      return;
    }
    const numberRandomNecesary = 4 - articlesSameCategory.length;
    const articlesDifferentCategory = articles.filter((art) => {
      if (
        art.id_category !== currentArticle.id_category &&
        art._id !== currentArticle._id
      ) {
        return art;
      }
    });
    const randomArticles = [...articlesDifferentCategory].sort(
      () => Math.random() - Math.random()
    );
    const finalArticles = [
      ...articlesSameCategory,
      ...randomArticles.slice(0, numberRandomNecesary),
    ];
    setArticlesSort(finalArticles);
  };

  const openArticle = (slug) => {
    navigate(`/blog/${slug}`, { replace: true });
  };

  useEffect(() => {
    getArticleBySlug();
  }, [slug]);

  useEffect(() => {
    if (returnGetArticle) {
      setTimeout(() => {
        getArticleBySlug(false);
        setReturnGetArticle(false);
      }, 1500);
    }
  }, [returnGetArticle]);

  return {
    form,
    deleteComment,
    article,
    favorite,
    checkLike,
    openArticle,
    handleBack,
    onFinishComment,
    articlesSort,
    type,
    id,
    comments,
  };
};

export default useArticleViewModel;
