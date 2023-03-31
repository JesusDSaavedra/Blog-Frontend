import { createSlice } from "@reduxjs/toolkit";
import { checkUserCookie } from "../../functions/utilities";
import { Cookie } from "../cookie/cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: checkUserCookie(),
  },
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, chekingCredentials } = authSlice.actions;
