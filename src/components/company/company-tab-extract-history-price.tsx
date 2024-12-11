import React, { useState } from 'react';
import { Table, Upload, Button, Select, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ReadHistoryStockExcelFile, ConvertDBToUIFormat } from '@/utils/common'; // Hàm đọc file Excel
import { HistoryStock } from '@/redux/model/financial_report';
import { notify } from '@/utils/toast';

export interface StockDataUI {
	date: string; // Ngày
	openingPrice: string; // Giá mở cửa
	highestPrice: string; // Giá cao nhất
	lowestPrice: string; // Giá thấp nhất
	closingPrice: string; // Giá đóng cửa
	priceChange: string; // Thay đổi giá
	percentChange: string; // % Thay đổi
	volume: string; // Khối lượng
}
const places = ['HOSE', 'HNX', 'UPCOM'];
const unitConcurrency = ['Đồng'];
const reportYears = ['2022', '2023', '2024'];

const CompanyTabExtractHistoryPrice: React.FC = () => {
	const [dataSource, setDataSource] = useState<StockDataUI[]>([]);
	const [loading, setLoading] = useState(false);

	const handleUpload = async (file: File) => {
		setLoading(true);
		try {
			// Đọc dữ liệu từ file Excel
			const dataForDB = await ReadHistoryStockExcelFile(file);

			// Chuyển đổi dữ liệu sang format UI
			const dataForUI = ConvertDBToUIFormat(dataForDB);

			// Cập nhật state
			setDataSource(dataForUI);

			// Lưu `dataForDB` vào DB nếu cần
			console.log('Dữ liệu để lưu DB:', dataForDB);
		} catch (error) {
			console.error('Error reading Excel file:', error);
		} finally {
			setLoading(false);
		}
	};

	const [formValues, setFormValues] = useState({
		unitConcurrency: 'Đồng',
		reportYear: '2023',
	});

	const handleFormValueChange = (updatedFields: Partial<typeof formValues>) => {
		setFormValues((prevValues) => {
			const newValues = { ...prevValues, ...updatedFields };
			return newValues;
		});
	};

	const handelSaveToHistory = () => {
		if (dataSource === null) {
			console.log('handel save to history');
			notify('warning', 'Vui lòng cung cấp dữ liệu phân tích của bạn!');
		}
	};

	const columns = [
		{
			title: 'Ngày',
			dataIndex: 'date',
			key: 'date',
		},
		{
			title: 'Giá mở cửa',
			dataIndex: 'openingPrice',
			key: 'openingPrice',
		},
		{
			title: 'Giá cao nhất',
			dataIndex: 'highestPrice',
			key: 'highestPrice',
		},
		{
			title: 'Giá thấp nhất',
			dataIndex: 'lowestPrice',
			key: 'lowestPrice',
		},
		{
			title: 'Giá đóng cửa',
			dataIndex: 'closingPrice',
			key: 'closingPrice',
		},
		{
			title: 'Thay đổi giá',
			dataIndex: 'priceChange',
			key: 'priceChange',
		},
		{
			title: '% Thay đổi',
			dataIndex: 'percentChange',
			key: 'percentChange',
		},
		{
			title: 'Khối lượng',
			dataIndex: 'volume',
			key: 'volume',
		},
	];

	return (
		<div className="h-full w-full z-40">
			<div className="flex flex-row">
				<Form
					layout="inline"
					initialValues={formValues}
					onValuesChange={handleFormValueChange}
					style={{
						padding: '20px',
					}}
					className="w-full bg-slate-300/90 flex flex-row"
				>
					<Form.Item label="Dữ liệu trên sàn" name="place">
						<Select
							placeholder="Sàn giao dịch"
							defaultValue={places[0]}
							style={{ width: 150 }}
							options={places.map((place) => ({
								label: place,
								value: place,
							}))}
						/>
					</Form.Item>
					<Form.Item label="Năm bắt đầu" name="reportYear">
						<Select
							placeholder="Chọn năm"
							style={{ width: 100 }}
							defaultValue={reportYears[1]}
							options={reportYears.map((quarter) => ({
								label: quarter,
								value: quarter,
							}))}
						/>
					</Form.Item>

					<Form.Item label="Đơn vị tiền tệ" name="unitConcurrency">
						<Select
							placeholder="Chọn đơn vị"
							defaultValue={unitConcurrency[0]}
							style={{ width: 120 }}
							options={unitConcurrency.map((unit) => ({
								label: unit,
								value: unit,
							}))}
						/>
					</Form.Item>
					<div className="ml-auto w-72 flex flex-row items-center justify-between">
						<Upload
							accept=".xlsx, .xls"
							beforeUpload={(file) => {
								handleUpload(file);
								return false; // Ngăn upload tự động
							}}
							showUploadList={false}
						>
							<Button icon={<UploadOutlined />}>Tải lên file Excel</Button>
						</Upload>
						<Button type="primary" onClick={handelSaveToHistory}>
							Lưu Phân Tích
						</Button>
					</div>
				</Form>
			</div>
			<Table
				dataSource={dataSource}
				columns={columns}
				rowKey="date"
				loading={loading}
				pagination={{ pageSize: 10 }}
			/>
		</div>
	);
};

export default CompanyTabExtractHistoryPrice;
