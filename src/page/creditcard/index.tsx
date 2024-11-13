import React from "react";
import { Header, SidebarMenu } from "@/components";
interface Props {}

const Creditcard: React.FC<Props> = ({}) => {
  return (
    <div className="w-screen h-full bg-slate-200 relative">
      <div className="w-[82%] fixed top-3 left-80 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-80 h-[95vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Creditcard" />
      </div>

      {/* Page Content */}
      <div className="w-[82%] h-full pt-28 ml-80 z-40"></div>
    </div>
  );
};

export default Creditcard;
