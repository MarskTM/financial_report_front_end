import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip } from 'antd';
import { EyeOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';

import * as api from '@/redux/api/profile';
import { RootState } from '@/redux/Store';
import { useDispatch, useSelector } from 'react-redux';

import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
	customTable: css`
		.ant-table {
			height: 330px; /* Xét chiều cao cố định của bảng */
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

interface DocumentRecord {
	key: string;
	stt: number;
	name: string;
	createdDate: Date;
}

interface Props {}

const TableFinancialReportFavorite: React.FC<Props> = () => {
	const { styles } = useStyle();
	const dispatch = useDispatch();
	const profile = useSelector((state: RootState) => state.auth.profile);
	const history = useSelector((state: RootState) => state.report.historyReport);
	const [documents, setDocuments] = useState<DocumentRecord[]>([]);
	console.log('Documents:', history);

	useEffect(() => {
		if (profile.id) {
			api.GetUserHistoryReport(profile.id, dispatch);
		}
	}, [profile.id, dispatch]); // Replace with your actual API call to fetch data

	useEffect(() => {
		if (history.length > 0) {
			setDocuments(
				history.map<DocumentRecord>((val, index) => ({
					key: `${val.id}` || '',
					stt: index + 1,
					name: val.name || '-',
					createdDate: val.created_at || new Date(),
				})),
			);
		}
	}, [history]);

	// Xử lý thao tác "Xóa"
	const handleDelete = (key: string) => {
		setDocuments(documents.filter((doc) => doc.key !== key));
	};

	// Xử lý thao tác "Xem"
	const handleView = (record: DocumentRecord) => {
		alert(`Xem tài liệu: ${record.name}`);
	};

	// Xử lý thao tác "Tải"
	const handleDownload = (record: DocumentRecord) => {
		alert(`Tải tài liệu: ${record.name}`);
	};

	// Cấu hình các cột của bảng
	const columns = [
		{
			title: 'STT',
			dataIndex: 'stt',
			key: 'stt',
			width: '10%',
			className: 'text-left',
		},
		{
			title: 'Tên tài liệu',
			dataIndex: 'name',
			key: 'name',
			className: 'text-left',
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdDate',
			key: 'createdDate',
			width: '20%',
			className: 'text-left',
		},
		{
			title: 'Thao tác',
			key: 'actions',
			width: '20%',
			className: 'text-center',
			render: (record: DocumentRecord) => (
				<div className="flex justify-center gap-2">
					<Tooltip title="Xem">
						<Button
							type="primary"
							shape="circle"
							icon={<EyeOutlined />}
							onClick={() => handleView(record)}
						/>
					</Tooltip>
					<Tooltip title="Tải xuống">
						<Button
							type="default"
							shape="circle"
							icon={<DownloadOutlined />}
							onClick={() => handleDownload(record)}
						/>
					</Tooltip>
					<Tooltip title="Xóa">
						<Button
							type="primary"
							danger
							shape="circle"
							icon={<DeleteOutlined />}
							onClick={() => handleDelete(record.key)}
						/>
					</Tooltip>
				</div>
			),
		},
	];

	return (
		<div className="p-6 h-[400px] rounded">
			<h2 className="text-base font-semibold mb-4">Phân tích của tôi</h2>
			<Table
				columns={columns}
				dataSource={documents}
				rowKey={(record) => record.key}
				pagination={{ pageSize: 10 }}
				scroll={{ y: 55 * 5 }}
				className={styles.customTable}
			/>
		</div>
	);
};

export default TableFinancialReportFavorite;
