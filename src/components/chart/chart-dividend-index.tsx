import {
	FinancialAnalysisModel,
} from '@/redux/model/financial_report';
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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
);

// Hàm trả về biểu đồ
export default function DividendIndexChart({
	data,
	unit,
}: {
	data: { [year: string]: FinancialAnalysisModel } | null;
	unit: string;
}) {
	const chartData = processChartData(data);

	return (
		<Chart
			type="bar"
			data={chartData}
			options={{
				responsive: true,
				plugins: {
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'CỔ TỨC TRÊN MỖI CỔ PHIẾU',
					},
				},
				scales: {
					y: {
						type: 'linear',
						position: 'left',
						title: {
							display: true,
							text: unit,
						},
					},
					y1: {
						type: 'linear',
						position: 'right',
						grid: {
							drawOnChartArea: false,
						},
						title: {
							display: true,
							text: 'Tỷ lệ (%)',
						},
					},
				},
			}}
		/>
	);
}

function processChartData(
	data: { [year: string]: FinancialAnalysisModel } | null,
): ChartData {
	if (!data) {
		return {
			labels: [],
			datasets: [],
		};
	}

	// Lấy danh sách năm (labels) và giá trị tương ứng (datasets)
	const labels = Object.keys(data);
	const epsDataset = labels.map((year) => data[year]?.eps ?? null); // EPS values
	const bvpsDataset = labels.map((year) => data[year]?.bvps ?? null); // BVPS values
	const peDataset = labels.map((year) => data[year]?.pe ?? null); // P/E values
	const pbDataset = labels.map((year) => data[year]?.pb ?? null); // P/B values

	return {
		labels,
		datasets: [
			{
				type: 'bar',
				label: 'EPS',
				data: epsDataset,
				backgroundColor: '#3e95cd',
			},
			{
				type: 'bar',
				label: 'BVPS',
				data: bvpsDataset,
				backgroundColor: '#8e5ea2',
			},
			{
				type: 'line',
				label: 'P/E',
				data: peDataset,
				borderColor: '#e8c3b9',
				backgroundColor: '#e8c3b9',
				tension: 0.6,
			},
			{
				type: 'line',
				label: 'P/B',
				data: pbDataset,
				borderColor: '#c45850',
				backgroundColor: '#c45850',
				tension: 0.6,
			},
		],
	};
}