import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const Cookie = {
  // TOKEN
  setToken(token) {
    cookies.set("token", token, {
      maxAge: 60 * 60 * 5,
      sameSite: "lax",
      secure: true,
      path: "/",
    });
  },

  getToken() {
    return cookies.get("token");
  },

  deleteCookies() {
    cookies.remove("token", { path: "/" });
  },
};
