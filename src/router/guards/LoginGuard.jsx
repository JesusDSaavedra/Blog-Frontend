import { Navigate, Outlet } from "react-router-dom";

export const LoginGuard = ({ existUser }) => {
  return existUser ? <Outlet /> : <Navigate replace to={"login"} />;
};

export default LoginGuard;
