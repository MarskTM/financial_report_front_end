import React from "react";
import {
  Header,
  SidebarMenu,
  TableEnterpriteReport,
  TidingCard,
} from "@/components";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Home,
  MessageSquare,
  Settings,
  Pencil,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

interface Props {}

const Enterprise: React.FC<Props> = ({}) => {
  const projects = [
    {
      projectNumber: "Project #2",
      title: "Modern",
      description:
        "As Uber works through a huge amount of internal management turmoil.",
      imageUrl: "/placeholder.svg?height=200&width=400",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      projectNumber: "Project #1",
      title: "Scandinavian",
      description:
        "Music is something that every person has his or her own specific opinion about.",
      imageUrl: "/placeholder.svg?height=200&width=400",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      projectNumber: "Project #3",
      title: "Minimalist",
      description:
        "Different people have different taste, and various types of music.",
      imageUrl: "/placeholder.svg?height=200&width=400",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
  ];

  return (
    <div className="w-screen h-full bg-slate-200 relative">
      <div className="w-[83%] fixed top-3 left-72 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Enterprise" />
      </div>

      {/* Page Content */}
      <div className="w-[83%] h-full pt-28 ml-72 z-40">
        <div>
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
                <Link to="https://bidv.com.vn/vn/trang-chu" target="_blank">
                  <Home className="mr-2 h-4 w-4" />
                  Trang chủ
                </Link>
              </Button>
              {/* <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Thông tin chi tiết
              </Button> */}
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Báo cáo tài chính
              </Button>
            </div>
          </div>
z``
          <div className="grid gap-6 md:grid-cols-[300px_1fr_300px]">
            {/* Left Sidebar */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    ACCOUNT
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="follow">
                        Email me when someone follows me
                      </label>
                      <Switch id="follow" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="answer">
                        Email me when someone answers on my post
                      </label>
                      <Switch id="answer" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="mention">
                        Email me when someone mentions me
                      </label>
                      <Switch id="mention" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    APPLICATION
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="launches">
                        New launches and projects
                      </label>
                      <Switch id="launches" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="updates">Monthly product updates</label>
                      <Switch id="updates" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="newsletter">
                        Subscribe to newsletter
                      </label>
                      <Switch id="newsletter" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Main Content */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Hi, I'm Alec Thompson, Decisions: If you can't decide, the
                  answer is no. If two equally difficult paths, choose the one
                  more painful in the short term (pain avoidance is creating an
                  illusion of equality).
                </p>
                <div className="grid gap-4">
                  <div className="grid grid-cols-[100px_1fr] items-center">
                    <span className="font-medium">First Name:</span>
                    <span>Alec M. Thompson</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] items-center">
                    <span className="font-medium">Mobile:</span>
                    <span>(44) 123 1234 123</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] items-center">
                    <span className="font-medium">Email:</span>
                    <span>alecthompson@mail.com</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] items-center">
                    <span className="font-medium">Location:</span>
                    <span>USA</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] items-center">
                    <span className="font-medium">Social:</span>
                    <div className="flex gap-4">
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <Twitter className="h-5 w-5 text-blue-400" />
                      <Instagram className="h-5 w-5 text-pink-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Sidebar */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sophie B.",
                      message: "Hi! I need more information...",
                      avatar: "/placeholder.svg",
                    },
                    {
                      name: "Alexander",
                      message: "Awesome work, can you...",
                      avatar: "/placeholder.svg",
                    },
                    {
                      name: "Ivanna",
                      message: "About files I can...",
                      avatar: "/placeholder.svg",
                    },
                    {
                      name: "Peterson",
                      message: "Have a great afternoon...",
                      avatar: "/placeholder.svg",
                    },
                    {
                      name: "Bruce Mars",
                      message: "Hi! I need more information...",
                      avatar: "/placeholder.svg",
                    },
                  ].map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.message}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        REPLY
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Section */}
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-4">Tin Tức</h2>
            <div className="flex space-x-4 overflow-x-auto p-4">
              {projects.map((project, index) => (
                <TidingCard key={index} {...project} />
              ))}
              <Card className="w-full max-w-sm flex items-center justify-center border-dashed border-2">
                <CardContent className="flex flex-col items-center">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                  <div className="text-muted-foreground mt-2">New project</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Danh sách báo cáo */}
        <TableEnterpriteReport />
      </div>
    </div>
  );
};

export default Enterprise;
