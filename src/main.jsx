import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { App } from "./app";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#9013FE",
          borderRadius: 20,
          colorError: "#c62626",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>
);
