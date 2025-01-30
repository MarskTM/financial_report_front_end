import React, { useEffect, useState } from "react";

import { Input, Button } from "antd";

import { Table, Tag, Select } from "antd";
import { createStyles } from "antd-style";
import type { TableColumnsType } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

import * as api from "@/redux/api/auth";

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
];

interface TableDataProps {
  key: React.Key;
  id: number;
  name: string;
  email: string;
  lastDate: string;
  roles: string;
}

interface UserUpdateRole {
  id: number;
  role: string;
}

interface Props {}

const { Search } = Input;

// -------------------------------- Handel Internal Function --------------------------------
// const handelUpdateUserState = async (id: number, state: boolean) => {
//   // Cập nhật trạng thái người dùng
//   await api.UpdateUserState(id, state);

//   await api.GetListUser(dispatch);
// };

// -------------------------------- Main Component -----------------------------------
const SystemTabAuthorUser: React.FC<Props> = () => {
  // 1. variables
  const { styles } = useStyle();
  const dispatch = useDispatch();

  const systemUser = useSelector((state: RootState) => state.auth.system_user);
  const [dataSource, setDataSource] = useState<TableDataProps[]>(() => {
    return systemUser.map((user) => ({
      id: user.id,
      key: user.id,
      name: user.fullname,
      email: user.username,
      lastDate: "12/07/2024",
      roles: user.role,
    }));
  }); // Tạo dataSource từ systemUser
  const [searchText, setSearchText] = useState<string>("");

  const [listUserChange, setListUserChange] = useState<UserUpdateRole[]>([]);

  // 2. handlers
  const handleRoleChange = (id: number, newRole: string) => {
    setDataSource((prevData) =>
      prevData.map((user) => {
        if (user.id === id) {
          return { ...user, roles: newRole };
        }
        return user;
      })
    );

    setListUserChange((prevList) => {
      const existingUser = prevList.find((user) => user.id === id);

      if (existingUser) {
        // Nếu role giống ban đầu, xóa khỏi danh sách thay đổi
        if (newRole === systemUser.find((user) => user.id === id)?.role) {
          return prevList.filter((user) => user.id !== id);
        }
        // Cập nhật role nếu đã có trong danh sách
        return prevList.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        );
      }

      // Thêm mới nếu chưa tồn tại
      return [...prevList, { id, role: newRole }];
    });
  };

  const handleRowClick = (props: TableDataProps) => {};

  const handelUpdateUser = async () => {
    await api.UpdateUserRoles(listUserChange);
    await api.GetListUser(dispatch);

    // Xóa highlight các dòng đã thay đổi
    setListUserChange([]);

    console.log("handelUpdateUser:", listUserChange);
  };

  const handelUpdateUserState = async (id: number, state: boolean) => {
    // Cập nhật trạng thái người dùng
    await api.UpdateUserState(id, state);

    await api.GetListUser(dispatch);
  };

  // 3. effects
  useEffect(() => {
    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredData = systemUser
      .filter((user) =>
        user.fullname.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((user) => ({
        id: user.id,
        key: user.id,
        name: user.fullname,
        email: user.username,
        lastDate: "12/07/2024",
        roles: user.role,
      }));
    setDataSource(filteredData);
  }, [searchText, systemUser, listUserChange]);

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
        <Button
          type="primary"
          className="mx-3"
          onClick={() => handelUpdateUser()}
        >
          Cập nhật
          <EditOutlined />
        </Button>
      </div>

      <div>
        <Table<TableDataProps>
          className={styles.customTable}
          columns={[
            ...columns.slice(0, 3),
            {
              title: "Quyền hạn",
              dataIndex: "roles",
              render: (_, record) => (
                <Select
                  defaultValue={record.roles}
                  options={options}
                  style={{ width: "100%", marginRight: "50px" }}
                  onChange={(newRole) => handleRoleChange(record.id, newRole)}
                />
              ),
            },
            {
              title: "",
              fixed: "right", // Đặt cột ở bên phải
              render: (_, record) => (
                <div className="flex flex-row gap-3">
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    onClick={() => handelUpdateUserState(record.id, false)}
                  >
                    Cấm
                  </Button>
                </div>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
          scroll={{ y: 55 * 5 }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          rowClassName={(record) =>
            listUserChange.some((user) => user.id === record.id)
              ? "bg-sky-50/50"
              : ""
          }
        />
      </div>
    </div>
  );
};

export default SystemTabAuthorUser;
