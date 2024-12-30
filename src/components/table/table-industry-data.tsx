import React from "react";
import { Table } from "antd";
import "tailwindcss/tailwind.css";

// Dữ liệu mẫu (tương ứng với dữ liệu trong bảng hình ảnh)
const dataSource = [
  {
    key: "1",
    sector: "Tài chính",
    marketCap: "2,452,077.69",
    marketCapPercent: "34.32%",
    indexD: "+0.76%",
    indexYTD: "+22.64%",
    stocks: 104,
  },
  {
    key: "2",
    sector: "Công nghiệp",
    marketCap: "884,402.32",
    marketCapPercent: "12.38%",
    indexD: "+0.10%",
    indexYTD: "+102.31%",
    stocks: 389,
  },
  {
    key: "3",
    sector: "Bất động sản",
    marketCap: "842,094.36",
    marketCapPercent: "11.79%",
    indexD: "-0.51%",
    indexYTD: "-1.83%",
    stocks: 142,
  },
  // Thêm các ngành khác từ hình ảnh
  {
    key: "5",
    sector: "Nguyên vật liệu",
    marketCap: "632,020.26",
    marketCapPercent: "8.85%",
    indexD: "-0.82%",
    indexYTD: "+21.62%",
    stocks: 260,
  },
  {
    key: "6",
    sector: "Tiện ích",
    marketCap: "434,115.04",
    marketCapPercent: "6.08%",
    indexD: "-0.31%",
    indexYTD: "+5.18%",
    stocks: 149,
  },
  {
    key: "9",
    sector: "Công nghệ thông tin",
    marketCap: "230,939.21",
    marketCapPercent: "3.23%",
    indexD: "+0.62%",
    indexYTD: "+78.37%",
    stocks: 23,
  },
];

const columns = [
  {
    title: "Ngành",
    dataIndex: "sector",
    key: "sector",
    render: (text: string) => <span className="font-semibold">{text}</span>,
  },
  {
    title: "Vốn hóa",
    dataIndex: "marketCap",
    key: "marketCap",
    align: "right" as const,
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: "% Vốn hóa",
    dataIndex: "marketCapPercent",
    key: "marketCapPercent",
    align: "right" as const,
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: "% Index (D)",
    dataIndex: "indexD",
    key: "indexD",
    align: "right" as const,
    render: (text: string) => (
      <span
        className={text.startsWith("+") ? "text-green-500" : "text-red-500"}
      >
        {text}
      </span>
    ),
  },
  {
    title: "% Index (YTD)",
    dataIndex: "indexYTD",
    key: "indexYTD",
    align: "right" as const,
    render: (text: string) => (
      <span
        className={text.startsWith("+") ? "text-green-500" : "text-red-500"}
      >
        {text}
      </span>
    ),
  },
  {
    title: "Số mã",
    dataIndex: "stocks",
    key: "stocks",
    align: "center" as const,
  },
];

const TableIndustryData: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded">
      <h2 className="text-xl font-bold mb-4">Dữ liệu ngành</h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default TableIndustryData;
