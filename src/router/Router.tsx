import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ROUTE } from "@/utils/route";

import Role from "./Role";
import Auth from "./Auth";
import HomePage from "../page/home";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "../page/auth/register/registerPage";
import Enterprise from "../page/enterprise";
import NewsPage from "@/page/news";
import Analyst from "../page/analyst";
import Creditcard from "../page/creditcard";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to={ROUTE.HOME.PATH} replace /> },

    { path: ROUTE.LOGIN.PATH, element: <Auth children={LoginPage} /> },
    { path: ROUTE.REGISTER.PATH, element: <RegisterPage /> },
    
    {
      path: ROUTE.HOME.PATH,
      element: <Role role={ROUTE.HOME.ROLE} children={HomePage} />,
    },

    // Child routes
    {
      path: "/home/Enterprise",
      element: <Role role={["user", "admin"]} children={Enterprise} />,
    },
    {
      path: "/home/News",
      element: <Role role={["user", "admin"]} children={NewsPage} />,
    },
    {
      path: "/home/Analyst",
      element: <Role role={["user", "admin"]} children={Analyst} />,
    },
    {
      path: "/home/Creditcard",
      element: <Role role={["user", "admin"]} children={Creditcard} />,
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
