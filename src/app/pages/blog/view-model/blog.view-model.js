import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startUpdateArticles } from "../../../../store/blog/thunks";
import { Cookie } from "../../../../store/cookie/cookie";

const useBlogViewModel = () => {
  const navigate = useNavigate();
  const { type, id } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [statesCategories, setStatesCategories] = useState({
    loading: true,
    categoriesApi: [],
    categoriesSort: [],
    error: false,
  });
  const [statesArticles, setStatesArticles] = useState({
    loading: true,
    articles: [],
    error: false,
  });
  const [articlesVisible, setArticlesVisible] = useState([]);
  const [segmentValue, setSegmenetValue] = useState("TODOS");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addNewArticle, setAddNewArticle] = useState(false);
  const [openCurrentDelete, setOpenCurrentDelete] = useState({
    currentId: "",
    loading: false,
  });

  const sortCategories = (categories) => {
    return {
      categoriesApi: categories,
      categoriesSort: categories.map((category) => category.name),
    };
  };

  const getArticles = async (categoriesApi) => {
    setStatesArticles({
      ...statesArticles,
      loading: true,
    });
    const url = `${import.meta.env.VITE_URL_APP}/api/article`;
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookie.getToken()}`,
      },
    });

    const articlesWithName = addNameCategory(data.articles, categoriesApi);

    setStatesArticles({
      ...statesArticles,
      loading: false,
      articles: articlesWithName,
    });
    dispatch(startUpdateArticles(articlesWithName));
    setArticlesVisible(articlesWithName);
  };

  const addNameCategory = (articles, categoriesApi) => {
    const articlesWithCategory = articles.map((article) => {
      const nameCategory = categoriesApi.find(
        (cat) => cat._id === article.id_category
      );
      const actions = [];
      if (type === 1) {
        actions.push("edit");
        actions.push("delete");
      }
      if (id === article.creator && type !== 1) {
        actions.push("edit");
        actions.push("delete");
      }
      return {
        ...article,
        nameCategory: nameCategory.name,
        actions,
      };
    });
    return articlesWithCategory;
  };

  const getCateories = async () => {
    const url = `${import.meta.env.VITE_URL_APP}/api/category`;
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookie.getToken()}`,
      },
    });
    const { categoriesApi, categoriesSort } = sortCategories(data.users);
    setStatesCategories({
      ...statesCategories,
      loading: true,
      categoriesApi,
      categoriesSort: [...categoriesSort, "TODOS"].reverse(),
    });
    getArticles(categoriesApi);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeSegment = (segment) => {
    setSegmenetValue(segment);
    if (segment === "TODOS") {
      setArticlesVisible(statesArticles.articles);
      return;
    }
    const articlesFilter =
      statesArticles &&
      statesArticles.articles.filter(
        (article) => article.nameCategory === segment
      );
    setArticlesVisible(articlesFilter);
  };

  const deleteArticle = async (id) => {
    setOpenCurrentDelete({ ...openCurrentDelete, loading: true });
    const url = `${import.meta.env.VITE_URL_APP}/api/article/${id}`;
    const deleteArticleReponse = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookie.getToken()}`,
      },
    });
    console.info("deleteArticleReponse", deleteArticleReponse);
    setOpenCurrentDelete({ ...openCurrentDelete, loading: false });
    setAddNewArticle(true);
  };

  const openArticle = (slug) => {
    navigate(`/blog/${slug}`);
  };

  useEffect(() => {
    getCateories();
  }, []);

  useEffect(() => {
    if (addNewArticle) {
      setTimeout(() => {
        getArticles(statesCategories && statesCategories.categoriesApi);
        setAddNewArticle(false);
      }, 2000);
    }
  }, [addNewArticle]);

  return {
    showModal,
    isModalOpen,
    handleOk,
    handleCancel,
    statesCategories,
    statesArticles,
    setAddNewArticle,
    articlesVisible,
    segmentValue,
    onChangeSegment,
    setOpenCurrentDelete,
    openCurrentDelete,
    openArticle,
    deleteArticle,
    type,
  };
};

export default useBlogViewModel;
