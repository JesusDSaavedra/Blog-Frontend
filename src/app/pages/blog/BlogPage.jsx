import LayoutApp from "../../components/layout/Layout";
import Articles from "./components/article/Articles";

import "./scss/articles.scss";

export const BlogPage = () => {
  return (
    <LayoutApp>
      <Articles />
    </LayoutApp>
  );
};
