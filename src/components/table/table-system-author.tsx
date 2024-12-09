import React from "react";
import { Table, Tag, Button, Select } from "antd";
import { createStyles } from "antd-style";
import type { TableColumnsType } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";

const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table {
      height: 350px; /* Xét chiều cao cố định của bảng */
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





type TagRender = SelectProps["tagRender"];

const options: SelectProps["options"] = [
  { label: "Client", value: "client", color: "blue" },
  { label: "Admin", value: "admin", color: "green" },
];

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;

  // Lấy thông tin màu từ options
  const color =
    options.find((option) => option.value === value)?.color || "default";

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={color} // Sử dụng màu đã định nghĩa trong options
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 5 }}
    >
      {label}
    </Tag>
  );
};

const columns: TableColumnsType<DataProps> = [
  {
    title: "ID",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "Người dùng",
    dataIndex: "name",
    width: 200,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 240,
  },
  {
    title: "Online",
    dataIndex: "lastDate",
    width: 150,
  },
  {
    title: "Quyền hạn",
    dataIndex: "roles",
    width: 200,
    render: (_, record) => (
      <Select
        mode="multiple"
        defaultValue={record.roles} // Hiển thị giá trị mặc định dựa trên record.roles
        options={options}
        tagRender={tagRender}
        style={{ width: "100%", marginRight: "50px" }}
      />
    ),
  },
  {
    title: "",
    fixed: "right", // Đặt cột ở bên phải
    render: () => {
      return (
        <div className="flex flex-row gap-3">
          <Button type="text" icon={<DeleteOutlined />} size="small" danger>
            Cấm
          </Button>
        </div>
      );
    },
  },
];

const dataSource = Array.from({ length: 100 }).map<DataProps>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  email: `Edward King ${i}@gmail.com`,
  lastDate: "12/07/2024",
  roles: ["admin", "client"],
}));

interface DataProps {
  key: React.Key;
  name: string;
  email: string;
  lastDate: string;
  roles: string[];
}

const TableSystemAuthor: React.FC = ({}) => {
  const { styles } = useStyle();
  return (
    <div>
      <Table<DataProps>
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        scroll={{ y: 55 * 5 }}
      />
    </div>
  );
};

export default TableSystemAuthor;
