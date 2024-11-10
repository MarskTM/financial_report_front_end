import React from "react";
import Icon, {
  SettingOutlined,
  LineChartOutlined,
  PieChartOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import logoWebsite from "../../assets/logo/logo_website_bg.png";

interface Props {}

const items = [
  {
    icon: (
      <Icon
        component={SettingOutlined as React.ForwardRefExoticComponent<any>}
        style={{ fontSize: "20px" }}
      />
    ),
    title: "Quản Lý Tài Chính Đơn Giản",
    description:
      "Đơn giản hóa quy trình báo cáo tài chính với hệ thống quản lý thông minh, tự động hóa và báo cáo chi tiết theo thời gian thực.",
  },
  {
    icon: (
      <Icon
        component={LineChartOutlined as React.ForwardRefExoticComponent<any>}
        style={{ fontSize: "20px" }}
      />
    ),
    title: "Tầm Nhìn Tài Chính Hiệu Quả",
    description:
      "Nền tảng quản lý báo cáo tài chính giúp bạn dễ dàng theo dõi và phân tích số liệu, nắm bắt tình hình tài chính nhanh chóng, chính xác.",
  },
  {
    icon: (
      <Icon
        component={PieChartOutlined as React.ForwardRefExoticComponent<any>}
        style={{ fontSize: "20px" }}
      />
    ),
    title: "Báo Cáo Minh Bạch, Quyết Định Chính Xác",
    description:
      "Giúp bạn kiểm soát tài chính hiệu quả với các báo cáo chi tiết và trực quan, tối ưu hóa cho việc ra quyết định.",
  },
  {
    icon: (
      <Icon
        component={LikeOutlined as React.ForwardRefExoticComponent<any>}
        style={{ fontSize: "20px" }}
      />
    ),
    title: "Công Cụ Tài Chính Toàn Diện",
    description:
      "Đưa ra cái nhìn toàn diện về tài chính của bạn, từ doanh thu đến chi phí, với các báo cáo phân tích chuyên sâu, dễ hiểu.",
  },
];

const LoginContent: React.FC<Props> = ({}) => {
  return (
    <div className="mr-14 max-w-screen-sm min-h-96 display: block scree">
      <div className="flex m-5 mb-8">
        <img src={logoWebsite} alt="Logo website" className="w-40" />
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="item m-5 min-h-16 flex flex-row justify-start items-start"
        >
          <div className="icon mx-5">{item.icon}</div>
          <div className="content flex flex-col">
            <div className="title mb-1 text-base font-semibold text-slate-700">{item.title}</div>
            <div className="description text-sm inline-block">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoginContent;
