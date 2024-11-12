import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Table,
  CreditCard,
  Glasses,
  Languages,
  UserCircle2,
  LogIn,
  UserPlus,
  Star,
  MonitorSmartphone,
} from "lucide-react";

interface Props {}

const SidebarMenu: React.FC<Props> = ({}) => {
  return (
    <div className="w-full h-full bg-white opacity-95 shadow-xl rounded-xl flex flex-col">
      {/* Brand */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <MonitorSmartphone className="h-6 w-6" />
          <span>Financial Cash Flow</span>
        </Link>
      </div>

      <Separator />

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span>Trang chủ</span>
        </Link>

        <Link
          to="/tables"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <Table className="h-4 w-4" />
          </div>
          <span>Báo cáo tài chính</span>
        </Link>

        <Link
          to="/billing"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-blue-500 transition-all hover:text-blue-600"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
          <span>Tin Tức</span>
        </Link>

        <Link
          to="/virtual-reality"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <Glasses className="h-4 w-4" />
          </div>
          <span>Phân Tích & Thống Kê</span>
        </Link>

        <Link
          to="/rtl"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <Languages className="h-4 w-4" />
          </div>
          <span>Hồ Sơ Đầu Tư</span>
        </Link>
      </nav>

      {/* Account Pages */}
      <div className="p-4">
        <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          QUẢN LÝ TÀI KHOẢN
        </h2>
        <nav className="space-y-1">
          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <UserCircle2 className="h-4 w-4" />
            </div>
            <span>Profile</span>
          </Link>

          <Link
            to="/sign-in"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <LogIn className="h-4 w-4" />
            </div>
            <span>Sign In</span>
          </Link>

          <Link
            to="/sign-up"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <UserPlus className="h-4 w-4" />
            </div>
            <span>Sign Up</span>
          </Link>
        </nav>
      </div>

      {/* Help Section */}
      <div className="p-4">
        <div className="rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 p-4 text-white">
          <div className="mb-2 flex justify-center">
            <div className="rounded-lg bg-white/20 p-2">
              <Star className="h-6 w-6" />
            </div>
          </div>
          <h3 className="mb-1 text-center font-semibold">Need help?</h3>
          <p className="mb-3 text-center text-sm text-blue-100">
            Please check our docs
          </p>
          <Button
            variant="secondary"
            className="w-full bg-white text-blue-600 hover:bg-white/90"
          >
            DOCUMENTATION
          </Button>
        </div>
        <Button className="mt-4 w-full bg-gradient-to-r from-blue-400 to-blue-600">
          Đăng Ký Premium 
        </Button>
      </div>
    </div>
  );
};

export default SidebarMenu;
