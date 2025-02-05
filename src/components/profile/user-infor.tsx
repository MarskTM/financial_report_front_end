import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Card,
  Avatar,
  Row,
  Col,
  message,
} from "antd";
import {
  CameraOutlined,
  PhoneOutlined,
  HomeOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import dayjs, { Dayjs } from "dayjs";

import * as api from "@/redux/api/profile"; // Giả sử bạn có API để cập nhật thông tin người dùng
import { Profile } from "@/redux/model/profile";

type FormValues = {
  name: string;
  date: Dayjs | null;
  address: string;
  phone: string;
  email: string;
  password: string;
};

type Props = {};

const UserInfor: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.users);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.profile
        ? `${user.profile.first_name} ${user.profile.last_name}`
        : "",
      date: user?.profile?.birthdate
        ? dayjs(user.profile.birthdate)
        : dayjs(user?.profile?.created_at),
      address: user?.profile?.address || "123 Đường ABC, Quận XYZ, Hà Nội",
      phone: user?.profile?.phone || "",
      email: user?.profile?.email || "",
      password: "", // Không nên đặt giá trị mặc định cho mật khẩu
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Chuyển đổi ngày sinh sang định dạng phù hợp nếu cần
      const birthdate: Date | null = data.date ? data.date.toDate() : null;

      // Tách họ tên thành các phần tử
      const nameParts = data.name.trim().split(" ");

      const first_name = nameParts[0] || "";
      const last_name = nameParts.slice(1).join(" ") || ""; // Gộp tất cả các phần tử còn lại

      const profileData: Profile = {
        id: user?.profile?.id,
        first_name: first_name,
        last_name: last_name,
        birthdate: birthdate,
        address: data.address,
        phone: data.phone,
        email: data.email,
      };

      // Gọi API để cập nhật thông tin người dùng
      api.UpsertProfile(profileData, dispatch);

      console.log(profileData);
      message.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      message.error("Đã xảy ra lỗi khi cập nhật thông tin.");
    }
  };

  useEffect(() => {
    if (user.profile) {
      setValue(
        "name",
        `${user.profile.first_name} ${user.profile.last_name}` || ""
      );
      setValue(
        "date",
        user.profile.birthdate
          ? dayjs(user.profile.birthdate)
          : dayjs(user.profile.created_at)
      );
      setValue(
        "address",
        user.profile.address || "123 Đường ABC, Quận XYZ, Hà Nội"
      );
      setValue("phone", user.profile.phone || "");
      setValue("email", user.profile.email || "");
    }
  }, [user]);

  return (
    <div className="w-full h-full mx-auto p-4">
      <h2 className="text-xl font-semibold p-3">Thông Tin</h2>

      <Card className="h-[90%]">
        {/* Căn giữa Avatar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Avatar
            size={64}
            icon={<CameraOutlined />}
            className="bg-slate-400"
          />
        </div>
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          style={{ marginTop: 24 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Họ tên"
                validateStatus={errors.name ? "error" : ""}
                help={errors.name ? errors.name.message : ""}
              >
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Họ tên là bắt buộc" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập họ tên"
                      prefix={<CameraOutlined />}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày sinh"
                validateStatus={errors.date ? "error" : ""}
                help={errors.date ? errors.date.message : ""}
              >
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Ngày sinh là bắt buộc" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      style={{ width: "100%" }}
                      disabledDate={(current) =>
                        current &&
                        (current > dayjs() || current < dayjs("1900-01-01"))
                      }
                      format="DD/MM/YYYY"
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Liên hệ"
            validateStatus={errors.phone ? "error" : ""}
            help={errors.phone ? errors.phone.message : ""}
          >
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Số điện thoại là bắt buộc",
                pattern: {
                  value: /^\d{10,15}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập số điện thoại"
                  prefix={<PhoneOutlined />}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            validateStatus={errors.address ? "error" : ""}
            help={errors.address ? errors.address.message : ""}
          >
            <Controller
              name="address"
              control={control}
              rules={{ required: "Địa chỉ là bắt buộc" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập địa chỉ"
                  prefix={<HomeOutlined />}
                />
              )}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                validateStatus={errors.email ? "error" : ""}
                help={errors.email ? errors.email.message : ""}
              >
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email là bắt buộc",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email không hợp lệ",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Nhập email"
                      prefix={<MailOutlined />}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Mật khẩu"
                validateStatus={errors.password ? "error" : ""}
                help={errors.password ? errors.password.message : ""}
              >
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    // required: "Mật khẩu là bắt buộc",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  }}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      placeholder="Nhập mật khẩu"
                      prefix={<LockOutlined />}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div className="mt-20 flex justify-end">
              <Button type="primary" htmlType="submit">
                Cập nhật thông tin
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserInfor;
