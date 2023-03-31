import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    articles: [],
  },
  reducers: {
    updateArticles: (state, { payload }) => {
      state.articles = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateArticles } = blogSlice.actions;
