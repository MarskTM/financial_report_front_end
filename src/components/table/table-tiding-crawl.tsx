import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, CodeOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
	customTable: css`
		.ant-table {
			height: 310px; /* Xét chiều cao cố định của bảng */
			.ant-table-container {
				height: 100%; /* Đảm bảo container sử dụng toàn bộ chiều cao */
				.ant-table-body,
				.ant-table-content {
					scrollbar-width: thin;
					scrollbar-color: #eaeaea transparent;
					scrollbar-gutter: stable;
				}
				,
				.ant-pagination {
					margin-top: auto; /* Đẩy phần phân trang xuống đáy */
				}
			}
		}
	`,
}));

interface DataProps {
	key: React.Key;
	sourceName: string;
	crawlUrl: string;
}

const TableTidingCrawl: React.FC = () => {
	const [data, setData] = useState<DataProps[]>(() => {
		return Array.from({ length: 5 }).map<DataProps>((_, i) => ({
			key: i,
			sourceName: `Source Edward King ${i}`,
			crawlUrl: `https://example.com/source/${i}`,
		}));
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	const handleAddSource = () => {
		form.validateFields().then((values) => {
			const newData: DataProps = {
				key: `${data.length + 1}`,
				sourceName: values.sourceName,
				crawlUrl: values.crawlUrl,
			};
			setData([...data, newData]);
			handleCancel();
		});
	};

	const handleDelete = (key: React.Key) => {
		setData(data.filter((item) => item.key !== key));
	};

	const columns = [
		{
			title: 'Tên Nguồn',
			dataIndex: 'sourceName',
			key: 'sourceName',
			width: '30%',
		},
		{
			title: 'Đường Dẫn Crawl',
			dataIndex: 'crawlUrl',
			key: 'crawlUrl',
			width: '50%',
			render: (text: string) => (
				<a
					href={text}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500"
				>
					{text}
				</a>
			),
		},
		{
			title: 'loại tin',
			dataIndex: 'sourceName',
			key: 'sourceName',
			width: '30%',
		},
		{
			title: 'Hành Động',
			key: 'actions',
			width: '20%',
			render: (_: any, record: DataProps) => (
				<Button
					type="text"
					danger
					icon={<DeleteOutlined />}
					onClick={() => handleDelete(record.key)}
				>
					Xóa
				</Button>
			),
		},
	];

	const { styles } = useStyle();

	return (
		<div className="p-4">
			<div className="flex justify-between items-center mb-7">
				<h2 className="text-lg font-bold">Danh Sách Nguồn Crawl Data</h2>

				<Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
					Thêm Nguồn
				</Button>
			</div>

			{/* Bảng dữ liệu */}
			<Table<DataProps>
				dataSource={data}
				columns={columns}
				pagination={{ pageSize: 4 }}
				scroll={{ y: 330 }}
				// className="shadow-md h-[460px]"
				className={styles.customTable}
			/>

			{/* Modal thêm nguồn */}
			<Modal
				title="Thêm Nguồn Crawl"
				open={isModalOpen}
				onCancel={handleCancel}
				onOk={handleAddSource}
				okText="Thêm"
				cancelText="Hủy"
			>
				<Form form={form} layout="vertical">
					<Form.Item
						label="Tên Nguồn"
						name="sourceName"
						rules={[{ required: true, message: 'Vui lòng nhập tên nguồn!' }]}
					>
						<Input placeholder="Tên nguồn" />
					</Form.Item>
					<Form.Item
						label="Đường Dẫn Crawl"
						name="crawlUrl"
						rules={[
							{ required: true, message: 'Vui lòng nhập đường dẫn crawl!' },
							{ type: 'url', message: 'Vui lòng nhập một URL hợp lệ!' },
						]}
					>
						<Input placeholder="https://example.com" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default TableTidingCrawl;
