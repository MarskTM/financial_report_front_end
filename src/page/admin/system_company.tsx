import React, { useState } from "react";
import {
  Header,
  SidebarMenu,
  TableSystemEnterprise,
  CompanyTabInsert,
} from "@/components";

import type { ConfigProviderProps, RadioChangeEvent, TabsProps } from "antd";
import { Radio, Tabs } from "antd";

type SizeType = ConfigProviderProps["componentSize"];

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Danh sách doanh nghiệp",
    children: <TableSystemEnterprise />,
  },
  {
    key: "2",
    label: "Tạo mã doanh nghiệp",
    children: <CompanyTabInsert />,
  },
];

type Props = {};

const SystemCompany = (props: Props) => {
  const [size, setSize] = useState<SizeType>("small");

  const onChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  return (
    <div className="w-screen h-full bg-slate-100 relative">
      <div className="w-[83%] fixed top-3 left-72 pl-2 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Analyst" />
      </div>

      <div className="w-[83%] h-full pt-32 mb-10 ml-72 pl-2 z-40">
        <Tabs defaultActiveKey="1" type="card" size={size} items={items} />
      </div>
    </div>
  );
};

export default SystemCompany;
