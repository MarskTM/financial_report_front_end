import React from 'react';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import { Chart } from 'react-chartjs-2';
import { Card, Typography, Row, Col } from 'antd';

ChartJS.register(TreemapController, TreemapElement, Tooltip, Legend);

const DashboardTreeMapChart: React.FC = () => {
	const data = {
		datasets: [
			{
				data: [
					{ value: 26, label: 'EIB (+0.26%)', backgroundColor: '#4CAF50' },
					{ value: 37, label: 'HDB (+3.7%)', backgroundColor: '#4CAF50' },
					{ value: 15, label: 'STB (-1.47%)', backgroundColor: '#FF5252' },
				],
				borderColor: '#fff',
				borderWidth: 1,
				spacing: 1,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			tooltip: {
				callbacks: {
					label: (context: any) => {
						const item = context.raw;
						return `${item.label}: ${item.value}`;
					},
				},
			},
			legend: {
				display: false,
			},
		},
	};

	return (
		<Row gutter={[16, 16]}>
			<Col span={6}>
				<Card>
					<Typography.Title level={4}>Chỉ số thị trường</Typography.Title>
					<div>
						<Typography.Text>VN-Index: 1,272.07 (-0.14%)</Typography.Text>
						<br />
						<Typography.Text>HNX-Index: 229.24 (+0.01%)</Typography.Text>
						<br />
						<Typography.Text>UPCoM-Index: 92.74 (-0.18%)</Typography.Text>
						<br />
						<Typography.Text>GTGD: 16,372.14 tỷ</Typography.Text>
						<br />
						<Typography.Text>KLGD: 730.14 triệu</Typography.Text>
					</div>
				</Card>
			</Col>
			<Col span={18}>
				<Card>
					<Typography.Title level={4}>
						TreeMap Thống kê thị trường
					</Typography.Title>
					<div style={{ height: '500px', width: '100%' }}>
						<Chart type="treemap" data={data} options={options} />
					</div>
				</Card>
			</Col>
		</Row>
	);
};

export default DashboardTreeMapChart;
