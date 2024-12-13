import React, { useRef, useState } from 'react';
import {
	Form,
	Input,
	DatePicker,
	Select,
	Upload,
	Button,
	Table,
	InputNumber,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CompanyInfo, CompanyManagements } from '@/redux/model/company';
import dayjs from 'dayjs';

import * as api from '@/redux/api/company';
import { RootState } from '@/redux/Store';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;
interface Props {}

const CompanyTabInsert: React.FC<Props> = ({}) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const companyData = useSelector((state: RootState) => {
		return state.company.company;
	});

	const [boardMembers, setBoardMembers] = useState<CompanyManagements[]>([]);
	const [newBoardMember, setNewBoardMember] = useState<CompanyManagements>({
		id: 0,
		company_id: 0,
		avatar: '',
		name: '',
		position: '',
		year_start: null,
	});

	// Table columns for board members
	const columns = [
		{
			title: 'Avatar',
			dataIndex: 'avatar',
			render: (text: string) => (
				<img src={text} alt="Avatar" className="w-10 h-10 rounded-full" />
			),
			width: 100,
		},
		{ title: 'Tên', dataIndex: 'name', width: 220 },
		{ title: 'Chức vụ', dataIndex: 'position', width: 200 },
		{
			title: 'Năm bắt đầu',
			dataIndex: 'year_start',
			width: 150,
			render: (year_start: Date) => {
				return year_start ? dayjs(year_start).format('DD/MM/YYYY') : '-';
			},
		},
		{
			title: '',
			dataIndex: '',
			render: (_: any, record: any, index: number) => (
				<Button
					type="link"
					className="w-10"
					onClick={() => handleDelete(index)} // Gọi hàm xóa với index
				>
					Xóa
				</Button>
			),
			width: 100,
		},
	];

	// Handle adding a new board member
	const handleAddBoardMember = () => {
		if (newBoardMember.name && newBoardMember.position) {
			setBoardMembers([...boardMembers, newBoardMember]);
			console.log(newBoardMember);
			setNewBoardMember(() => ({
				id: 0,
				company_id: 0,
				avatar: '',
				name: '',
				position: '',
				year_start: null,
			}));
		}
	};

	const handleDelete = (index: number) => {
		const updatedMembers = boardMembers.filter((_, i) => i !== index); // Loại bỏ thành viên theo index
		setBoardMembers(updatedMembers);
	};

	const onFinish = async (values: any) => {
		// Chuyển đổi `values` sang kiểu `CompanyInfo`
		const companyInfo: CompanyInfo = {
			id: values.id || 0, // Nếu form không có id, đặt giá trị mặc định
			company_name: values.companyName || '',
			company_code: values.companyCode || '',
			tax_code: values.taxCode || '',
			establishment_date: values.establishmentDate || null,
			company_type: values.companyType || '',
			company_logo: values.companyLogo || null,
			company_address: values.companyAddress || '',
			company_email: values.companyEmail || '',
			company_phone: values.companyPhone || '',
			company_website: values.companyWebsite || '',
			company_description: values.companyDescription || '',
			first_trading_date: values.firstTradingDate || null,
			first_trading_price: values.firstTradingPrice || null,
			initial_listing_volume: values.initialListingVolume || null,
			current_listing_volume: values.currentListingVolume || null,
			outstanding_shares: values.outstandingShares || null,
			market_capitalization: values.marketCapitalization || null,
		};

		// Thêm code để lưu dữ liệu vào store Redux
		// console.log('Form values: ', companyInfo);

		try {
			await Promise.all([
				api.UpsertCompany(companyInfo, dispatch),
				api.UpsertCompanyStakeholder(
					boardMembers.map((member) => ({
						...member,
						company_id: companyData.id,
					})),
					dispatch,
				),
			]);
			window.location.reload();
		} catch (err) {
			console.error('Error:', err);
		}

		// console.log('Company Id: ', companyData);
		// console.log('Board Members: ', boardMembers);
	};

	return (
		<div className=" bg-white p-12">
			<div className="w-2/3 p-6 m-auto rounded-md shadow-md">
				<h2 className="text-xl font-bold mb-4">Tạo mới mã doanh nghiệp</h2>
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
					className="space-y-6"
				>
					{/* Section 1: Thông tin cơ bản */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
						<Form.Item
							label="Tên công ty"
							name="companyName"
							rules={[
								{ required: true, message: 'Vui lòng nhập tên công ty!' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Mã công ty"
							name="companyCode"
							rules={[
								{ required: true, message: 'Vui lòng nhập mã công ty!' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Mã số thuế"
							name="taxCode"
							rules={[
								{ required: true, message: 'Vui lòng nhập mã công ty!' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Ngày thành lập"
							name="establishmentDate"
							rules={[
								{
									required: true,
									message: 'Vui lòng chọn ngày thành lập!',
								},
							]}
						>
							<DatePicker className="w-full" />
						</Form.Item>
						<Form.Item
							label="Loại hình công ty"
							name="companyType"
							rules={[
								{ required: true, message: 'Vui lòng chọn loại hình!' },
							]}
						>
							<Select>
								<Option value="corporation">Công ty cổ phần</Option>
								<Option value="limited">
									Công ty trách nhiệm hữu hạn
								</Option>
							</Select>
						</Form.Item>
						<Form.Item
							label="Logo công ty"
							name="companyLogo"
							valuePropName="fileList"
							getValueFromEvent={(e) =>
								Array.isArray(e) ? e : e?.fileList || []
							} // Xử lý để trả về mảng
						>
							<Upload
								name="logo"
								listType="picture"
								maxCount={1}
								action="/upload" // Endpoint server để upload ảnh
								onChange={(info) => {
									if (info.file.status === 'done') {
										console.log(
											'File uploaded:',
											info.file.response?.url,
										); // URL trả về từ server
									}
								}}
							>
								<Button icon={<UploadOutlined />}>Tải lên</Button>
							</Upload>
						</Form.Item>
						<Form.Item
							label="Địa chỉ công ty"
							name="companyAddress"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập địa chỉ công ty!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Gmail công ty"
							name="companyEmail"
							rules={[
								{ required: false, message: 'Vui lòng nhập email!' },
								{ type: 'email', message: 'Email không hợp lệ!' },
							]}
						>
							<Input />
						</Form.Item>
					</div>

					{/* Section 2: Ban lãnh đạo */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Ban lãnh đạo</h3>
						<div className="flex items-end gap-4">
							<Input
								placeholder="Avatar URL"
								value={newBoardMember.avatar}
								onChange={(e) =>
									setNewBoardMember((prev) => ({
										...prev,
										avatar: e.target.value,
									}))
								}
								className="w-80"
							/>
							<Input
								placeholder="Tên"
								value={newBoardMember.name}
								onChange={(e) =>
									setNewBoardMember((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}
								className="w-80"
							/>
							<Input
								placeholder="Chức vụ"
								value={newBoardMember.position}
								onChange={(e) =>
									setNewBoardMember((prev) => ({
										...prev,
										position: e.target.value,
									}))
								}
								className="w-64"
							/>
							<DatePicker
								className="w-52"
								placeholder="Năm bắt đầu"
								value={newBoardMember.year_start}
								onChange={(date) =>
									setNewBoardMember((prev) => ({
										...prev,
										year_start: date, // Chuyển từ moment về Date
									}))
								}
							/>
							<Button
								type="primary"
								onClick={handleAddBoardMember}
								className="w-48"
							>
								Thêm
							</Button>
						</div>
						<Table
							columns={columns}
							dataSource={boardMembers}
							rowKey={(record) => `${record.name}-${record.position}`}
							pagination={false}
						/>
					</div>

					{/* Section 3: Thông tin niêm yết */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Thông tin niêm yết</h3>
						<Form.Item
							label="Vốn hóa"
							name="marketCapitalization"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập tổng vốn',
								},
							]}
						>
							<InputNumber className="w-full" min={0} />
						</Form.Item>
						<Form.Item
							label="Ngày giao dịch đầu tiên"
							name="firstTradingDate"
							rules={[
								{
									required: true,
									message: 'Vui lòng chọn ngày giao dịch đầu tiên!',
								},
							]}
						>
							<DatePicker className="w-full" />
						</Form.Item>
						<Form.Item
							label="Giá giao dịch ngày đầu"
							name="firstTradingPrice"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập giá giao dịch!',
								},
							]}
						>
							<InputNumber className="w-full" min={0} />
						</Form.Item>
						<Form.Item
							label="Khối lượng niêm yết lần đầu"
							name="initialListedVolume"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập khối lượng niêm yết!',
								},
							]}
						>
							<InputNumber className="w-full" min={0} />
						</Form.Item>
						<Form.Item
							label="Khối lượng niêm yết hiện tại"
							name="currentListedVolume"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập khối lượng hiện tại!',
								},
							]}
						>
							<InputNumber className="w-full" min={0} />
						</Form.Item>
						<Form.Item
							label="Khối lượng cổ phiếu đang lưu hành"
							name="outstandingShares"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập khối lượng lưu hành!',
								},
							]}
						>
							<InputNumber className="w-full" min={0} />
						</Form.Item>
					</div>

					{/* Submit Button */}
					<Form.Item>
						<Button type="primary" htmlType="submit" className="w-full">
							Tạo mới mã doanh nghiệp
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default CompanyTabInsert;
