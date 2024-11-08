import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Role from "./Role";
// import Coding from "../views/error/Coding";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <Role role={[]} children={}/> },
    { path: "/login", element: <></> },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
