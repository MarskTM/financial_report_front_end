import React from "react";
import { Header, SidebarMenu } from "@/components";

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
  return (
    <div className="w-screen h-full bg-slate-200 relative">
      <div className="w-[82%] fixed top-3 left-80 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-80 h-[95vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Enterprise" />
      </div>

      {/* Page Content */}
      <div className="w-[82%] h-full pt-28 ml-80 z-40">
        <div>
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" alt="Richard Davis" />
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Richard Davis</h1>
                <p className="text-muted-foreground">CEO / Co-Founder</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" />
                App
              </Button>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[300px_1fr_300px]">
            {/* Left Sidebar */}
            <Card>
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
            </Card>

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
            <h2 className="text-lg font-medium mb-4">Projects</h2>
            <h3 className="text-muted-foreground mb-4">
              Architects design houses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <img
                    src={`/placeholder.svg?height=300&width=400`}
                    alt={`Project ${i}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enterprise;
