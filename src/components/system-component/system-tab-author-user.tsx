import React, { useEffect, useState } from "react";

import { Input, Button } from "antd";

import { Table, Tag, Select } from "antd";
import { createStyles } from "antd-style";
import type { TableColumnsType } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

// ---------------------------- Declare Constain -----------------------------------
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

const options: SelectProps["options"] = [
  {
    label: (
      <Tag
        color="blue" // Áp dụng màu từ option
        style={{ marginRight: 3 }}
      >
        Client
      </Tag>
    ),
    value: "Client",
  },
  {
    label: (
      <Tag
        color="green" // Áp dụng màu từ option
        style={{ marginRight: 3 }}
      >
        Manager
      </Tag>
    ),
    value: "Manager",
  },
  {
    label: (
      <Tag
        color="purple" // Áp dụng màu từ option
        style={{ marginRight: 3 }}
      >
        Admin
      </Tag>
    ),
    value: "Admin",
  },
];

const columns: TableColumnsType<TableDataProps> = [
  {
    title: "ID",
    dataIndex: "key",
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
    title: "Quyền hạn",
    dataIndex: "roles",
    width: 200,
    render: (_, record) => (
      <Select
        defaultValue={record.roles}
        options={options}
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

interface TableDataProps {
  key: React.Key;
  name: string;
  email: string;
  lastDate: string;
  roles: string;
}

const { Search } = Input;

// -------------------------------- Handel Internal Function --------------------------------
const SystemTabAuthorUser = () => {
  // 1. variables
  const { styles } = useStyle();

  const systemUser = useSelector((state: RootState) => state.auth.system_user);
  const [dataSource, setDataSource] = useState<TableDataProps[]>(() => {
    return systemUser.map((user) => ({
      key: user.id,
      name: user.fullname,
      email: user.username,
      lastDate: "12/07/2024",
      roles: user.role,
    }));
  }); // Tạo dataSource từ systemUser
  const [searchText, setSearchText] = useState<string>("");

  // 2. handlers
  const handelUpdateUser = () => {
    
  };

  // 3. effects
  useEffect(() => {
    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredData = systemUser
      .filter((user) =>
        user.fullname.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((user) => ({
        key: user.id,
        name: user.fullname,
        email: user.username,
        lastDate: "12/07/2024",
        roles: user.role,
      }));
    setDataSource(filteredData);
  }, [searchText, systemUser]); //

  // 4. render
  return (
    <div>
      <div className="flex flex-row absolute right-2 -top-14">
        <Search
          className=""
          placeholder="Tìm kiếm người dùng"
          allowClear
          style={{ width: 400 }}
          onChange={(e) => {
            setSearchText(e.target.value); // Cập nhật từ khóa tìm kiếm
          }}
        />
        <Button type="primary" className="mx-3" onClick={handelUpdateUser}>
          Cập nhật
          <EditOutlined />
        </Button>
      </div>

      <div>
        <Table<TableDataProps>
          className={styles.customTable}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
          scroll={{ y: 55 * 5 }}
        />
      </div>
    </div>
  );
};

export default SystemTabAuthorUser;
