import { Route, Routes } from "react-router-dom";
import { BlogPage } from "../pages/blog/BlogPage";

export const BlogRoutes = () => {
  return (
    <Routes>
      <Route path="blog" element={<BlogPage />} />
    </Routes>
  );
};
