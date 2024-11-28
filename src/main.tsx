import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router/Router";
import { store } from "./redux/Store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer />
    <Router />
  </Provider>
);
