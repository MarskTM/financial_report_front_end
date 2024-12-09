import React from "react";
import { Timeline } from "antd";

interface Notification {
  date: string;
  message: string;
}

const notifications: Notification[] = [
  { date: "2015-09-01", message: "Create a services" },
  { date: "2015-09-01 09:12:11", message: "Solve initial network problems" },
  { date: "2015-09-01 09:12:11", message: "Technical testing" },
  { date: "2015-09-01 09:12:11", message: "Network problems being solved" },
];

const ProfileNotifyTimeLine: React.FC = () => {
  return (
    <div className="p-6 bg-white">
      <h2 className="text-base font-bold pb-2 mb-2">
        Thông báo hệ thống
      </h2>
      <Timeline
        mode="right"
        items={[
          {
            label: "2015-09-01",
            children: `Lưu phân tích báo cáo "Báo cáo tài chính 2024" thành công`,
          },
          {
            label: "2015-09-01 09:12:11",
            children: "Solve initial network problems",
          },
          {
            children: "Technical testing",
          },
          {
            label: "2015-09-01 09:12:11",
            children: "Network problems being solved",
          },
        ]}
        className="w-full py-2 h-[220px] overflow-y-scroll"
      />
    </div>
  );
};

export default ProfileNotifyTimeLine;
