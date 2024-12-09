"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    metric: "Tốc độ tăng trưởng",
    BID: 4.0,
    "TB ngành": 5.22,
    "TB thị trường": 3.66,
  },
  {
    metric: "Khả năng sinh lời",
    BID: 4.0,
    "TB ngành": 4.04,
    "TB thị trường": 3.12,
  },
  {
    metric: "Vị thế doanh nghiệp",
    BID: 8.0,
    "TB ngành": 5.48,
    "TB thị trường": 2.65,
  },
  {
    metric: "Sức khỏe tài chính",
    BID: 5.0,
    "TB ngành": 2.78,
    "TB thị trường": 4.69,
  },
  {
    metric: "Cam kết với cổ đông",
    BID: 5.0,
    "TB ngành": 3.63,
    "TB thị trường": 3.95,
  },
  {
    metric: "Quản trị bền vững",
    BID: 9.0,
    "TB ngành": 7.04,
    "TB thị trường": 5.62,
  },
];

interface Props {}

const HealthyEnterpriseChart: React.FC<Props> = () => {
  return (
    <div className="w-full max-w-[1200px] p-4 space-y-4">
      <div className="flex flex-col gap-4">
        {/* Radar Chart */}
        <div className="border-none">
          <div className="flex flex-row pt-5 justify-between">
            <h1 className="text-sm font-semibold">Biểu đồ tổng quan</h1>
            <p className="text-sm">Kỳ tính chỉ số: 30/09/2024</p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart
              data={data}
              margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar
                name="BID"
                dataKey="BID"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.3}
              />
              <Radar
                name="TB ngành"
                dataKey="TB ngành"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.3}
              />
              <Radar
                name="TB thị trường"
                dataKey="TB thị trường"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Data Table */}
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chỉ tiêu</TableHead>
                <TableHead className="text-right">BID</TableHead>
                <TableHead className="text-right">TB ngành</TableHead>
                <TableHead className="text-right">TB thị trường</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.metric}>
                  <TableCell>{row.metric}</TableCell>
                  <TableCell className="text-right">
                    {row.BID.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {row["TB ngành"].toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {row["TB thị trường"].toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">D-Rating</TableCell>
                <TableCell className="text-right">5.30</TableCell>
                <TableCell className="text-right">4.14</TableCell>
                <TableCell className="text-right">3.88</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HealthyEnterpriseChart;
