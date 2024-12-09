import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Select } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const { Option } = Select;

// Component Biểu đồ
const TimeBasedChart: React.FC<{
  labels: string[];
  userData: number[];
  accessData: number[];
}> = ({ labels, userData, accessData }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Số Người Dùng",
        data: userData,
        borderColor: "#3e95cd",
        backgroundColor: "rgba(62, 149, 205, 0.4)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Số Lượng Truy Cập",
        data: accessData,
        borderColor: "#8e5ea2",
        backgroundColor: "rgba(142, 94, 162, 0.4)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Thời Gian",
        },
      },
      y: {
        title: {
          display: false,
          text: "Số Lượng",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

// Component Chính

const UserActiveChart: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<string>("hour");
  const [chartData, setChartData] = useState({
    labels: ["1h", "2h", "3h", "4h", "5h"],
    userData: [50, 70, 90, 120, 80],
    accessData: [500, 700, 800, 1000, 850],
  });

  const generateDemoData = (timeFrame: string) => {
    let labels: string[] = [];
    let userData: number[] = [];
    let accessData: number[] = [];

    if (timeFrame === "hour") {
      labels = ["1h", "2h", "3h", "4h", "5h"];
      userData = [50, 70, 90, 120, 80];
      accessData = [500, 700, 800, 1000, 850];
    } else if (timeFrame === "day") {
      labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      userData = [300, 500, 700, 400, 600];
      accessData = [2000, 2500, 3000, 2800, 3500];
    } else if (timeFrame === "week") {
      labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
      userData = [1500, 1700, 2000, 1800];
      accessData = [10000, 12000, 15000, 14000];
    }

    setChartData({ labels, userData, accessData });
  };

  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value);
    generateDemoData(value);
  };

  return (
    <div className="flex flex-col px-2">
      {/* Dropdown Chọn Mốc Thời Gian */}
      <div className="self-end">
        <Select
          defaultValue="hour"
          style={{ width: 200 }}
          size="small"
          onChange={handleTimeFrameChange}
          className="my-2"
        >
          <Option value="hour">Theo Giờ</Option>
          <Option value="day">Theo Ngày</Option>
          <Option value="week">Theo Tuần</Option>
        </Select>
      </div>

      {/* Hiển Thị Biểu Đồ */}
      <TimeBasedChart
        labels={chartData.labels}
        userData={chartData.userData}
        accessData={chartData.accessData}
      />
    </div>
  );
};

export default UserActiveChart;
