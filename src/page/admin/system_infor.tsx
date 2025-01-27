import React, { useEffect, useState } from "react";

import {
  Header,
  SidebarMenu,
  SystemTabAuthorUser,
  UserActiveChart,
  TableTidingCrawl,
  SystemTransferNewsApproval,
  SystemNotifyTimeline,
} from "@/components";

import type { TabsProps } from "antd";
import { Col, Row, Statistic, Input, Tabs } from "antd";

import * as api from "@/redux/api/auth";
import { useDispatch } from "react-redux";

// ---------------------------- Declare Constain -----------------------------------
const items: TabsProps["items"] = [
  // {
  //   key: "1",
  //   label: "Tài Nguyên Hệ Thống",
  //   children: "Content of Tab Pane 2",
  // },
  {
    key: "2",
    label: "Phân Quyền Người Dùng",
    children: <SystemTabAuthorUser />,
  },
];

interface Props {}

// -------------------------------- Handel Internal Function --------------------------------
const SystemInfor: React.FC<Props> = ({}) => {
  // 1. variables
  const dispatch = useDispatch();

  // 2. handlers

  // 3. effects
  useEffect(() => {
    api.GetListUser(dispatch);
  }, []);

  // 4. render
  return (
    <div className="w-screen h-full bg-slate-100 relative">
      <div className="w-[83%] fixed top-3 left-72 pl-2 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Analyst" />
      </div>

      {/* Page Content */}
      <div className="w-[83%] h-full pt-32 mb-10 ml-72 pl-2 z-40">
        <div className="w-full bg-white flex flex-row">
          <div className="w-1/3 h-96 mt-10 ml-5 pl-5 border-r-2">
            <Row gutter={16} className="p-8">
              <Col span={10}>
                <Statistic title="Người Dùng Active" value={1103} />
              </Col>
              <Col span={10}>
                <Statistic title="Số Lượng Truy Vấn" value={112893} />
              </Col>
            </Row>
            <UserActiveChart />
          </div>
          <div className="w-2/3 h-[530px] p-4 relative">
            <Tabs defaultActiveKey="2" items={items} />
          </div>
        </div>

        <div className="w-full h-[460px] flex flex-row mt-5 mb-8 gap-4">
          <div className="w-3/5 bg-white">
            <TableTidingCrawl />
          </div>
          <div className="w-2/5 h-[460px] bg-white">
            <SystemNotifyTimeline />
          </div>
        </div>

        <div className="w-full h-[650px] bg-white">
          <SystemTransferNewsApproval />
        </div>
      </div>
    </div>
  );
};

export default SystemInfor;
