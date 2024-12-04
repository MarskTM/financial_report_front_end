import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Row, Col } from "antd";

// Dữ liệu mẫu
const data = [
  { year: "2009", income: 12000, growth: 30 },
  { year: "2012", income: 15000, growth: 45 },
  { year: "2015", income: 22000, growth: 55 },
  { year: "2018", income: 35000, growth: 70 },
  { year: "2021", income: 48000, growth: 90 },
];

const dataAssets = [
  { year: "2009", realEstate: 500, cash: 300, bonds: 200 },
  { year: "2012", realEstate: 800, cash: 400, bonds: 300 },
  { year: "2015", realEstate: 1200, cash: 600, bonds: 400 },
  { year: "2018", realEstate: 2000, cash: 800, bonds: 500 },
  { year: "2021", realEstate: 3000, cash: 1200, bonds: 800 },
];

const FinancialChartOverview: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100">
      <Row gutter={[16, 16]}>
        {/* Thu nhập */}
        <Col span={12}>
          <Card title="Tăng trưởng thu nhập" className="shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#8884d8" name="Thu nhập" />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#ff7300"
                  name="Tăng trưởng"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Tài sản */}
        <Col span={12}>
          <Card title="Tài sản" className="shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataAssets} stackOffset="expand">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="realEstate"
                  stackId="a"
                  fill="#82ca9d"
                  name="Bất động sản"
                />
                <Bar
                  dataKey="cash"
                  stackId="a"
                  fill="#8884d8"
                  name="Tiền mặt"
                />
                <Bar
                  dataKey="bonds"
                  stackId="a"
                  fill="#ffc658"
                  name="Trái phiếu"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Hiệu quả kinh doanh */}
        <Col span={24}>
          <Card title="Hiệu quả kinh doanh" className="shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#82ca9d"
                  name="Tỷ suất lợi nhuận"
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#8884d8"
                  name="Tỷ lệ hình thành tài sản"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FinancialChartOverview;
