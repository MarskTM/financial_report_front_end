import React from "react";
import {
  Header,
  SidebarMenu,
  EnterpriseTable,
  SidebarTrending,
} from "@/components";
interface Props {}

const Creditcard: React.FC<Props> = ({}) => {
  return (
    <div className="w-screen h-full bg-neutral-100 relative">
      <div className="w-[83%] fixed pl-2 top-3 left-72 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Creditcard" />
      </div>

      {/* Page Content */}
      <div className="w-[83%] h-full pt-32 pl-2 ml-72 z-40 lg:mr-14 flex flex-row justify-between">
        {/* Main content */}
        <div className="w-3/4 mr-10">
          <EnterpriseTable />
        </div>
        {/* Sub content */}
        <div className="w-1/4">
          <SidebarTrending />
        </div>
      </div>
    </div>
  );
};

export default Creditcard;
