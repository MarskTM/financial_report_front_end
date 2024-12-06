import { FinancialAnalysisModel } from "@/redux/model/financial_report";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData, // Import ChartData
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Hàm trả về biểu đồ
export default function RateIndexGroupChart({
  data,
  unit,
}: {
  data: { [year: string]: FinancialAnalysisModel } | null;
  unit: string;
}) {
  const chartData = processChartData(data);

  return (
    <div className="mt-16">
      <Chart
        type="bar"
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "BIỂU ĐỒ CHỈ SỐ TỈ SUẤT",
            },
          },
          scales: {
            y: {
              type: "linear",
              position: "left",
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: "",
              },
            },
            y1: {
              type: "linear",
              position: "right",
              title: {
                display: true,
                text: "YOEA",
              },
            },
          },
        }}
        height={180}
      />
    </div>
  );
}

function processChartData(
  data: { [year: string]: FinancialAnalysisModel } | null
): ChartData {
  if (!data) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const labels = Object.keys(data); // Thời gian (ví dụ: ['Q1 2023', 'Q2 2023', 'Q3 2023'])

  const roeData = labels.map((year) =>
    data[year]?.roe != null ? data[year].roe : null
  ); // ROEA (Tỷ suất lợi nhuận trên vốn chủ sở hữu bình quân)

  const roaData = labels.map((year) =>
    data[year]?.roa != null ? data[year].roa : null
  ); // ROAA (Tỷ suất sinh lời trên tổng tài sản bình quân)

  const yoeaData = labels.map((year) =>
    data[year]?.yoea != null ? data[year].yoea : null
  ); // YOEA (Tỷ suất sinh lợi của tài sản có sinh lãi)

  const cofData = labels.map((year) =>
    data[year]?.cof != null ? data[year].cof : null
  ); // COF (Tỷ lệ chi phí hình thành tài sản có sinh lãi)

  const nimData = labels.map((year) =>
    data[year]?.nim != null ? data[year].nim : null
  ); // NIM (Tỷ lệ thu nhập lãi thuần)

  return {
    labels,
    datasets: [
      {
        type: "bar",
        label: "ROAA",
        data: roaData,
        borderColor: "#ffc94b",
        backgroundColor: "#ffc94b",
        yAxisID: "y", 
        order: 2,
      },
      {
        type: "line",
        label: "YOEA",
        data: yoeaData,
        borderColor: "#bcbfc6",
        backgroundColor: "#bcbfc6",
        yAxisID: "y1", 
        order: 3,
      },
      {
        type: "bar",
        label: "COF",
        data: cofData,
        borderColor: "#ffa0b4",
        backgroundColor: "#ffa0b4",
        yAxisID: "y", 
        order: 4,
      },
      {
        type: "bar",
        label: "NIM",
        data: nimData,
        borderColor: "#e6d9ff",
        backgroundColor: "#e6d9ff",
        yAxisID: "y", 
        order: 5,
      },
      {
        type: "bar",
        label: "ROEA",
        data: roeData,
        borderColor: "#cdebff",
        backgroundColor: "#cdebff",
        order: 1,
        yAxisID: "y", 
        clip: false, // Ngăn không cho cắt bởi biểu đồ khác
      },
    ],
  };
}
