import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Table,
  CreditCard,
  Glasses,
  UserCircle2,
  LogIn,
  UserPlus,
  MonitorSmartphone,
} from "lucide-react";
import { ROUTE } from "@/utils/route";

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
const SidebarMenu: React.FC<Props> = ({ defaultLink }) => {
  const navigate = useNavigate();
  const [menuItems, setMenuItem] = useState<Item[]>([
    {
      icon: <LayoutDashboard className="h-3 w-3" />,
      label: "Tổng Quan",
      link: ROUTE.HOME.PATH,
      subItems: [],
      isActive: false,
    },
    {
      icon: <Table className="h-4 w-4" />,
      label: "Tài Chính Kinh Doanh",
      link: ROUTE.ENTERPRISE.PATH,
      subItems: [],
      isActive: false,
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      label: "Tin Tức",
      link: ROUTE.NEWS.PATH,
      subItems: [],
      isActive: false,
    },
    {
      icon: <Glasses className="h-4 w-4" />,
      label: "Phân Tích & Thống Kê",
      link: ROUTE.ANALYST_EXTRACT.PATH,
      subItems: [],
      isActive: false,
    },
    // {
    // 	icon: <CreditCard className="h-4 w-4" />,
    // 	label: 'Đầu Tư Doanh Nghiệp',
    // 	link: ROUTE.ENTERPRISE_DETAIL.PATH,
    // 	subItems: [],
    // 	isActive: false,
    // },
  ]);

  const [adminMenuItems, setAdminMenuItems] = useState<Item[]>([
    {
      icon: <LayoutDashboard className="h-3 w-3" />,
      label: "Thông Số Hệ Thống",
      link: ROUTE.ADMIN_INFO.PATH,
      subItems: [],
      isActive: false,
    },
    {
      icon: <Table className="h-4 w-4" />,
      label: "Doanh Nghiệp",
      link: ROUTE.ADMIN_COMPANY.PATH,
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

    setAdminMenuItems((items) => {
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
          ? { ...i, isActive: true }
          : { ...i, isActive: false }
      )
    );
    // Cleanup logic
    return () => {
      // Perform any necessary cleanup actions here
    };
  }, []);

  return (
    <div className="w-[95%] h-full bg-white opacity-95 rounded-xl flex flex-col shadow-2xl backdrop-blur-sm">
      {/* =====================================================  Main Navigation =========================================================== */}
      {/* Brand */}
      <div className="px-6 py-5">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <MonitorSmartphone className="h-6 w-6" />
          <span className="text-sm">Financial Cash Flow</span>
        </Link>
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.link}
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

      {/* ===================================================== Admin Navigation =========================================================== */}
      <div className="p-4">
        <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Quản Trị Viên
        </h2>
        <Separator />
        <nav className="space-y-1">
          {adminMenuItems.map((item) => (
            <Link
              key={item.link}
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
      </div>

      {/* ===================================================== Account Pages =========================================================== */}
      <div className="p-4">
        <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Cài Đặt
        </h2>
        <Separator />
        <nav className="space-y-1">
          <Link
            to={ROUTE.PROFILE.PATH}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <UserCircle2 className="h-4 w-4" />
            </div>
            <span className="text-sm">Hồ Sơ</span>
          </Link>

          <Link
            to={ROUTE.LOGIN.PATH}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <LogIn className="h-4 w-4" />
            </div>
            <span className="text-sm">Đăng Nhập</span>
          </Link>

          <Link
            to={ROUTE.REGISTER.PATH}
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
      {/* <div className="p-4">
        <Button className="mt-4 w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105 active:opacity-85 transform transition-transform duration-300">
          Đăng Ký Premium
        </Button>
      </div> */}
    </div>
  );
};

export default SidebarMenu;
