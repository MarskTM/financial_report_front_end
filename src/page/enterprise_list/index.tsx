import React from "react";
import {
  Header,
  SidebarMenu,
  TableClientEnterprise,
  TableIndustryData,
  ChartUserIndustryLine,
} from "@/components";
interface Props {}

const EnterpriseList: React.FC<Props> = ({}) => {
  return (
    <div className="w-screen h-full bg-slate-100 relative">
      <div className="w-[83%] fixed pl-2 top-3 left-72 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Creditcard" />
      </div>

      {/* Page Content */}
      <div className="w-[83%] h-full pt-32 pl-2 ml-72 z-40 lg:mr-14 flex flex-col">
        {/* Main content */}

        <div className="w-full mb-10 gap-5 flex flex-row items-start justify-between">
          <div className="w-1/2 bg-white h-[100%]">
            <TableIndustryData />
          </div>
          <div className="w-1/2 bg-white h-[100%]">
            <ChartUserIndustryLine />
          </div>
        </div>

        <div className="w-full mr-10">
          <TableClientEnterprise />
        </div>
        {/* Sub content */}
        {/* <div className="w-full">
          <SidebarTrending />
        </div> */}
      </div>
    </div>
  );
};

export default EnterpriseList;
