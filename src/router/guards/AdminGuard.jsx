import { Navigate, Outlet } from "react-router-dom";

export const AdminGuard = ({ type }) => {
  return type === 1 ? <Outlet /> : <Navigate replace to={"blog"} />;
};

export default AdminGuard;
