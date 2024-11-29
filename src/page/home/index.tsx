import * as React from 'react';
import {
	Header,
	SidebarMenu,
	TableFinancialReportFavorite,
	DashboardChartBar,
	DashboardTidings,
} from '@/components';

//
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const salesData = [
	{ month: 'Apr', value1: 50, value2: 40 },
	{ month: 'May', value1: 30, value2: 90 },
	{ month: 'Jun', value1: 290, value2: 50 },
	{ month: 'Jul', value1: 200, value2: 200 },
	{ month: 'Aug', value1: 450, value2: 250 },
	{ month: 'Sep', value1: 250, value2: 300 },
	{ month: 'Oct', value1: 400, value2: 400 },
	{ month: 'Nov', value1: 200, value2: 450 },
	{ month: 'Dec', value1: 450, value2: 400 },
];

interface Props {}

const HomePage: React.FC<Props> = ({}) => {
	return (
		<div className="w-screen h-full bg-slate-100 relative">
			<div className="w-[83%] fixed pl-2 top-3 left-72 z-50">
				<Header />
			</div>

			{/* Navbar Position */}
			<div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
				<SidebarMenu defaultLink="/home" />
			</div>

			{/* Page Content */}
			<div className="w-[83%] h-full pl-2 pt-28 ml-72 mb-10 z-40">
				<div className="space-y-6">
					<div className="flex felx-row">
						{/* new tiding*/}
						<Card className="flex flex-row justify-around md:w-1/2 lg:w-7/12 h-96 p-5 ">
							<CardContent className="p-3 w-1/2 lg:mr-14">
								<div className="space-y-2 flex flex-col">
									<Link
										to="/home/News"
										className="text-sm font-bold underline underline-offset-2 text-blue-950"
									>
										Tin tức nổi bật
									</Link>
									<h2 className="text-2xl font-bold">
										Thị trường 9 triệu tài khoản, sao VN-Index quẩn
										quanh mốc 1.200 điểm?
									</h2>
									<p className="text-sm text-muted-foreground">
										Các yếu tố vĩ mô trong nước và thế giới có nhiều
										tín hiệu tích cực, ủng hộ xu hướng đi lên của thị
										trường chứng khoán, thế nhưng với 9 triệu tài
										khoản VN-Index vẫn chỉ loanh quanh mốc hơn 1.200
										điểm.
									</p>

									<button className="pt-16 inline-flex items-center justify-end text-sm text-slate-600">
										Chi tiết <ArrowRight className="ml-1 h-4 w-4" />
									</button>
								</div>
							</CardContent>

							<Card className="w-96 bg-gradient-to-br from-blue-400 to-blue-600">
								<img
									className="w-full h-full rounded-md"
									src="https://cafefcdn.com/thumb_w/640/203337114487263232/2024/11/24/avatar1732411481291-17324114819651110845126.png"
									alt="test"
								/>
							</Card>
						</Card>

						{/* list tidings */}
						<Card className="ml-6 px-5 py-7 md:w-1/2 lg:w-5/12 h-96">
							<span className="text-xl font-bold text-blue-900 drop-shadow-xl">
								Tin tức trong ngày
							</span>
							<DashboardTidings />
						</Card>
					</div>

					<div className="flex flex-row">
						{/* dashboard chart bar*/}
						<Card className="w-1/2 mr-5">
							<CardContent className="p-6">
								<DashboardChartBar />
							</CardContent>
						</Card>

						{/* dashboard Sales Card */}
						<Card className="w-1/2 ">
							<CardHeader>
								<CardTitle>
									<div className="flex items-baseline gap-2">
										<span className="text-xl font-bold">
											Sales Overview
										</span>
										<span className="text-sm font-normal text-green-500">
											<span className="text-green-500">↑</span> 4%
											more in 2021
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

					<Card>
						<TableFinancialReportFavorite pageName='home' />
					</Card>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
