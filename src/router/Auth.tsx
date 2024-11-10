import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      navigate("/login");
    }
  }, [Cookies.get("AccessToken")]);

  return (
    <div className="w-full h-full">
      <Children />
    </div>
  );
};

export default Auth;
