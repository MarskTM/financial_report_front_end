import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// import { Label, Button } from "@/components/ui/label";
import { Form, Input, Space } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
// import logoImgPlaceholder from "@/assets/logo/logo_img_placeholder.png";

import * as model from "@/redux/model";
import * as api from "@/redux/api/auth";
import { useDispatch } from "react-redux";
// ---------------------------- Declare Constain -----------------------------------
interface Props {}

// -------------------------------- Main Component -----------------------------------
const SignUpForm: React.FC<Props> = ({}) => {
  // 1. variables
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm<model.Register>();

  // 2. handlers

  const onFinish = (values: any) => {
    api.register(navigate, dispatch, values);
  };

  // 3. effects

  // 4. render
  return (
    <div className="mx-auto max-w-[820px] shadow-lg rounded-lg px-16 py-6 bg-white">
      <Space className="mb-5" direction="vertical">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-800 to-blue-900 bg-clip-text text-transparent">
          Đăng Ký Tài Khoản
        </h1>
        <p>
          Vui lòng điền thông tin vào biểu mẫu để tạo mới tài khoản hệ thống.
        </p>
      </Space>

      <div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div className="flex flex-row justify-evenly">
              {/* ---------------------------------- Form content ----------------------------------- */}
              <div className="w-2/3">
                {/* 1. Thông tin tài khoản */}
                <Form.Item
                  label="Email"
                  name="username"
                  rules={[
                    { required: true, message: "Vui lòng nhập email của bạn!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input placeholder="m@example.com" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu của bạn!",
                    },
                  ]}
                >
                  <Input
                    placeholder="*******"
                    type={showPassword ? "text" : "password"} // ✅ Thay đổi type dựa vào state
                    suffix={
                      showPassword ? (
                        <EyeOutlined onClick={() => setShowPassword(false)} />
                      ) : (
                        <EyeInvisibleOutlined
                          onClick={() => setShowPassword(true)}
                        />
                      )
                    } // ✅ Thêm icon bật/tắt
                  />
                </Form.Item>

                {/* 2. Thông tin người dùng */}
                <div className="flex flex-row mt-2">
                  <Form.Item label="Họ tên" name="fullname" className="mr-10">
                    <Input type="text" placeholder="Nguyen Van A" />
                  </Form.Item>

                  <Form.Item label="Sdt" name="phone">
                    <Input type="text" placeholder="VD. 09819030555" />
                  </Form.Item>
                </div>

                <Form.Item label="Địa chỉ liên hệ" name="address">
                  <Input
                    type="text"
                    placeholder="P. Nguyễn Trác, Yên Nghĩa, Hà Đông, Hà Nội"
                  />
                </Form.Item>
              </div>
            </div>

            <Form.Item label={null} className="mt-2">
              <Button className="block w-72 mx-auto text-white bg-gradient-to-r from-sky-500 to-blue-800 hover:scale-105 active:opacity-80 transform transition-transform duration-300">
                Đăng Ký
              </Button>
            </Form.Item>
          </Space>
        </Form>

        <div className="mt-4 text-end text-sm">
          Bạn đã có tài khoản?{" "}
          <Link
            to="/sign-in"
            className="underline bg-gradient-to-r from-sky-600 to-blue-900 bg-clip-text text-transparent"
          >
            Đăng nhập!
          </Link>
        </div>
        <div>
          <div className=" w-1/2 my-4 m-auto border-t-2 border-gray-300"></div>
          <p className="text-sm text-gray-600">
            <span className="font-bold">Chú ý:</span> Việc thực hiện đăng ký
            thông tin với sẽ mặc định rằng bạn đồng ý với các điều khoản về bảo
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
