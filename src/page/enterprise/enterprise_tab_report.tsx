import React from "react";
import {
  Header,
  SidebarMenu,
  HealthyEnterpriseChart,
  CompanyFinancialReport,
} from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Settings } from "lucide-react";
import { ROUTE } from "@/utils/route";

type Props = {};

const EnterpriseTabReport = (props: Props) => {
  return (
    <div className="w-screen h-svh bg-slate-100 relative overflow-y-scroll">
      <div className="w-[83%] fixed top-3 left-72 pl-2 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Analyst" />
      </div>

      {/* Page Content */}
      <div className="w-[83%] h-full pt-32 mb-10 ml-72 pl-2 z-40">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="https://image.bnews.vn/MediaUpload/Org/2022/04/26/logo-bidv-20220426071253.jpg"
                alt="Richard Davis"
                className="h-16 w-16"
              />
              <AvatarFallback>RD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam
              </h1>
              <p className="text-muted-foreground">BIDV</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to={ROUTE.ENTERPRISE_DETAIL.PATH}>
                <Home className="mr-2 h-4 w-4" />
                Hồ sơ doanh nghiệp
              </Link>
            </Button>
            <Button variant="outline" className="bg-slate-400/30" asChild>
              <Link to={ROUTE.ANALYST.PATH}>
                <Settings className="mr-2 h-4 w-4" />
                Chỉ sô tài chính
              </Link>
            </Button>
          </div>
        </div>

        <div className="w-full pb-10 min-h-[60vh] bg-white flex lg:flex-row  md:flex-col gap-6">
          {/* Main Content */}
          <div className="w-3/5 m-3 pt-4">
            <CompanyFinancialReport />
          </div>

          {/* Sub content */}
          <div className="w-2/5 ">
            <HealthyEnterpriseChart />
          </div>
        </div>
        {/* space */}
        <div className="w-full h-10"></div>
      </div>
    </div>
  );
};

export default EnterpriseTabReport;
