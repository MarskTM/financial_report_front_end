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
export default function ValuationIndexChart({
  data,
  unit,
}: {
  data: { [year: string]: FinancialAnalysisModel } | null;
  unit: string;
}) {
  const chartData = processChartData(data);

  return (
    <div className="mt-5">
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
              text: "BIỂU ĐỒ CHỈ SỐ ĐỊNH GIÁ",
            },
          },
          scales: {
            y: {
              type: "linear",
              position: "left",
              title: {
                display: true,
                text: unit,
              },
            },
            y1: {
              type: "linear",
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: "Khối lượng lưu hành",
              },
            },
          },
        }}
        height={150}
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

  // Lấy danh sách năm (labels) và giá trị tương ứng (datasets)
  const labels = Object.keys(data);

  const totalAssetData = labels.map((year) =>
    data[year]?.total_assets != null ? data[year].total_assets : null
  );
  const totalLiabilitieData = labels.map((year) =>
    data[year]?.total_liabilities != null ? data[year].total_liabilities : null
  );
  const outstandingShareData = labels.map((year) =>
    data[year]?.outstanding_shares != null
      ? data[year].outstanding_shares
      : null
  );

  return {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Tổng tài sản",
        data: totalAssetData,
        borderColor: "#8ad7c6",
        backgroundColor: "#8ad7c6",
        yAxisID: "y",
        order: 3,
      },
      {
        type: "bar",
        label: "Tổng nợ",
        data: totalLiabilitieData,
        borderColor: "#6c7b9c",
        backgroundColor: "#6c7b9c",
        yAxisID: "y",
        order: 2,
      },
      {
        type: "line",
        label: "Khối lượng",
        data: outstandingShareData,
        borderColor: "#78c0ff",
        backgroundColor: "#78c0ff",
        yAxisID: "y1",
        order: 1, // Biểu đồ đường được vẽ sau cùng
        tension: 0.3, // Làm đường cong mềm mại
        pointRadius: 2, // Tăng kích thước các điểm
        clip: false, // Ngăn không cho cắt bởi biểu đồ khác
      },
    ],
  };
}
