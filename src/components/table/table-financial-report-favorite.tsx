import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Download, Eye, FileText, Trash } from 'lucide-react';
import TableFinancialReport from './table-financial-report';

const reports = [
	{
		company: 'Công ty CP Vinamilk',
		reportName: 'Báo cáo tài chính Quý 4/2023',
		type: 'BCTC Quý',
		status: 'Chưa xác minh',
		publishDate: '15/01/2024',
		pdfUrl: '/sample.pdf',
	},
	{
		company: 'Tập đoàn FPT',
		reportName: 'Báo cáo thường niên 2023',
		type: 'BCTN',
		status: 'Đang xử lý',
		publishDate: '10/01/2024',
		pdfUrl: '/sample.pdf',
	},
	{
		company: 'Ngân hàng Vietcombank',
		reportName: 'Báo cáo tài chính hợp nhất 2023',
		type: 'BCTC Năm',
		status: 'Đã xác minh',
		publishDate: '20/01/2024',
		pdfUrl: '/sample.pdf',
	},
	{
		company: 'Tập đoàn Hòa Phát',
		reportName: 'Báo cáo quản trị công ty 2023',
		type: 'BCQT',
		status: 'Chờ xác minh',
		publishDate: '05/01/2024',
		pdfUrl: '/sample.pdf',
	},
	{
		company: 'Tập đoàn Hòa Phát',
		reportName: 'Báo cáo chính hợp nhất Quý 3/2023',
		type: 'BCQT',
		status: 'Đã xác minh',
		publishDate: '05/01/2024',
		pdfUrl: '/sample.pdf',
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case 'Đã xác minh':
			return 'bg-green-500/15 text-green-600';
		case 'Đang xử lý':
			return 'bg-blue-500/15 text-blue-600';
		case 'Chờ xác minh':
			return 'bg-yellow-500/15 text-yellow-600';
		case 'Chưa xác minh':
			return 'bg-red-500/15 text-red-600';
		default:
			return 'bg-gray-500/15 text-gray-600';
	}
};

interface Props {
	pageName?: string;
	action?: string[];
}

const TableFinancialReportFavorite: React.FC<Props> = ({ pageName }) => {
	return (
		<div className="border-none">
			<CardHeader>
				<CardTitle className="text-xl font-bold">Báo cáo phân tích</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Công Ty</TableHead>
							<TableHead>Báo Cáo</TableHead>
							<TableHead>Loại</TableHead>
							<TableHead>Trạng Thái</TableHead>
							<TableHead>Công Bố</TableHead>
							{pageName && pageName === 'home' && (
								<TableHead>Thao Tác</TableHead>
							)}
						</TableRow>
					</TableHeader>
					<TableBody>
						{reports.map((report, index) => (
							<TableRow key={index}>
								<TableCell className="font-medium">
									{report.company}
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<FileText className="h-4 w-4 text-blue-500" />
										<span className="font-medium text-primary">
											{report.reportName}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<Badge variant="secondary">{report.type}</Badge>
								</TableCell>
								<TableCell>
									<Badge
										className={`hover:bg-slate-200 hover:opacity-80 ${getStatusColor(
											report.status,
										)}`}
									>
										{report.status}
									</Badge>
								</TableCell>
								<TableCell>{report.publishDate}</TableCell>
								<TableCell>
									<div className="flex gap-2">
										<Button variant="outline" size="sm">
											<Eye className="h-4 w-4 mr-1" />
											Xem
										</Button>
										<Button variant="outline" size="sm">
											<Download className="h-4 w-4 mr-1" />
											Tải về
										</Button>
										<Button variant="outline" size="sm">
											<Trash className="h-4 w-4 mr-1" />
											Xóa
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</div>
	);
};

export default TableFinancialReportFavorite;
