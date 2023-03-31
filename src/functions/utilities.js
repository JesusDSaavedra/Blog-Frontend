import { Cookie } from "../store/cookie/cookie";
import jwt from "jwt-decode";

export const pickElementsObject = (object, properties) => {
  return properties.reduce((myobj, arr) => {
    myobj[arr] = object[arr];
    return myobj;
  }, {});
};

export const checkUserCookie = () => {
  const token = Cookie.getToken();
  const selectData = ["email", "name", "id", "phone", "type"];
  if (!token) {
    return {};
  }
  return pickElementsObject(jwt(token), selectData);
};
