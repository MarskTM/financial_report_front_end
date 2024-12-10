import React, { useState } from 'react';
import {
	Transfer,
	Modal,
	Table,
	Button,
	Input,
	Tooltip,
	Space,
	Tag,
	Checkbox,
} from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { TransferDirection } from 'antd/es/transfer';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
	customTable: css`
		.ant-table {
			height: 400px; /* Xét chiều cao cố định của bảng */
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

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const { TextArea } = Input;
const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

interface NewsItem {
	key: string;
	title: string;
	type: string;
	createdDate: string;
	updatedDate: string;
	content: string;
}

const SystemTransferNewsApproval: React.FC = () => {
	const initialNews: NewsItem[] = [
		{
			key: '1',
			title: 'Tin tức 1',
			type: 'Thời sự',
			createdDate: '2023-12-01',
			updatedDate: '2023-12-05',
			content: 'Nội dung chi tiết của tin tức 1.',
		},
		{
			key: '2',
			title: 'Tin tức 2',
			type: 'Kinh tế',
			createdDate: '2023-12-02',
			updatedDate: '2023-12-06',
			content: 'Nội dung chi tiết của tin tức 2.',
		},
		{
			key: '3',
			title: 'Tin tức 3',
			type: 'Giải trí',
			createdDate: '2023-12-03',
			updatedDate: '2023-12-07',
			content: 'Nội dung chi tiết của tin tức 3.',
		},
		{
			key: '4',
			title: 'Tin tức 4',
			type: 'Giải trí',
			createdDate: '2023-12-03',
			updatedDate: '2023-12-07',
			content: 'Nội dung chi tiết của tin tức 3.',
		},
		{
			key: '5',
			title: 'Tin tức 5',
			type: 'Giải trí',
			createdDate: '2023-12-03',
			updatedDate: '2023-12-07',
			content: 'Nội dung chi tiết của tin tức 3.',
		},
		{
			key: '6',
			title: 'Tin tức 7',
			type: 'Giải trí',
			createdDate: '2023-12-03',
			updatedDate: '2023-12-07',
			content: 'Nội dung chi tiết của tin tức 3.',
		},
		{
			key: '7',
			title: 'Tin tức 7',
			type: 'Giải trí',
			createdDate: '2023-12-03',
			updatedDate: '2023-12-07',
			content: 'Nội dung chi tiết của tin tức 3.',
		},
		{
			key: '8',
			title: 'Tin tức 8',
			type: 'Giải trí',
			createdDate: '2023-12-03',
			updatedDate: '2023-12-07',
			content: 'Nội dung chi tiết của tin tức 3.',
		},
	];

	const [sourceData, setSourceData] = useState<NewsItem[]>(initialNews);
	const [targetKeys, setTargetKeys] = useState<React.Key[]>([]);
	const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const { styles } = useStyle();

	const handleTransfer = (
		keys: React.Key[],
		direction: TransferDirection,
		moveKeys: React.Key[],
	) => {
		if (direction === 'right') {
			setTargetKeys([...targetKeys, ...moveKeys]);
		} else {
			setTargetKeys(targetKeys.filter((key) => !moveKeys.includes(key)));
		}
	};

	const handleViewDetails = (news: NewsItem) => {
		setSelectedNews(news);
		setIsModalVisible(true);
	};

	const handleDelete = (key: string) => {
		setSourceData(sourceData.filter((item) => item.key !== key));
		setTargetKeys(targetKeys.filter((targetKey) => targetKey !== key));
	};

	const filterData = (data: NewsItem[]) =>
		data.filter((item) =>
			item.title.toLowerCase().includes(searchValue.toLowerCase()),
		);

	const renderTable = (data: NewsItem[], isTarget: boolean, isPublish: boolean) => (
		<div>
			<div className="flex flex-row my-2">
				<Input
					placeholder="Tìm kiếm..."
					prefix={<SearchOutlined />}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					className="mb-3 rounded-none border-none"
				/>
				{!isPublish && (
					<Button key="close" onClick={() => setIsModalVisible(true)}>
						Thêm mới
					</Button>
				)}
			</div>
			<Table
				dataSource={filterData(data)}
				rowKey="key"
				pagination={{ pageSize: 5 }}
				columns={[
					{
						title: '',
						dataIndex: 'key',
						render: (_: any, record: NewsItem) => (
							<Checkbox
								checked={
									isTarget ? targetKeys.includes(record.key) : false
								}
								onChange={() => {
									const exists = targetKeys.includes(record.key);
									if (exists) {
										setTargetKeys((prevKeys) =>
											prevKeys.filter((key) => key !== record.key),
										);
									} else {
										setTargetKeys((prevKeys) => [
											...prevKeys,
											record.key,
										]);
									}
								}}
							/>
						),
						width: 40,
					},
					{
						title: 'Stt',
						dataIndex: 'key',
						render: (_: string, __: any, index: number) => index + 1,
						width: 50,
					},
					{
						title: 'Tiêu đề',
						dataIndex: 'title',
						width: 250,
					},
					{
						title: 'Loại tin',
						dataIndex: 'type',
						render: (type: string) => <Tag color="blue">{type}</Tag>,
					},
					{
						title: 'Cập nhật',
						dataIndex: 'updatedDate',
					},
					{
						title: 'Thao tác',
						render: (record: NewsItem) => (
							<Space>
								<Tooltip title="Xem chi tiết">
									<Button
										type="primary"
										shape="circle"
										icon={<EyeOutlined />}
										onClick={(e) => {
											e.stopPropagation();
											handleViewDetails(record);
										}}
									/>
								</Tooltip>
								<Tooltip title="Xóa">
									<Button
										type="default"
										danger
										shape="circle"
										icon={<DeleteOutlined />}
										onClick={(e) => {
											e.stopPropagation();
											handleDelete(record.key);
										}}
									/>
								</Tooltip>
							</Space>
						),
					},
				]}
				className={styles.customTable}
				scroll={{ y: 55 * 6 }}
			/>
		</div>
	);

	return (
		<div className="p-6 bg-white">
			<h2 className="text-lg font-bold mb-4">Phê duyệt tin tức</h2>
			<Transfer
				dataSource={sourceData}
				targetKeys={targetKeys}
				onChange={handleTransfer}
				render={(item) => item.title}
				titles={['Tin tức cần duyệt', 'Tin tức đã duyệt']}
				operations={['Phê duyệt', 'Hủy phê duyệt']}
			>
				{({ direction }) =>
					direction === 'left'
						? renderTable(
								sourceData.filter(
									(item) => !targetKeys.includes(item.key),
								),
								false,
								false,
						  )
						: renderTable(
								sourceData.filter((item) =>
									targetKeys.includes(item.key),
								),
								true,
								true,
						  )
				}
			</Transfer>

			<Modal
				title="Chi tiết tin tức"
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={[
					<Button key="close" onClick={() => setIsModalVisible(false)}>
						Đóng
					</Button>,
				]}
			>
				{selectedNews && (
					<div>
						<h3 className="text-lg font-bold mb-2">{selectedNews.title}</h3>
						<p>
							<strong>Loại tin tức:</strong> {selectedNews.type}
						</p>
						<p>
							<strong>Ngày tạo:</strong> {selectedNews.createdDate}
						</p>
						<p>
							<strong>Ngày cập nhật:</strong> {selectedNews.updatedDate}
						</p>
						<p>
							<strong>Nội dung:</strong> {selectedNews.content}
						</p>
					</div>
				)}
			</Modal>

			{/* Hiển thị chi tiết */}
			<Modal
				title="Chi tiết bài đọc"
				// open={isModalOpen}
				// onOk={handleOk}
				style={{ marginRight: 50 }}
				width={1600}
				height={600}
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={[
					<Button
						key="close"
						onClick={() => setIsModalVisible(false)}
						className="mx-2"
					>
						Cập nhật
					</Button>,
					<Button key="close" onClick={() => setIsModalVisible(false)}>
						Đóng
					</Button>,
				]}
			>
				<div className="flex flex-row justify-between">
					<div className="w-1/2 mr-4">
						<TextArea
							rows={22}
							placeholder="maxLength is 6"
							maxLength={800}
							//   autoSize={{ minRows: 12, maxRows: 24 }}
						/>
					</div>
					<div className="w-1/2">
						<h1 className="font-bold border-b-2">Preview</h1>
						<Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default SystemTransferNewsApproval;
