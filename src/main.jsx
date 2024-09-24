import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { router } from "./routes/Routes";
import { Provider } from "react-redux";
import store from "./app/store";
import AuthProvider from "./AuthProvider/AuthProvider";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AuthProvider>
      <Provider store={store}>

        <RouterProvider router={router} />

      </Provider>
    </AuthProvider>

  </React.StrictMode>
);