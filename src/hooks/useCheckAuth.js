import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pickElementsObject } from "../functions/utilities";
import { Cookie } from "../store/cookie/cookie";
import jwt from "jwt-decode";
import { login } from "../store/auth";

const useCheckAuth = () => {
  console.log("ME LLAMARON");
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const selectData = ["email", "name", "id", "phone", "type"];

  const dispatchUser = () => {
    const token = Cookie.getToken();
    const user = pickElementsObject(jwt(token), selectData);
    dispatch(login(user));
  };

  useEffect(() => {
    Cookie.getToken() && dispatchUser();
  }, []);

  return {
    status,
  };
};

export default useCheckAuth;
