import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const bigStories = [
	{
		id: 1,
		title: 'Mùa thứ ba của giải đấu tiên phong đưa 2 môn phối hợp bơi – chạy (aquathlon) đến với cộng đồng thể thao - DNSE Aquaman Vietnam sắp diễn ra ngày 1/12/2024 tại Vũng Tàu.',
		image: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2024/11/28/photo1732711013071-17327110132551182588882-17327593377811990088143.jpg',
		category: 'Markets',
	},
	{
		id: 2,
		title: 'Lũy kế 9 tháng đầu năm, doanh nghiệp đã hoàn thành 84% kế hoạch doanh thu và vượt chỉ tiêu lợi nhuận cả năm.',
		image: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2024/11/27/avatar1732720626164-1732720626587475804311.jpeg',
		category: 'Economy',
	},
	{
		id: 3,
		title: 'Doanh nghiệp này vừa thông qua việc ký kết hợp đồng mua bán xe ô tô và dịch vụ cho thuê pin với Công ty TNHH kinh doanh thương mại và dịch vụ Vinfast.',
		image: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2024/11/27/avatar1732720610511-1732720611968242210362.jpg',
		category: 'Business',
	},
];

const topStories = [
	{
		id: 1,
		title: 'VinFast tiết lộ mẫu xe mới nhỏ và rẻ hơn cả VF3, cổ phiếu đột ngột tăng tốc, vốn hoá 10 tỷ USD áp sát Top 5 công ty xe điện giá trị nhất thế giới',
		image: 'https://cafefcdn.com/zoom/320_200/203337114487263232/2024/11/28/z56193747628506e9ac7641e264205c2a267ef029a4779-1348x800-17327628041091919786869-0-0-800-1280-crop-17327628102221444959707.jpg',
		category: 'Cryptocurrency',
	},
	{
		id: 2,
		title: `Sau khi chi hàng tỷ đô đầu tư vào nhiều lĩnh vực ở Việt Nam, 'ông lớn' Nhật Bản tiếp tục mua 49% vốn một công ty sản xuất thuốc bảo vệ thực vật`,
		image: 'https://cafefcdn.com/zoom/270_169/203337114487263232/2024/11/27/avatar1732746002640-17327460030041615712569.jpg',
		category: 'Commodities',
	},
	{
		id: 3,
		title: 'Tiền quay trở lại Việt Nam: Hơn 220 thương vụ M&A từ đầu năm với giá trị lên đến 3,2 tỷ USD',
		image: 'https://cafefcdn.com/zoom/270_169/203337114487263232/2024/11/28/avatar1732752408108-17327524084591403691770.jpg',
		category: 'Banking',
	},
	{
		id: 4,
		title: 'Bộ Công Thương vừa ban hành quyết định về việc thu hồi Giấy phép kinh doanh xuất nhập khẩu xăng dầu của Công ty TNHH Trung Linh Phát.',
		image: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2024/11/28/avatar1732757520168-17327575205932093103053.jpg',
		category: 'Venture Capital',
	},
];

const latestNews = [
	{
		id: 1,
		title: 'Tăng trưởng ì ạch, nền kinh tế lớn thứ 4 châu Á bất ngờ cắt giảm lãi suất lần thứ 2 liên tiếp',
		image: 'https://cafefcdn.com/zoom/320_200/203337114487263232/2024/11/28/avatar1732762691009-17327626924491889533007.jpg',
		excerpt:
			'Lần đầu tiên kể từ năm 2009, Ngân hàng Trung ương Hàn Quốc hạ lãi suất 2 lần liên tiếp.',
	},
	{
		id: 2,
		title: 'Thỏa thuận ngừng bắn ở Li-băng có hiệu lực: Người dân ùn ùn trở về nhà, vui mừng đến rơi nước mắt',
		image: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2024/11/28/avatar1732762440724-1732762444996690781537.jpg',
		excerpt:
			'Sau khi lệnh ngừng bắn giữa Israel và phong trào Hezbollah ở Li-băng chính thức có hiệu lực, người dân hai bên biên giới đã bắt đầu trở về nhà, nhưng vẫn không khỏi lo lắng về...',
	},
	{
		id: 3,
		title: 'Ông Trump dọa tăng thuế 10%, "chiến tranh tiền tệ" Mỹ-Trung có thể tái diễn: Quan điểm của ông Tập là gì?',
		image: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2024/11/28/avatar1732761415920-1732761419114800017492.jpg',
		excerpt:
			'Bắc Kinh có một công cụ mạnh mẽ để đáp trả chính sách thuế quan mới mà Tổng thống đắc cử Mỹ Donald Trump đe dọa áp dụng: đó là bắt đầu một cuộc chiến tiền tệ.',
	},
	{
		id: 4,
		title: 'Ông Trump chọn cố vấn lâu năm Keith Kellogg làm đặc phái viên Ukraine và Nga',
		image: 'https://cafefcdn.com/zoom/250_157/203337114487263232/2024/11/28/avatar1732758737759-17327587402921693935892-0-73-269-504-crop-17327587595781508760429.jpg',
		excerpt:
			'Tổng thống đắc cử Donald Trump cho biết chọn Keith Kellogg, một vị tướng ba sao đã nghỉ hưu, làm đặc phái viên của ông tại Ukraine và Nga.',
	},
];

export default function SubCategoryTiding() {
	return (
		<div className="container mx-auto px-4 py-8 space-y-20">
			{/* Big Stories Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">
					Big Stories
				</h2>
				<div className="m-auto flex flex-row justify-evenly opacity-80">
					{bigStories.map((story) => (
						<Link to="#" key={story.id}>
							<Card className="overflow-hidden hover:shadow-lg transition-shadow">
								<div className="relative h-48 md:h-64">
									<img
										src={story.image}
										alt={story.title}
										className="w-full h-full object-fill"
									/>
									<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
										<span className="text-xs text-white bg-primary px-2 py-1 rounded">
											{story.category}
										</span>
										<h3 className="text-white text-lg font-bold mt-2">
											{story.title}
										</h3>
									</div>
								</div>
							</Card>
						</Link>
					))}
				</div>
			</section>

			{/* Top Stories Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">
					Top Stories
				</h2>
				<div className="flex flex-row justify-between opacity-80 space-x-9">
					{topStories.map((story) => (
						<Card className="hover:shadow-md transition-shadow h-72 w-1/4">
							<CardContent className="p-0">
								<Link to="#" key={story.id}>
									<div className="relative h-44">
										<img
											src={story.image}
											alt={story.title}
											className="w-full h-full object-fill rounded-t-md"
										/>
									</div>
									<div className="p-4">
										<span className="text-xs text-primary-foreground bg-primary px-2 py-1 rounded">
											{story.category}
										</span>
										<h3 className="text-sm font-semibold mt-2 line-clamp-2">
											{story.title}
										</h3>
									</div>
								</Link>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Latest News Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">
					Latest News
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-80">
					{latestNews.map((news) => (
						<Link to="#" key={news.id}>
							<Card className="hover:shadow-md transition-shadow h-full">
								<CardContent className="p-0">
									<div className="relative h-44">
										<img
											src={news.image}
											alt={news.title}
											className="w-full h-full object-fill"
										/>
									</div>
									<div className="p-4">
										<h3 className="font-semibold mb-2 line-clamp-2">
											{news.title}
										</h3>
										<p className="text-sm text-muted-foreground line-clamp-3">
											{news.excerpt}
										</p>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
}
