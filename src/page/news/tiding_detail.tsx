import React from 'react';
import { Header, SidebarMenu, CategoryTiding, SubCategoryTiding } from '@/components';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

import { Card, Typography, Space, Row, Col, Button, Image } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface Props {}

const TidingDetail: React.FC<Props> = ({}) => {

  const newsItems = [
		{
			id: 1,
			title: `LEGO Manufacturing Việt Nam được vinh danh là "Nơi Làm Việc Tốt Nhất Việt Nam® 2024"`,
			reached: 1,
			label: 'HOT',
			labelColor: 'destructive',
		},
		{
			id: 2,
			title: 'Chuyển tiền Kiều hối Ria về Việt Nam tại Agribank – phí 0 đồng',
			reached: 1,
			label: 'HOT',
			labelColor: 'destructive',
		},
		{
			id: 3,
			title: 'HT Pearl - Hành trình 1 năm kiến tạo nhịp sống an cư lý tưởng',
			reached: 1,
			label: 'NEW',
			labelColor: 'success',
		},
		{
			id: 4,
			title: 'TECHPRO: Tiên phong trong lĩnh vực chuyển đổi số tại Việt Nam',
			reached: 1,
		},
		{
			id: 5,
			title: 'Dàn đội mẫu xe ô tô cực chất tại Ô Tô Hoàng Kim',
			reached: 1,
		},
		{
			id: 6,
			title: 'VitaDairy được vinh danh top 10 công ty thực phẩm uy tín 2024',
			reached: 1,
		},
  ];

	return (
		<div className="w-screen h-full bg-slate-100 relative">
			<div className="w-[83%] fixed top-3 left-72 z-50">
				<Header />
			</div>

			{/* Navbar Position */}
			<div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
				<SidebarMenu defaultLink="/home/News" />
			</div>

			{/* Page Content */}
			<div className="w-[83%] h-full pt-28 mb-10 ml-96 z-40 flex flex-row gap-10 items-start">
				<div className="w-3/5">
					{/* Article */}
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<Card bordered={false}>
								{/* Title and Time */}
								<Space
									direction="vertical"
									size="small"
									style={{ width: '100%' }}
								>
									<Title level={1}>
										Giông buồm ra khơi: Loạt doanh nghiệp trên sàn rót
										hàng triệu USD ra nước ngoài
									</Title>
									<div className="w-full flex flex-row justify-between items-center mb-2">
										<Text type="secondary">1 giờ trước</Text>
										{/* Like Button */}
										<Button
											type="primary"
											icon={<LikeOutlined />}
											className="mt-2"
											style={{
												backgroundColor: '#1890ff',
												borderColor: '#1890ff',
											}}
										>
											Thích 10
										</Button>
									</div>
								</Space>

								{/* Main content */}
								<Paragraph>
									Lẽ thường, khi một doanh nghiệp đủ lớn mạnh cũng là
									lúc giấc mơ của họ bay xa. Năm 2024 chứng kiến một
									loạt doanh nghiệp muốn vươn mình ra biển lớn, đặc biệt
									trong những tháng cuối năm, với các kế hoạch rót hàng
									triệu USD ra thị trường nước ngoài.
								</Paragraph>
								<Paragraph>
									Mới đây, vào đầu tháng 12, Tập đoàn <a>PC1</a> (HOSE:
									PC1) đã thông qua việc góp 99.98% vốn thành lập công
									ty con tại Philippines để làm nhà máy điện gió. Trước
									đó, vào ngày 9/10, tại thủ đô Manila, Philippines, Tập
									đoàn đã ký hợp đồng tổng thầu <a>EPC</a> nhà máy điện
									gió Camarines Sur, công suất 58.5MW, cùng đối tác là
									Công ty{' '}
									<a>SPV Cornerstone Energy Development, Inc.</a> (CEDI)
									- liên danh giữa Aboitiz Power Corporation (doanh
									nghiệp Philippines về đầu tư năng lượng) và Mainstream
									Renewable Power (doanh nghiệp đầu tư các nhà máy điện
									gió trên thế giới).
								</Paragraph>
								<Paragraph>
									<Text strong>
										* PC1 chi gần 48 tỷ lập công ty con tại
										Philippines
									</Text>
								</Paragraph>

								{/* Sub-article */}
								<Title level={4}>Tôn Đông Á tiến vào Indonesia</Title>
								<Paragraph>
									Theo nghị quyết ngày 19/11, Tôn Đông Á (UPCoM:{' '}
									<a>GDA</a>) có ý định góp 25 tỷ đồng (khoảng 1 triệu
									USD) để mở một công ty tại Indonesia, lấy tên PT Indo
									Vina Steel để kinh doanh thép cuộn, tương đương nắm
									51% vốn điều lệ. Đối tác góp vốn chưa được tiết lộ.
								</Paragraph>
								<Paragraph>
									Việc mở rộng ra khu vực Đông Nam Á đã được cổ đông GDA
									thông qua tại đại hội thường niên 2024 trước đó với lộ
									trình đầu tư kéo dài 4-6 năm.
								</Paragraph>

								{/* Image */}
								<Image
									width="100%"
									src="https://image.vietstock.vn/2024/12/11/giong-buom-1.jpg" // Example image URL
									alt="Tôn Đông Á tại Indonesia"
									preview={false}
								/>

								<Paragraph>
									Tiền góp vốn vào công ty Indonesia không phải là vấn
									đề lớn đối với doanh nghiệp tôn 26 năm tuổi, nếu so
									với hơn 3.5 ngàn tỷ đồng tài sản thanh khoản cao đang
									nắm giữ, bao gồm tiền gửi ngân hàng, đầu tư trái
									phiếu… (tính đến cuối quý).
								</Paragraph>

								{/* Sub-article */}
								<Title level={4}>
									Liên doanh 700 ngàn USD của PVD tại Indonesia
								</Title>
								<Paragraph>
									Ngày 18/11, HĐQT PV Drilling (HOSE: PVD) thông qua
									nghị quyết góp vốn thành lập công ty liên doanh tại
									Indonesia với tên gọi PetroVietnam Drilling Indonesia
									(PT PVD Indo), vốn điều lệ 700,000 USD, có vai trò
									cung cấp dịch vụ khoan và dịch vụ kỹ thuật giếng khoan
									cho các công ty dầu khí tại Indonesia.
								</Paragraph>
								<Paragraph>
									Việc mở rộng ra khu vực Đông Nam Á đã được cổ đông GDA
									thông qua tại đại hội thường niên 2024 trước đó với lộ
									trình đầu tư kéo dài 4-6 năm.
								</Paragraph>

								{/* Image */}
								<Image
									width="100%"
									src="https://image.vietstock.vn/2024/12/11/giong-buom-2.jpg" // Example image URL
									alt="Tôn Đông Á tại Indonesia"
									preview={false}
								/>

								<Paragraph>
									Trong số vốn 700 ngàn USD, PVD và PT Quest Semesta
									Raya mỗi bên góp 40%, còn lại ông Yosep Arianto góp
									20%. Công ty đăng ký kinh doanh tại Indonesia, hoạt
									động 10 năm kể từ khi thành lập và có thể kéo dài thêm
									khi các bên đồng ý. Thực tế, đây không phải lần đầu
									công ty khoan dầu của PVN có mặt tại Indonesia. Doanh
									nghiệp đã hoạt động tại đất nước vạn đảo từ tháng
									12/2022 đến nay, với văn phòng điều hành tại Jakarta
									thành lập vào tháng 7/2023. Khách hàng lớn nhất tại
									nước này là Pertamina Hulu Energi Offshore Northwest
									Java (PHE ONWJ).
								</Paragraph>
							</Card>
						</Col>
					</Row>
				</div>
        
				<div className="w-1/3">
					<Card className="w-full max-w-md border-none">
						<Link to=""></Link>
						<CardHeader className="bg-[#1a2737] text-white">
							<CardTitle>TIN DOANH NGHIỆP</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="divide-y">
								{newsItems.map((item) => (
									<div
										key={item.id}
										className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
									>
										<div className="flex gap-2 items-start">
											<div className="flex-1">
												<div className="flex gap-2 items-center mb-2">
													<h3 className="font-medium text-sm leading-tight">
														{item.title}
													</h3>
													{item.label && (
														<Badge
															variant="destructive"
															className="uppercase text-[10px] h-5"
														>
															{item.label}
														</Badge>
													)}
												</div>
												<div className="text-xs text-muted-foreground">
													+{item.reached} Reached
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default TidingDetail;
