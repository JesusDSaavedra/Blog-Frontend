// import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
// import { clearNotesLogout } from "../journal/journalSlice";
import { chekingCredentials, login, logout } from "./authSlice";
import jwt from "jwt-decode";
import axios from "axios";
import { Cookie } from "../cookie/cookie";
import { pickElementsObject } from "../../functions/utilities";

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    const url = `${import.meta.env.VITE_URL_APP}/api/auth/login`;
    try {
      const { data } = await axios.post(url, {
        email,
        password,
      });
      Cookie.setToken(data.access_token);
      const selectData = ["email", "name", "id", "phone", "type"];
      const user = pickElementsObject(jwt(data.access_token), selectData);
      dispatch(login(user));
    } catch (err) {
      console.log("SE PRESENTO ERRORRR");
    }
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    // dispatch( chekingCredentials() );
    // const result = await registerUserWithEmailPassword({ email, password, displayName });
    // if( !result.ok ) return dispatch( logout({ errorMessage }));
    // dispatch( login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    Cookie.deleteCookies();

    // await logoutFirebase();
    // dispatch( clearNotesLogout() )
    dispatch(logout());
  };
};
