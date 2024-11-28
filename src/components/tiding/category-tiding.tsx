import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, Clock } from 'lucide-react';

export default function CategoryGrid() {
	const financialNews = [
		{
			id: 1,
			title: 'Khối ngoại bất ngờ "tung" gần 700 tỷ đồng gom một cổ phiếu Bluechips trong phiên 27/11',
			description:
				'Giao dịch khối ngoại tích cực khi họ mua ròng phiên thứ tư liên tiếp với giá trị 359 tỷ đồng trên toàn thị trường.',
			image: 'https://cafefcdn.com/zoom/370_232/203337114487263232/2024/11/27/avatar1732695062732-17326950632181004909465.png',
			date: 'Wed December 27, 2023',
			category: 'Markets',
		},
		{
			id: 2,
			title: 'CEO Eastspring Việt Nam tiết lộ cú sốc đầu tiên trên thị trường chứng khoán và công thức đầu tư để có được “giấc ngủ ngon”',
			description: '',
			image: 'https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/26/thumb-1732617234220881923171.png',
			date: 'Wed December 27, 2023',
			category: 'Crypto',
		},
		{
			id: 3,
			title: 'Cầu Tứ Liên do Vingroup và tập đoàn xây dựng lớn nhất Trung Quốc thực hiện sẽ khởi công vào quý 3/2025, cam kết "xứng tầm"',
			description: '',
			image: 'https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732682711781-1732682712564519757235.jpg',
			date: 'Wed December 27, 2023',
			category: 'Technology',
		},
		{
			id: 4,
			title: 'Giá vàng bất ngờ đảo chiều, nhiều người ‘đứng ngồi không yên',
			description: '',
			image: 'https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732689494994-17326894952241900126270.jpeg',
			date: 'Wed December 27, 2023',
			category: 'Global Markets',
		},
	];

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
		<div className="flex flex-row justify-between gap-6 pt-5">
			<div className="w-2/3 pl-12 md:col-span-3">
				{/* Featured Article */}
				<div className="mb-10 md:col-span-2 border-none bg-blue-100 opacity-85 hover:cursor-pointer">
					<div className="p-0">
						<div className="grid md:grid-cols-2 gap-0">
							<img
								src={financialNews[0].image}
								alt={financialNews[0].title}
								width={600}
								height={400}
								className="object-cover w-full h-full"
							/>
							<div className="p-6">
								<div className="space-y-2">
									<div className="flex items-center text-sm text-muted-foreground">
										<Clock className="mr-2 h-4 w-4" />
										{financialNews[0].date}
									</div>
									<h3 className="text-2xl font-bold leading-tight">
										{financialNews[0].title}
									</h3>
									<p className="text-muted-foreground">
										{financialNews[0].description}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* News Grid */}
				<div className="grid md:grid-cols-3 gap-6 m-auto">
					{financialNews.slice(1).map((news) => (
						<div
							key={news.id}
							className="bg-white opacity-80 hover:bg-slate-300/50"
						>
							<div className="p-0">
								<img
									src={news.image}
									alt={news.title}
									width={400}
									height={300}
									className="object-cover w-full h-48"
								/>
								<div className="p-4">
									<div className="space-y-2">
										<div className="flex items-center justify-between text-sm text-muted-foreground">
											<span>{news.category}</span>
											<span className="flex items-center">
												<Clock className="mr-2 h-4 w-4" />
												{news.date}
											</span>
										</div>
										<h3 className="font-bold leading-tight">
											{news.title}
										</h3>
										<p className="text-sm text-muted-foreground line-clamp-2">
											{news.description}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="">
				<Card className="w-full max-w-md border-none">
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
	);
}
