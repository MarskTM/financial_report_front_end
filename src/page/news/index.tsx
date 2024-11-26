import React from "react";
import { Header, SidebarMenu } from "@/components";
interface Props {}

const NewsPage: React.FC<Props> = ({}) => {
  return (
    <div className="w-screen h-full bg-neutral-100 relative">
      <div className="w-[83%] fixed top-3 left-72 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/News" />
      </div>

      {/* Page Content */}
      <div className="w-[83%] h-full pt-28 ml-72 z-40"></div>
    </div>
  );
};

export default NewsPage;
