import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { blogSlice } from './blog';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    blog: blogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});