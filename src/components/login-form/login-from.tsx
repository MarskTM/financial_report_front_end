import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import * as api from "@/redux/api/auth";
import * as model from "@/redux/model";
import { useDispatch } from "react-redux";

interface Props {}

const LoginFrom: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useRef<model.Credentials>({
    username: "",
    password: "",
  });

  const handelSubmit = (e: any) => {
    e.preventDefault();
    api.login({ ...user.current }, navigate, dispatch);
  };

  return (
    <Card className="mx-auto max-w-screen-sm w-96 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Đăng Nhập
        </CardTitle>
        <CardDescription>
          Vui lòng điền thông tin vào biểu mẫu sau để truy cập hệ thống.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder=". . . @gmail.com"
              required
              onChange={(e) => {
                user.current.username = e.target.value;
              }}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="#" className="ml-auto inline-block text-sm underline">
                Quên mật khẩu?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="*******"
              required
              onChange={(e) => {
                user.current.password = e.target.value;
              }}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:scale-105 active:opacity-85 transform transition-transform duration-300"
            onClick={handelSubmit}
          >
            Đăng Nhập
          </Button>
          <Button variant="outline" className="w-full">
            Đăng nhập với Google
          </Button>
          <Button variant="outline" className="w-full">
            Đăng nhập với Facebook
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Bạn chưa có tài khoản?{" "}
          <Link
            to="/sign-up"
            className="underline bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
          >
            Đăng Ký ngay!
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginFrom;
