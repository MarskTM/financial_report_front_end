import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "10-06-2024", price: 45000 },
  { date: "17-06-2024", price: 45500 },
  { date: "24-06-2024", price: 44500 },
  { date: "01-07-2024", price: 43500 },
  { date: "08-07-2024", price: 46000 },
  { date: "15-07-2024", price: 45500 },
  { date: "22-07-2024", price: 46500 },
  { date: "29-07-2024", price: 45000 },
  { date: "05-08-2024", price: 45500 },
  { date: "12-08-2024", price: 45000 },
  { date: "19-08-2024", price: 47500 },
  { date: "26-08-2024", price: 46500 },
  { date: "02-09-2024", price: 45700 },
];

const timeRanges = ["1m", "3m", "6m", "YTD", "1y", "All"];

interface Props {}

const StockChart: React.FC<Props> = () => {
  const [selectedRange, setSelectedRange] = useState("3m");

  return (
    <Card className="w-full max-w-5xl mx-auto border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold">Cổ phiếu BID</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">45.700</span>
            <div className="flex items-center text-green-500">
              <ArrowUp className="h-4 w-4" />
              <span>+350 (+0.8%)</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="BID">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mã doanh nghiệp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BID">BID</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#006D75] hover:bg-[#005A61]">SO SÁNH</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {timeRanges.map((range) => (
                <Button
                  key={range}
                  variant={selectedRange === range ? "default" : "outline"}
                  onClick={() => setSelectedRange(range)}
                  className={
                    selectedRange === range
                      ? "bg-[#006D75] hover:bg-[#005A61]"
                      : ""
                  }
                >
                  {range}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">From</span>
              <input
                type="date"
                defaultValue="2024-06-06"
                className="border rounded px-2 py-1"
              />
              <span className="text-sm text-muted-foreground">To</span>
              <input
                type="date"
                defaultValue="2024-09-06"
                className="border rounded px-2 py-1"
              />
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickMargin={10} />
                <YAxis
                  domain={["auto", "auto"]}
                  fontSize={12}
                  tickMargin={10}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#006D75"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div>
              <div className="text-sm text-muted-foreground">Sàn</div>
              <div className="font-medium">HOSE</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">KLGD</div>
              <div className="font-medium">1.874.700 (CP)</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">GTGD</div>
              <div className="font-medium">85.395,00 (Triệu VND)</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Vốn hóa</div>
              <div className="font-medium">260.509,92 (Tỷ VND)</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
