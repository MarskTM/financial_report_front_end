import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellIcon, HomeIcon, Settings2Icon } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {}

const Header: React.FC<Props> = ({}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cập nhật state chỉ khi vượt quá 50px để giảm số lần cập nhật
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else if (window.scrollY <= 100) {
        setIsScrolled(false);
      }
    };

    // Thêm sự kiện scroll vào window
    window.addEventListener("scroll", handleScroll);

    // Làm sạch sự kiện khi component unmounts để tránh rò rỉ bộ nhớ
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("Resizing...");
  return (
    <header
      className={`transition delay-150 duration-200 ease-in-out rounded-xl backdrop-blur-xl ${
        isScrolled
          ? "bg-white/80 drop-shadow-lg shadow-blue-500/50"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center px-4">
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">Dashboard</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative w-full max-w-[300px]">
            <Input
              type="search"
              placeholder="Type here..."
              className={`pr-8 transition delay-200 duration-200 ease-in-out bg-zinc-50 `}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <Button variant="ghost" size="icon">
            <Settings2Icon className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button variant="ghost" size="icon">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          {/* <Button variant="outline" size="sm">
            Sign in
          </Button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
