import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  Globe,
} from "lucide-react";

type Props = {};

const DashboardTidings: React.FC<Props> = ({}) => {
  const newsItems = [
    {
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      title: "An tâm mua nhà với lãi suất cho vay cố định đến 5 năm từ ACB",
      timestamp: "2 hours ago",
    },
    {
      icon: <Briefcase className="h-4 w-4 text-orange-500" />,
      title:
        "Rủi ro tài sản của các ngân hàng được duy trì ổn định trong 9 tháng năm 2024",
      timestamp: "4 hours ago",
    },
    {
      icon: <Briefcase className="h-4 w-4 text-orange-500" />,
      title:
        "Thị trường rơi về vùng giá hấp dẫn, điểm danh hàng loạt cổ phiếu khả năng tạo lợi nhuận tốt",
      timestamp: "6 hours ago",
    },
    {
      icon: <TrendingDown className="h-4 w-4 text-red-500" />,
      title: "Thị trường chưa thể hấp dẫn dòng tiền quay trở lại?",
      timestamp: "8 hours ago",
    },
    {
      icon: <Globe className="h-4 w-4 text-purple-500" />,
      title:
        "Chứng khoán SHS được vinh danh Top 10 doanh nghiệp quản trị công ty tốt nhất Nhóm vốn hóa lớn",
      timestamp: "10 hours ago",
    },
    {
      icon: <Globe className="h-4 w-4 text-purple-500" />,
      title:
        "VN-Index lùi sâu gần về 1.200 điểm, cá nhân và tổ chức trong nước tranh thủ bắt đáy gom ròng gần 2.000 tỷ",
      timestamp: "12 hours ago",
    },
  ];

  return (
    <div className="overflow-y-scroll h-[85%] mt-5">
      <div className="relative">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="h-[4.5rem] py-3 pr-2 flex last:mb-0 rounded-md hover:cursor-pointer hover:bg-slate-200"
          >
            <div className="relative mr-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                {item.icon}
              </div>
              {index !== newsItems.length - 1 && (
                <div className="absolute bottom-0 left-1/2 top-8 -ml-px w-px bg-border" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.title}</span>
              <span className="text-xs text-muted-foreground">
                {item.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTidings;
