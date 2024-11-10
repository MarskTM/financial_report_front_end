import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Role from "./Role";
import Auth from "./Auth";
import HomePage from "../page/home";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "../page/auth/register/RegisterPage";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    { path: "/login", element:  <Auth children={LoginPage} />},
    { path: "/register", element: <RegisterPage />},
    { path: "/", element: <Role role={["user", "admin"]} children={HomePage} />},
  ]);
  return <RouterProvider router={router} />;
};

export default Router;