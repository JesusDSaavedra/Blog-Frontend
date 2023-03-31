import { Form } from "antd";
import axios from "axios";
import { Cookie } from '../../../../../../store/cookie/cookie';

const useModalAddArticleViewModel = (handleCancel,setAddNewArticle) => {
  const [form] = Form.useForm();

  const saveArticle = async (infoArticle) => {
    const url = `${import.meta.env.VITE_URL_APP}/api/article`;
    const aver = await axios.post(url, infoArticle, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookie.getToken()}`,
      },
    });
    console.log("aver", aver);
  };

  const onFinish = ({
    id_category,
    title,
    small_text,
    long_text,
    url_image,
  }) => {

    const aver = {
      id_category,
      title,
      slug: buildSlug(title),
      small_text,
      long_text,
      url_image,
    };
    saveArticle(aver);
    form.resetFields();
    handleCancel();
    setAddNewArticle(true)
  };

  // const onFinish = () => {
  //   setAddNewArticle(true)
  //   handleCancel();
  // }

  const buildSlug = (title) => {
    const slug = title.toLowerCase().split(" ").join("-");
    console.log("slug", slug);
    return slug;
  };

  return {
    form,
    onFinish,
  };
};

export default useModalAddArticleViewModel;
