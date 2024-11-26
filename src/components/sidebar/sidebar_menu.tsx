import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { time } from "console";

type Item = {
  icon: React.ReactNode;
  label: string;
  link: string;
  subItems: Item[];
  isActive?: boolean;
};

interface Props {
  defaultLink: string;
}
const SidebarMenu: React.FC<Props> = ({defaultLink}) => {
  const navigate = useNavigate();
  const [menuItems, setMenuItem] = useState<Item[]>([
    {
      icon: <LayoutDashboard className="h-3 w-3" />,
      label: "Tổng Quan",
      link: "/home",
      subItems: [],
      isActive: false,
    },
    {
      icon: <Table className="h-4 w-4" />,
      label: "Tài Chính Kinh Doanh",
      link: "/home/Enterprise",
      subItems: [],
      isActive: false,
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      label: "Tin Tức",
      link: "/home/News",
      subItems: [],
      isActive: false,
    },
    {
      icon: <Glasses className="h-4 w-4" />,
      label: "Phân Tích & Thống Kê",
      link: "/home/Analyst",
      subItems: [],
      isActive: false,
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      label: "Đầu Tư Doanh Nghiệp",
      link: "/home/Creditcard",
      subItems: [],
      isActive: false,
    },
  ]);

  const getItemUI = (
    item: Item,
    baseStyle: string,
    defaultStyle: string,
    activeStyle: string
  ) => {
    baseStyle += item.isActive ? activeStyle : defaultStyle;
    return baseStyle;
  };

  const handleBeforeNavigate = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    currentItem: Item
  ) => {
    event.preventDefault(); // Ngăn chặn chuyển hướng ngay lập tức
    // Thực hiện các thao tác cần thiết trước khi chuyển hướng, ví dụ:
    console.log("Running some logic before navigating");
    setMenuItem((items) => {
      return items.map((i) =>
        i.link === currentItem.link
          ? { ...i, isActive: true }
          : { ...i, isActive: false }
      );
      
    });
    // Sau khi hoàn tất logic, chuyển hướng bằng navigate
    navigate(currentItem.link);
  };

  useEffect(() => {
    setMenuItem((items) =>
      items.map((i) =>
        i.link === defaultLink
         ? {...i, isActive: true }
          : {...i, isActive: false }
      )
    );
    // Cleanup logic
    return () => {
      // Perform any necessary cleanup actions here
    };
  }, [])

  return (
    <div className="w-[95%] h-full bg-white opacity-95 rounded-xl flex flex-col shadow-2xl backdrop-blur-sm">
      {/* Brand */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <MonitorSmartphone className="h-6 w-6" />
          <span className="text-sm">Financial Cash Flow</span>
        </Link>
      </div>

      <Separator />

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item, index) => (
          <Link
            to={item.link}
            className={getItemUI(
              item,
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all ",
              "text-gray-500 hover:text-gray-900",
              "text-blue-500 hover:text-blue-600"
            )}
            onClick={(event) => handleBeforeNavigate(event, item)}
          >
            <div
              className={getItemUI(
                item,
                "flex h-8 w-8 items-center justify-center rounded-full ",
                "bg-gray-100",
                "bg-blue-500 text-white"
              )}
            >
              {item.icon}
            </div>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
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
            <span className="text-sm">Hồ Sơ</span>
          </Link>

          <Link
            to="/sign-in"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <LogIn className="h-4 w-4" />
            </div>
            <span className="text-sm">Đăng Nhập</span>
          </Link>

          <Link
            to="/sign-up"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <UserPlus className="h-4 w-4" />
            </div>
            <span className="text-sm">Đăng Ký</span>
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
            onClick={() => {
              window.open(
                "https://docs.google.com/document/d/1YUdo369WVhiO12o80Ov1JE5cyAAA2hRW/edit?usp=sharing&ouid=107856111568153284279&rtpof=true&sd=true"
              );
            }}
          >
            DOCUMENTATION
          </Button>
        </div>
        <Button className="mt-4 w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105 active:opacity-85 transform transition-transform duration-300">
          Đăng Ký Premium
        </Button>
      </div>
    </div>
  );
};

export default SidebarMenu;
