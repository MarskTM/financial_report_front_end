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
import EnterpriseList from "../page/enterprise_list";
import Profile from "@/page/profile";
import TidingDetail from "@/page/news/tiding_detail";

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
      path: ROUTE.ENTERPRISE_DETAIL.PATH,
      element: (
        <Role role={ROUTE.ENTERPRISE_DETAIL.ROLE} children={Enterprise} />
      ),
    },


    {
      path: ROUTE.NEWS.PATH,
      element: <Role role={["user", "admin"]} children={NewsPage} />,
    },
	{
		path: ROUTE.NEWS_DETAIL.PATH,
		element: <TidingDetail />,
	}, 

    {
      path: ROUTE.ANALYST.PATH,
      element: <Role role={["user", "admin"]} children={Analyst} />,
    },
    {
      path: ROUTE.ENTERPRISE.PATH,
      element: <Role role={["user", "admin"]} children={EnterpriseList} />,
    },

    // Profile Route
    {
      path: ROUTE.PROFILE.PATH,
      element: <Role role={ROUTE.PROFILE.ROLE} children={Profile} />,
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
