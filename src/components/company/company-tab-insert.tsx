import React, { useState } from 'react';
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
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
interface Props {}

const CompanyTabInsert: React.FC<Props> = ({}) => {
	const [form] = Form.useForm();
	const [boardMembers, setBoardMembers] = useState<
		{ avatar: string; name: string; position: string }[]
	>([]);
	const [newBoardMember, setNewBoardMember] = useState({
		avatar: '',
		name: '',
		position: '',
		yearStart: '',
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
		{ title: 'Năm bắt đầu', dataIndex: 'yearStart', width: 150 },
		{
			title: '',
			dataIndex: '',
			render: () => (
				<Button type="link" className="w-10">
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
			setNewBoardMember({ avatar: '', name: '', position: '', yearStart: '' });
		}
	};

	const onFinish = (values: any) => {
		console.log('Form values: ', values);
		console.log('Board Members: ', boardMembers);
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
						>
							<Upload name="logo" listType="picture" maxCount={1}>
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
								{ required: true, message: 'Vui lòng nhập email!' },
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
							<Input
								placeholder="Năm bắt đầu"
								value={newBoardMember.yearStart}
								onChange={(e) =>
									setNewBoardMember((prev) => ({
										...prev,
										yearStart: e.target.value,
									}))
								}
								className="w-52"
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
