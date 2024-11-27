import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, Clock } from 'lucide-react';

export default function CategoryGrid() {
	const financialNews = [
		{
			id: 1,
			title: 'Global Markets Rally as Fed Signals Rate Cuts in 2024',
			description:
				'Federal Reserve officials project three rate cuts next year as inflation continues to cool, sending global markets to new highs...',
			image: '/placeholder.svg?height=400&width=600',
			date: 'Wed December 27, 2023',
			category: 'Markets',
		},
		{
			id: 2,
			title: 'Cryptocurrency Market Sees Major Institutional Investment',
			description:
				'Leading financial institutions announce significant investments in digital assets, marking a shift in traditional banking...',
			image: '/placeholder.svg?height=300&width=400',
			date: 'Wed December 27, 2023',
			category: 'Crypto',
		},
		{
			id: 3,
			title: 'Tech Sector Leads Stock Market Gains',
			description:
				'Technology companies continue to drive market momentum as AI investments surge across industries...',
			image: '/placeholder.svg?height=300&width=400',
			date: 'Wed December 27, 2023',
			category: 'Technology',
		},
		{
			id: 4,
			title: "Asian Markets React to China's Economic Data",
			description:
				'Latest economic indicators from China show promising signs of recovery, impacting regional market sentiment...',
			image: '/placeholder.svg?height=300&width=400',
			date: 'Wed December 27, 2023',
			category: 'Global Markets',
		},
	];

	return (
		<div className="container mx-auto p-4">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				{/* Main Content */}
				<div className="md:col-span-3">
					<div className="grid gap-6">
						{/* Featured Article */}
						<Card className="md:col-span-2">
							<CardContent className="p-0">
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
							</CardContent>
						</Card>

						{/* News Grid */}
						<div className="grid md:grid-cols-3 gap-6">
							{financialNews.slice(1).map((news) => (
								<Card key={news.id}>
									<CardContent className="p-0">
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
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
