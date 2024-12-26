import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/utils/route";

interface Props {
  children: React.ReactNode;
}

const Auth: React.FC<Props> = ({ children: Children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("AccessToken");

    if (!accessToken) {
      // Nếu không có AccessToken, xóa token và điều hướng về trang đăng nhập
      Cookies.remove("AccessToken");
      Cookies.remove("RefreshToken");
      navigate(ROUTE.LOGIN.PATH);
    } 
  }, [navigate]);

  return (
    <div className="w-full h-full">
      {Children}
    </div>
  );
};

export default Auth;
