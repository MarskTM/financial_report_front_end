import React from "react";
import {
  Header,
  SidebarMenu,
} from "@/components";

type Props = {};

const SystemCompany = (props: Props) => {
  return (
    <div className="w-screen h-full bg-slate-100 relative">
      <div className="w-[83%] fixed top-3 left-72 pl-2 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Analyst" />
      </div>
    </div>
  );
};

export default SystemCompany;
