import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Role from "./Role";
import Auth from "./Auth";
import HomePage from "../page/home";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "../page/auth/register/RegisterPage";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    { path: "/sign-in", element: <Auth children={LoginPage} /> },
    { path: "/sign-up", element: <RegisterPage /> },
    { path: "/", element: <Navigate to="/home" replace /> },
    {
      path: "/home",
      element: <Role role={["user", "admin"]} children={HomePage} />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;