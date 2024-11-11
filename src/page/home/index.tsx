import * as React from "react";
import { Bar, Line } from "recharts";
import {
  Bell,
  ChevronRight,
  Home,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const salesData = [
  { name: "Apr", value: 100, comparison: 80 },
  { name: "May", value: 320, comparison: 120 },
  { name: "Jun", value: 220, comparison: 180 },
  { name: "Jul", value: 420, comparison: 250 },
  { name: "Aug", value: 520, comparison: 320 },
  { name: "Sep", value: 450, comparison: 280 },
  { name: "Oct", value: 380, comparison: 350 },
  { name: "Nov", value: 250, comparison: 380 },
  { name: "Dec", value: 420, comparison: 420 },
];

interface Props {}

const HomePage: React.FC<Props> = ({}) => {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <LayoutDashboard className="mr-2 h-6 w-6" />
            <span className="font-semibold">Soft UI Dashboard</span>
          </div>
          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Tables
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <ShoppingCart className="h-4 w-4" />
                Billing
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                Virtual Reality
              </Button>
              <div className="pt-4">
                <h4 className="mb-1 px-2 text-xs font-semibold uppercase">
                  Account Pages
                </h4>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign In
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <User className="h-4 w-4" />
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="p-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Need help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Please check our docs
                  </p>
                  <Button className="w-full" variant="outline">
                    Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Type here..."
                  className="w-full bg-white pl-8 dark:bg-gray-950 sm:w-[300px]"
                />
              </div>
            </form>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Money
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$53,000</div>
                <p className="text-xs text-green-500">+55% than last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,300</div>
                <p className="text-xs text-green-500">+3% than last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+3,462</div>
                <p className="text-xs text-red-500">-2% than yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$103,430</div>
                <p className="text-xs text-green-500">+5% than yesterday</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Build by developers</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-[1fr_200px]">
                <div>
                  <h3 className="text-xl font-bold">Soft UI Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    From colors, cards, typography to complex elements, you will
                    find the full documentation.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Read More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    alt="Rocket illustration"
                    className="aspect-square"
                    height="200"
                    src="/placeholder.svg"
                    width="200"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#252f40] text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Work with the rockets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Wealth creation is an evolutionarily recent positive-sum game.
                  It is all about who take the opportunity first.
                </p>
                <Button variant="secondary">
                  Read More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <p className="text-sm text-muted-foreground">
                  (+23%) than last week
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="text-xl font-bold">36K</div>
                      <div className="text-sm text-muted-foreground">Users</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xl font-bold">2M</div>
                      <div className="text-sm text-muted-foreground">
                        Clicks
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xl font-bold">$435</div>
                      <div className="text-sm text-muted-foreground">Sales</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xl font-bold">43</div>
                      <div className="text-sm text-muted-foreground">Items</div>
                    </div>
                  </div>
                  <ChartContainer
                    className="aspect-[4/3]"
                    config={{
                      data: {
                        label: "Active Users",
                        color: "hsl(var(--primary))",
                      },
                    }}
                  >
                    <Bar
                      data={[
                        { name: "Jan", value: 400 },
                        { name: "Feb", value: 300 },
                        { name: "Mar", value: 200 },
                        { name: "Apr", value: 400 },
                        { name: "May", value: 200 },
                        { name: "Jun", value: 300 },
                        { name: "Jul", value: 400 },
                        { name: "Aug", value: 200 },
                      ]}
                      dataKey="value"
                    />
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <p className="text-sm text-muted-foreground">4% more in 2021</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="aspect-[4/3]"
                  config={{
                    value: {
                      label: "Current Year",
                      color: "hsl(var(--primary))",
                    },
                    comparison: {
                      label: "Previous Year",
                      color: "hsl(var(--muted))",
                    },
                  }}
                >
                  <Line
                    data={salesData}
                    dataKey="value"
                    strokeWidth={2}
                    dot={false}
                    style={{
                      stroke: "hsl(var(--primary))",
                    }}
                  />
                  <Line
                    data={salesData}
                    dataKey="comparison"
                    strokeWidth={2}
                    dot={false}
                    style={{
                      stroke: "hsl(var(--muted))",
                    }}
                  />
                  <ChartTooltip />
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
