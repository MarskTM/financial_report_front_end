import * as React from "react";
import {
  Header,
  SidebarMenu,
  TableDashboard,
  HomeChartBar,
} from "@/components";

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
    <div className="w-screen h-full bg-slate-50 relative">
      <div className="w-[83%] fixed pl-2 top-3 left-72 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home" />
      </div>

      {/* Page Content */}
      <div className="w-[83%] h-full pl-2 pt-28 ml-72 z-40">
        <div className="space-y-6">
          <div className="flex felx-row">
            {/* Documentation Card */}
            <Card className="flex flex-row justify-between md:w-1/2 lg:w-7/12 h-64 p-5">
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
            <Card className="ml-10 p-5 md:w-1/2 lg:w-5/12 h-64 bg-white">
              <CardContent className="p-6 space-y-4 bg-gradient-to-br text-white from-blue-400 to-blue-600">
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

          <div className="flex flex-row md:grid-cols-2">
            {/* Active Users Card */}
            <Card className="w-1/2 mr-5">
              <CardContent className="p-6">
                <HomeChartBar />
              </CardContent>
            </Card>

            {/* Sales Overview Card */}
            <Card className="w-1/2">
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
