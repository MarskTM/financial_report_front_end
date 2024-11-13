import * as React from "react";
import { Header, SidebarMenu, TableDashboard } from "@/components";

//
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ArrowRight, Rocket } from "lucide-react";

const salesData = [
  { month: "Apr", value1: 50, value2: 40 },
  { month: "May", value1: 30, value2: 90 },
  { month: "Jun", value1: 290, value2: 50 },
  { month: "Jul", value1: 200, value2: 200 },
  { month: "Aug", value1: 450, value2: 250 },
  { month: "Sep", value1: 250, value2: 300 },
  { month: "Oct", value1: 400, value2: 400 },
  { month: "Nov", value1: 200, value2: 450 },
  { month: "Dec", value1: 450, value2: 400 },
];

interface Props {}

const HomePage: React.FC<Props> = ({}) => {
  return (
    <div className="w-screen h-full bg-slate-200 relative">
      <div className="w-[82%] fixed top-3 left-80 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-80 h-[95vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home" />
      </div>

      {/* Page Content */}
      <div className="w-[82%] h-full pt-28 ml-80 z-40">
        <div className="p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            {/* Documentation Card */}
            <Card className="flex flex-row md:col-span-2 lg:col-span-3">
              <CardContent className="p-6 w-96">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Build by developers
                  </div>
                  <h2 className="text-2xl font-bold">Soft UI Dashboard</h2>
                  <p className="text-sm text-muted-foreground">
                    From colors, cards, typography to complex elements, you will
                    find the full documentation.
                  </p>
                  <button className="inline-flex items-center text-sm text-primary">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </CardContent>

              {/* Rocket Card */}
              <Card className="w-96 bg-gradient-to-br from-blue-400 to-blue-600">
                <CardContent className="p-6 flex justify-center items-center">
                  <Rocket className="h-32 w-32 text-white" />
                </CardContent>
              </Card>
            </Card>

            {/* Work with rockets Card */}
            <Card className="md:col-span-2 lg:col-span-2 bg-navy-900 text-white bg-gradient-to-br from-blue-400 to-blue-600">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Work with the rockets</h2>
                <p className="text-sm opacity-90">
                  Wealth creation is an evolutionarily recent positive-sum game.
                  It is all about who take the opportunity first.
                </p>
                <button className="inline-flex items-center text-sm">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Active Users Card */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div className="h-[200px] w-full bg-muted/10">
                    {/* Bar chart visualization */}
                    <div className="flex justify-between h-full px-2">
                      {[400, 200, 100, 200, 400, 100, 400, 200, 400].map(
                        (height, i) => (
                          <div
                            key={i}
                            className="w-4 bg-primary/60 self-end"
                            style={{ height: (height / 400) * 100 + "%" }}
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Active Users</h3>
                    <p className="text-sm text-muted-foreground">
                      (+23%) than last week
                    </p>
                    <div className="mt-4 grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-2xl font-bold">36K</div>
                        <div className="text-sm text-muted-foreground">
                          Users
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">2M</div>
                        <div className="text-sm text-muted-foreground">
                          Clicks
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">$435</div>
                        <div className="text-sm text-muted-foreground">
                          Sales
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">43</div>
                        <div className="text-sm text-muted-foreground">
                          Items
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sales Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span>Sales Overview</span>
                    <span className="text-sm font-normal text-green-500">
                      <span className="text-green-500">↑</span> 4% more in 2021
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <XAxis dataKey="month" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Line
                        type="monotone"
                        dataKey="value1"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="value2"
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <TableDashboard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
