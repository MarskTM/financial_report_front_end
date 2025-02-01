import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import { Label, Button } from "@/components/ui/label";
import { Button, Form, Input } from "antd";
import logoImgPlaceholder from "@/assets/logo/logo_img_placeholder.png";

import * as model from "@/redux/model";
// ---------------------------- Declare Constain -----------------------------------
interface Props {}

// -------------------------------- Main Component -----------------------------------
const SignUpForm: React.FC<Props> = ({}) => {
  // 1. variables
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const newUser = useRef<model.Register>({} as model.Register);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  // 2. handlers
  // Hàm xử lý khi người dùng chọn một file
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Tạo URL cho preview ảnh
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  // 3. effects

  // 4. render
  return (
    <div className="mx-auto h-[600px] max-w-[980px] shadow-lg px-16">
      <div className="mb-5">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-800 to-blue-900 bg-clip-text text-transparent">
          Đăng Ký Tài Khoản
        </h1>
        <p>
          Vui lòng điền thông tin vào biểu mẫu sau để tao mới tài khoản trong hệ
          thống.
        </p>
      </div>
      <div>
        <Form
          {...layout}
          layout="vertical"
          validateMessages={validateMessages}
          className="flex flex-col"
        >
          {/* 1. Thông tin tài khoản */}
          <Form.Item className="flex flex-col" label="Email:">
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                newUser.current.username = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item label="Password:" className="flex flex-col">
            <Input
              id="password"
              type="password"
              placeholder="*******"
              required
              onChange={(e) => {
                newUser.current.password = e.target.value;
              }}
            />
          </Form.Item>

          {/* 2. Thông tin người dùng */}
          <div className="flex flex-row">
            <Form.Item label="Họ tên:">
              <Input
                id="firstName"
                type="text"
                placeholder="Nguyen Van A"
                required
                onChange={(e) => {
                  newUser.current.fullname = e.target.value;
                }}
              />
            </Form.Item>

            <Form.Item label="Sdt:" className="">
              <Input
                id="lastName"
                type="text"
                placeholder="VD. 09819030555"
                required
                onChange={(e) => {
                  newUser.current.phone = e.target.value;
                }}
              />
            </Form.Item>
          </div>

          <Form.Item label="Địa chỉ liên hệ:">
            <Input
              id="address"
              type="text"
              placeholder="P. Nguyễn Trác, Yên Nghĩa, Hà Đông, Hà Nội"
              onChange={(e) => {
                newUser.current.address = e.target.value;
              }}
            />
          </Form.Item>

          <Form.Item label="Ảnh đại diện:">
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
          </Form.Item>

          <Form.Item label={null}>
            <Button className="w-full bg-gradient-to-r from-sky-600 to-blue-900 hover:scale-105 active:opacity-85 transform transition-transform duration-300">
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>

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
      </div>
    </div>
  );
};

export default SignUpForm;
