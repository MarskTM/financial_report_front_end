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
import Enterprise from "../page/enterprise";
const Router: React.FC = () => {
  const router = createBrowserRouter([
    { path: "/sign-in", element: <Auth children={LoginPage} /> },
    { path: "/sign-up", element: <RegisterPage /> },
    { path: "/", element: <Navigate to="/home" replace /> },
    {
      path: "/home",
      element: <Role role={["user", "admin"]} children={HomePage} />,
    },

    // Child routes
    {
      path: "/home/Enterprise",
      element: <Role role={["user", "admin"]} children={Enterprise} />,
    },
    {
      path: "/home/News",
      element: <Role role={["user", "admin"]} children={HomePage} />,
    },
    {
      path: "/home/Analyst",
      element: <Role role={["user", "admin"]} children={HomePage} />,
    },
    {
      path: "/home/creditcard",
      element: <Role role={["user", "admin"]} children={HomePage} />,
    },

    // Profile Route
    {
      path: "/home/Profile",
      element: <Role role={["user", "admin"]} children={HomePage} />,
    },

    // Admin Route
    {
      path: "/home/Admin",
      element: <Role role={["admin"]} children={HomePage} />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
