import React, { useState } from "react";
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
import logoImgPlaceholder from "@/assets/logo/logo_img_placeholder.png";
interface Props {}

const SignUpForm: React.FC<Props> = ({}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Hàm xử lý khi người dùng chọn một file
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Tạo URL cho preview ảnh
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <Card className="mx-auto h-[600px] max-w-[980px] shadow-lg px-16">
      <CardHeader className="mb-5">
        <CardTitle className="text-2xl bg-gradient-to-r from-sky-800 to-blue-900 bg-clip-text text-transparent">
          Đăng Ký Tài Khoản
        </CardTitle>
        <CardDescription>
          Vui lòng điền thông tin vào biểu mẫu sau để tao mới tài khoản trong hệ
          thống.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-12">
          <div className="grid gap-2 row-span-1 col-span-4 col-start-2">
            <div className="flex items-center">
              <Label htmlFor="email">Email:</Label>
            </div>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2 row-span-1 col-span-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password:</Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="*******"
              required
            />
          </div>

          <div className="grid gap-y-2 gap-x-1 col-start-2 col-span-3 row-start-2 row-span-1 mt-8">
            <div className="flex items-center">
              <Label htmlFor="firstName">Họ tên:</Label>
            </div>
            <Input
              id="firstName"
              type="text"
              placeholder="Nguyen Van A"
              required
            />
          </div>

          <div className="grid gap-y-2 gap-x-1 col-span-3 row-start-2 row-span-1 mt-8 mx-2">
            <div className="flex items-center">
              <Label htmlFor="lastName">Sdt:</Label>
            </div>
            <Input
              id="lastName"
              type="text"
              placeholder="VD. 09819030555"
              required
            />
          </div>

          <div className="grid gap-y-2 gap-x-1 col-start-2 col-span-6 row-start-3 row-span-1">
            <div className="flex items-center">
              <Label htmlFor="address">Địa chỉ liên hệ:</Label>
            </div>
            <Input
              id="address"
              type="text"
              placeholder="P. Nguyễn Trác, Yên Nghĩa, Hà Đông, Hà Nội"
            />
          </div>

          <div className="grid col-start-9 col-span-3 row-start-1 row-span-3 pl-10 mt-8">
            <div className="w-full flex items-center mb-2">
              <Label htmlFor="avata" className="m-auto !mt-0 leading-4">
                Ảnh đại diện:
              </Label>
            </div>

            <div>
              {previewUrl ? (
                <div className="w-full flex items-center h-36 mb-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="m-auto w-32 h-36 mb-4 rounded-md"
                  />
                </div>
              ) : (
                <div className="w-full flex items-center h-36 mb-4">
                  <img
                    src={logoImgPlaceholder}
                    alt="Preview"
                    className="m-auto w-32 h-36 mb-4 rounded-md bg-zinc-100"
                  />
                </div>
              )}

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-28 mx-auto pl-[15px]"
              />
            </div>
          </div>

          <div className="grid gap-y-2 gap-x-1 col-start-5 col-span-4 row-start-5 row-span-1">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-600 to-blue-900 hover:scale-105 active:opacity-85 transform transition-transform duration-300"
            >
              Đăng Ký
            </Button>
          </div>
        </div>
        <div className="mt-7 text-end text-sm">
          Bạn đã có tài khoản?{" "}
          <Link
            to="/sign-in"
            className="underline bg-gradient-to-r from-sky-600 to-blue-900 bg-clip-text text-transparent"
          >
            Đăng nhập!
          </Link>
        </div>
        <div>
          <div className=" w-1/2 my-5 m-auto border-t-2 border-gray-300"></div>
          <p className="text-sm text-gray-600">
            <span className="font-bold">Bảo mật:</span> Khi bạn thực hiện đăng
            ký, hệ thống sẽ mặc định rằng bạn đồng ý với các điều khoản về bảo
            mật thông tin người dùng mà chúng tôi đưa ra. Thông tin chi tiết vui
            lòng truy cập{" "}
            <Link
              to="https://www.vndirect.com.vn/cac-dieu-khoan-va-dieu-kien-giao-dich-chung-khoan/"
              className="underline"
            >
              tại đây!
            </Link>{" "}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
