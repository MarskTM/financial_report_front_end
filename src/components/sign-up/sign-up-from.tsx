import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {}

const SignUpForm: React.FC<Props> = ({}) => {
  return (
    <Card className="mx-auto h-[700px] max-w-screen-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Đăng Ký Tài Khoản</CardTitle>
        <CardDescription>
          Vui lòng điền thông tin vào biểu mẫu sau để tao mới tài khoản trong hệ
          thống.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-5">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
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
            />
          </div>
          <Button type="submit" className="w-full">
            Đăng Nhập
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
          <Button variant="outline" className="w-full">
            Login with Facebook
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Bạn chưa có tài khoản?{" "}
          <Link to="register" className="underline">
            Đăng Ký ngay!
          </Link>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            Bảo mật: Chúng tôi sử dụng thông tin cá nhân của bạn và chúng tôi
            cung cấp dữ liệu cho nhà cung cấp dịch vụ và các trang web liên
            quan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
