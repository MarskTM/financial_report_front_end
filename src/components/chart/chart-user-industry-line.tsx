import React from "react";
import { Line } from "react-chartjs-2";
import { DatePicker, Select } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { RangePicker } = DatePicker;
const { Option } = Select;

const ChartUserIndustryLine: React.FC = () => {
  // Dữ liệu cho biểu đồ
  const data = {
    labels: [
      "07/10/2024",
      "21/10/2024",
      "04/11/2024",
      "18/11/2024",
      "02/12/2024",
      "16/12/2024",
      "30/12/2024",
    ],
    datasets: [
      {
        label: "Tài chính",
        data: [-5, -10, -15, -10, -20, -5, 0],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.4,
      },
      {
        label: "Nguyên vật liệu",
        data: [5, 10, 15, 20, 10, 25, 30],
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.4,
      },
      {
        label: "Công nghiệp",
        data: [10, 15, 10, 5, 10, 15, 20],
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.4,
      },
      {
        label: "Bất động sản",
        data: [0, -5, -10, -15, -10, -20, -25],
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        tension: 0.4,
      },
      {
        label: "Tiện ích",
        data: [5, 10, 15, 10, 20, 25, 30],
        borderColor: "teal",
        backgroundColor: "rgba(0, 128, 128, 0.2)",
        tension: 0.4,
      },
      {
        label: "Công nghệ thông tin",
        data: [15, 10, 20, 25, 30, 40, 50],
        borderColor: "gold",
        backgroundColor: "rgba(0, 255, 255, 0.2)",
        tension: 0.4,
      },
    //   {
    //     label: "Viễn thông",
    //     data: [0, 5, 10, 15, 20, 25, 30],
    //     borderColor: "gold",
    //     backgroundColor: "rgba(255, 215, 0, 0.2)",
    //     tension: 0.4,
    //   },
    //   {
    //     label: "Chăm sóc sức khỏe",
    //     data: [-5, -10, -5, 0, 5, 10, 15],
    //     borderColor: "pink",
    //     backgroundColor: "rgba(255, 192, 203, 0.2)",
    //     tension: 0.4,
    //   },
    ],
  };

  // Cấu hình cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Diễn biến: Giá",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Thay đổi (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Thời gian",
        },
      },
    },
  };

  return (
    <div className="">
      {/* <div className="flex justify-between items-center mb-4">
        Bộ chọn thời gian
        <RangePicker
          defaultValue={[dayjs("2024-09-30"), dayjs("2024-12-30")]}
          format="DD/MM/YYYY"
        />

        <Select
          mode="multiple"
          allowClear
          placeholder="Tùy chọn ngành"
          defaultValue={["Năng lượng", "Nguyên vật liệu", "Công nghiệp"]}
          style={{ width: "300px" }}
        >
          <Option value="Năng lượng">Năng lượng</Option>
          <Option value="Nguyên vật liệu">Nguyên vật liệu</Option>
          <Option value="Công nghiệp">Công nghiệp</Option>
          <Option value="Tiêu dùng thiết yếu">Tiêu dùng thiết yếu</Option>
          <Option value="Tiêu dùng không thiết yếu">
            Tiêu dùng không thiết yếu
          </Option>
          <Option value="Chăm sóc sức khỏe">Chăm sóc sức khỏe</Option>
          <Option value="Tài chính">Tài chính</Option>
          <Option value="Công nghệ thông tin">Công nghệ thông tin</Option>
          <Option value="Dịch vụ viễn thông">Dịch vụ viễn thông</Option>
          <Option value="Dịch vụ tiện ích">Dịch vụ tiện ích</Option>
          <Option value="Bất động sản">Bất động sản</Option>
        </Select>
      </div> */}

      {/* Biểu đồ */}
      <div className="bg-white p-10">
        <Line data={data} options={options} height="h-[100%]" />
      </div>
    </div>
  );
};

export default ChartUserIndustryLine;
