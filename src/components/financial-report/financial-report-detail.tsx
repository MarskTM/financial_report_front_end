import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TableFinancialReport } from '@/components/';

type Props = {};

const FinancialReportDetail: React.FC<Props> = () => {
	return (
		<div className="w-full space-y-4">
			<Tabs defaultValue="balance-sheet" className="w-full">
				<TabsList className="bg-white">
					<TabsTrigger value="balance-sheet">Bảng cân đối kế toán</TabsTrigger>
					<TabsTrigger value="income-statement">
						Báo cáo kết quả kinh doanh
					</TabsTrigger>
					<TabsTrigger value="cash-flow">
						Báo cáo lưu chuyển tiền tệ
					</TabsTrigger>
				</TabsList>

				{/* Bảng cân đối kế toán */}
				<TabsContent value="balance-sheet" className="space-y-4">
					<TableFinancialReport />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default FinancialReportDetail;
