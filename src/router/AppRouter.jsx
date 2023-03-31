import { Navigate, Route, Routes } from "react-router-dom";
import { BlogPage } from "../app/pages/blog/BlogPage";
import RoutesWithNotFound from "./RoutesWithNotFound";
import LoginGuard from "./guards/LoginGuard";
import { LoginPage, RegisterPage } from "../auth/pages";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArticlePage } from "../app/pages/article/ArticlePage";
import AdminGuard from "./guards/AdminGuard";
import { AdminPage } from "../app/pages/admin/AdminPage";

export const AppRouter = () => {
  const { user } = useSelector((state) => state.auth);
  const existUser = Object.keys(user).length > 0;
  const type = (Object.keys(user).length > 0 && user.type) ?? 2;

  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate replace to="blog" />} />
        <Route
          path="login"
          element={existUser ? <Navigate replace to="/blog" /> : <LoginPage />}
        />
        <Route
          path="register"
          element={
            existUser ? <Navigate replace to="/blog" /> : <RegisterPage />
          }
        />
        <Route element={<LoginGuard existUser={existUser} />}>
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<ArticlePage />} />
          <Route element={<AdminGuard type={type} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};
