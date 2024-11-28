import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/utils/route";

interface Props {
  children: React.FC;
}

const Auth: React.FC<Props> = ({ children: Children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("AccessToken") === undefined) {
      Cookies.remove("AccessToken");
      Cookies.remove("RefreshToken");
    } else {
      navigate(ROUTE.LOGIN.PATH);
    }
  }, [Cookies.get("AccessToken")]);

  return (
    <div className="w-full h-full">
      <Children />
    </div>
  );
};

export default Auth;
