import React from 'react'

import { TableSystemAuthor } from '@/components';

import { Input, Button } from "antd";
import type { GetProps } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

type Props = {}

const SystemTabAuthorUser = (props: Props) => {
  return (
    <div>
      <div className="flex flex-row absolute right-2 -top-14">
        <Search
          className=""
          placeholder="Tìm kiếm người dùng"
          onSearch={onSearch}
          allowClear
          style={{ width: 400 }}
        />
        <Button
          type="primary"
          className="mx-3 "
        >
          Cập nhật
          <EditOutlined />
        </Button>
      </div>

      <TableSystemAuthor />
    </div>
  );
}

export default SystemTabAuthorUser;