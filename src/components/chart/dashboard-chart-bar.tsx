import {
  Bar,
  XAxis,
  BarChart,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

const data = [
  { label: "Tài chính", value: 543, color: "", item: ""},
  { label: "Bất động sản", value: 142 },
  { label: "Nông lâm nghiệp", value: 134 },
  { label: "Sản suất", value: 200 },
  { label: "Phân phối & Bán lẻ", value: 324 },
  { label: "Kinh doanh online", value: 162 },
  { label: "Kinh doanh vận tải", value: 86 },
  { label: "Dịch vụ công cộng", value: 122 },
  { label: "Công nghệ thông tin", value: 340 },
];

// Định nghĩa kiểu cho Tooltip tùy chỉnh
interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg border opacity-95   ">
        <p className="text-gray-700 font-semibold">{`Ngành: ${label}`}</p>
        <p className="text-blue-500">{`Báo cáo: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null; // Không hiển thị Tooltip khi không có dữ liệu
};

const DashboardChartBar: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-900 to-gray-900 opacity-90 rounded-xl p-6">
        <CardContent>
          <ResponsiveContainer className="mt-6" width="100%" height={200}>
            <BarChart data={data}>
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />
              <XAxis dataKey="label" display="none" />
              <Bar
                dataKey="value"
                fill="white"
                radius={[4, 4, 4, 4]}
                barSize={15}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex flex-row items-center">
        <h3 className="text-xl font-bold mr-2">Danh mục báo cáo </h3>
        <Package className="w-6 h-6 text-green-500" />
      </div>

      <div className="px-7 w-full flex flex-wrap">
        {data.map((item, index) => (
          <div key={index} className="w-44 flex items-center mr-8 p-2">
            <div className="p-2 mr-2 bg-gray-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="w-max text-sm font-medium text-muted-foreground hover:text-slate-800">
                {item.label}
              </p>
              <h3 className="text-md font-bold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardChartBar;
