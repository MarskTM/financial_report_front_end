import React from 'react';
import {
	Header,
	SidebarMenu,
	TableEnterpriseReport,
	HistoricalTimeline,
	StockChart,
} from '@/components';
import { Link, Router } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Home, Settings, Pencil } from 'lucide-react';
import { ROUTE } from '@/utils/route';

interface Props {}

const Enterprise: React.FC<Props> = ({}) => {
	return (
		<div className="w-screen h-full bg-slate-100 relative">
			<div className="w-[83%] fixed pl-2 top-3 left-72 z-50">
				<Header />
			</div>

			{/* Navbar Position */}
			<div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
				<SidebarMenu defaultLink="/home/Enterprise" />
			</div>

			{/* Page Content */}
			<div className="w-[83%] h-full pt-32 pl-2 ml-72 z-40 lg:mr-14">
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
									Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt
									Nam
								</h1>
								<p className="text-muted-foreground">BIDV</p>
							</div>
						</div>

						<div className="flex gap-4">
							<Button variant="outline" className="bg-slate-400/30" asChild>
								<Link to={ROUTE.ENTERPRISE_DETAIL.PATH}>
									<Home className="mr-2 h-4 w-4" />
									Hồ Sơ Doanh Nghiệp
								</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link to={ROUTE.ANALYST.PATH}>
									<Settings className="mr-2 h-4 w-4" />
									Thông Tin Tài Chính
								</Link>
							</Button>
						</div>
					</div>

					<div className="w-full flex flex-row">
						{/* Main Content */}
						<Card className="w-3/5 backdrop-blur-xl bg-white shadow-none border-none">
							<CardHeader className=" flex flex-row items-center justify-between">
								<CardTitle className="text-base text-blue-950 underline underline-offset-2">
									Ban lãnh Đạo
								</CardTitle>
								<Button variant="ghost" size="icon">
									<Pencil className="h-4 w-4" />
								</Button>
							</CardHeader>
							<CardContent className="space-y-6">
								<h1 className="text-2xl font-bold">
									Thông điệp từ Chủ tịch Hội đồng Quản trị Phan Đức Tú
								</h1>
								<p className="text-muted-foreground">
									67 năm xây dựng và trưởng thành là hành trình đầy tự
									hào của lớp lớp thế hệ cán bộ lãnh đạo, người lao động
									của BIDV, trải qua “bao thác, bao ghềnh” đã trui rèn,
									bồi tụ nên bản lĩnh, cốt cách kiên cường, vượt khó của
									“Người BIDV”. Tại mốc son này, với quyết tâm của Ban
									lãnh đạo, sự đồng sức, đồng lòng của tập thể cán bộ
									người lao động, BIDV đã hội tụ đầy đủ điều kiện, quyết
									tâm và khát vọng để thay đổi và chinh phục những đỉnh
									cao mới.
								</p>

								<div className="pt-10 grid gap-4">
									<div className="grid grid-cols-[100px_1fr] items-center text-sm">
										<span className="font-medium">Email:</span>
										<span>bidv247@bidv.com.vn</span>
									</div>
									<div className="grid grid-cols-[100px_1fr] items-center text-sm">
										<span className="font-medium">Liên hệ:</span>
										<span className="">
											(+84) 19009247 (Cá nhân) / 19009248 (Doanh
											nghiệp)
										</span>
									</div>
									<div className="grid grid-cols-[100px_1fr] items-center text-sm">
										<span className="font-medium">Địa chỉ:</span>
										<span>
											Tháp BIDV, 194 Trần Quang Khải, Hoàn Kiếm, Hà
											Nội.
										</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Right Sidebar */}
						<Card className="w-2/5 ml-5 backdrop-blur-xl bg-white shadow-none border-none">
							<CardHeader>
								<CardTitle className="text-lg text-blue-950 font-bold ">
									Hội Đồng Quản Trị
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[
										{
											name: 'Ông Phan Đức Tú',
											message: 'Chủ tịch HĐQT',
											avatar: 'https://bidv.com.vn/wps/wcm/connect/5bf17139-7ff3-4447-ada1-d5ba53fd6ac2/L%C4%90+on+web-27.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-5bf17139-7ff3-4447-ada1-d5ba53fd6ac2-p8P78oK',
										},
										{
											name: 'Ông Lê Ngọc Lâm',
											message: 'Ủy viên HĐQT',
											avatar: 'https://bidv.com.vn/wps/wcm/connect/1aed2e57-abe6-45f6-ba26-d62d813313a2/L%C4%90+on+web-06.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-1aed2e57-abe6-45f6-ba26-d62d813313a2-p8P7L2S',
										},
										{
											name: 'Ông Đặng Văn Tuyên',
											message: 'Ủy viên HĐQT',
											avatar: 'https://bidv.com.vn/wps/wcm/connect/5cc11c81-d8ac-473e-a11d-3d37ad9737ab/L%C4%90+on+web-09.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-5cc11c81-d8ac-473e-a11d-3d37ad9737ab-p8P6Sng',
										},
										{
											name: 'Ông Yoo Je Bong',
											message: 'Ủy viên HĐQT',
											avatar: 'https://bidv.com.vn/wps/wcm/connect/2bddafa7-d013-4081-98ff-2d18c985e39f/L%C4%90+on+web-14.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-2bddafa7-d013-4081-98ff-2d18c985e39f-p8P70Eq',
										},
										{
											name: 'Ông Trần Xuân Hoàng',
											message: 'Ủy viên HĐQT',
											avatar: 'https://bidv.com.vn/wps/wcm/connect/02a03e65-3af5-4c66-8936-eff07d57f86e/L%C4%90+on+web-20.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-02a03e65-3af5-4c66-8936-eff07d57f86e-p8P7G6q',
										},
									].map((user, index) => (
										<div
											key={index}
											className="p-2 flex items-center justify-between border-2 rounded-md bg-slate-100"
										>
											<div className="flex items-center gap-3">
												<Avatar>
													<AvatarImage
														src={user.avatar}
														alt={user.name}
													/>
													<AvatarFallback>
														{user.name[0]}
													</AvatarFallback>
												</Avatar>
												<div>
													<div className="font-medium text-base">
														{user.name}
													</div>
													<div className="text-sm text-muted-foreground">
														{user.message}
													</div>
												</div>
											</div>
											<Button variant="outline" size="sm">
												Chi tiết
											</Button>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Historical Time line */}
					<HistoricalTimeline />

					{/* Stock Chart*/}
					<div className="w-full h-[800px] pt-16 bg-white my-20">
						<StockChart />
					</div>
				</div>

				{/* Danh sách báo cáo */}
				<TableEnterpriseReport />
			</div>
		</div>
	);
};

export default Enterprise;
