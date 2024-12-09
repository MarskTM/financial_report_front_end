import React, { useState } from "react";
import { Table, Button, Tooltip } from "antd";
import {
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";

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
  createdDate: string;
}

interface Props {}

const TableFinancialReportFavorite: React.FC<Props> = () => {
  const { styles } = useStyle();

  const [documents, setDocuments] = useState<DocumentRecord[]>([
    {
      key: "1",
      stt: 1,
      name: "Báo cáo tài chính 2023",
      createdDate: "2023-12-01",
    },
    {
      key: "2",
      stt: 2,
      name: "Kế hoạch phát triển 2024",
      createdDate: "2023-12-05",
    },
    {
      key: "3",
      stt: 2,
      name: "Kế hoạch phát triển 2024",
      createdDate: "2023-12-05",
    },
    {
      key: "4",
      stt: 2,
      name: "Kế hoạch phát triển 2024",
      createdDate: "2023-12-05",
    },
    {
      key: "5",
      stt: 2,
      name: "Kế hoạch phát triển 2024",
      createdDate: "2023-12-05",
    },
    {
      key: "6",
      stt: 2,
      name: "Kế hoạch phát triển 2024",
      createdDate: "2023-12-05",
    },
  ]);

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
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "10%",
      className: "text-left",
    },
    {
      title: "Tên tài liệu",
      dataIndex: "name",
      key: "name",
      className: "text-left",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      width: "20%",
      className: "text-left",
    },
    {
      title: "Thao tác",
      key: "actions",
      width: "20%",
      className: "text-center",
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
