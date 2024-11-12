import * as React from "react";
import { Header, SidebarMenu } from "@/components";
interface Props {}

const HomePage: React.FC<Props> = ({}) => {
  return (
    <div className="w-screen min-h-screen bg-slate-100 scroll-kit relative">
      <div className="w-[82%] fixed top-3 left-80 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-80 h-[95vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu />
      </div>

      {/* Page Content */}
      <div className="w-full ml-80 relative top-28 z-40 bg-slate-500">
        {/* Your Page Content Here */}
        <div className="w-full h-60 bg-red-100"></div>
        <div className="h-[200vh] bg-slate-100"></div>
      </div>
    </div>
  );
};

export default HomePage;
