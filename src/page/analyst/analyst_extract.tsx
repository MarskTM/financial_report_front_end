import { Header, SidebarMenu, FinancialChartOverview } from '@/components';

import React, { useEffect, useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
	ReadExcelData,
	CalculateFinancialAnalysis,
	SortByQuarterAndYearASC,
} from '@/utils/common';

import { BalanceSheetModel } from '@/redux/model/balance_sheet';
import { CashFlowModel } from '@/redux/model/cash_flow';
import { IncomeStatementModel } from '@/redux/model/income_statement';
import { FinancialAnalysisModel } from '@/redux/model/financial_report';

import {
	BalanceSheetTable,
	IncomeStatementTable,
	CashFlowTable,
	FinancialAnalysisTable,
} from '@/components';

import { Tabs } from 'antd';
// import { CSS } from "@dnd-kit/utilities";
import type { TabsProps } from 'antd';

interface Props {}

// Stock price map theo từng quý
const StockPriceMap: { [quarter: string]: number } = {
	'Q1 2023': 39884.95970441841,
	'Q2 2023': 39209.58776566245,
	'Q3 2023': 40603.824651699346,
	'Q4 2023': 39212.253015420116,
	'Q1 2024': 49636.4406779661,
	'Q2 2024': 48162.903225806454,
	'Q3 2024': 48467.2131147541,
	'Q4 2024': 47841.0,
};

const OutstandingSharesMap: { [year: string]: number } = {
	'Q1 2023': 1261588,
	'Q2 2023': 953709,
	'Q3 2023': 1688125,
	'Q4 2023': 948285,
	'Q1 2024': 1908024,
	'Q2 2024': 1744915,
	'Q3 2024': 2415880,
	'Q4 2024': 1981210,
};

const AnalystExtract: React.FC<Props> = ({}) => {
	const [fileName, setFileName] = useState<string>('');
	const [financialReportData, setFinancialReportData] = useState<{
		balanceSheet: {
			[year: string]: BalanceSheetModel;
		};
		cashFlow: {
			[year: string]: CashFlowModel;
		};
		incomeStatement: {
			[year: string]: IncomeStatementModel;
		};
	} | null>(null);
	const [financialAnalysis, setFinancialAnalysis] = useState<{
		[year: string]: FinancialAnalysisModel;
	} | null>(null);

	const uploadProps = {
		beforeUpload: async (file: File) => {
			// Cập nhật tên file và ngăn chặn upload tự động
			setFileName(file.name);
			try {
				let financialReport = await ReadExcelData(file);
				financialReport = {
					balanceSheet: SortByQuarterAndYearASC(financialReport?.balanceSheet),
					cashFlow: SortByQuarterAndYearASC(financialReport?.cashFlow),
					incomeStatement: SortByQuarterAndYearASC(financialReport?.incomeStatement),
				};
        setFinancialReportData(financialReport);

				let financialAnalysisData = CalculateFinancialAnalysis(
					{ ...financialReport },
					StockPriceMap,
					OutstandingSharesMap,
				);
				financialAnalysisData = SortByQuarterAndYearASC(financialAnalysisData);
				setFinancialAnalysis(financialAnalysisData);

				console.log('Dữ liệu Balance Sheet:', financialReport);
			} catch (error) {
				console.error('Lỗi khi đọc dữ liệu:', error);
			}

			return false; // Ngăn upload tự động
		},

		showUploadList: false, // Ẩn danh sách file upload
	};

	const [tabItems, setTabItems] = useState<NonNullable<TabsProps['items']>>([]);

	useEffect(() => {
		setTabItems([
			{
				key: 'report_chart',
				label: 'Biểu đồ',
				children: (
					<div>
						<FinancialChartOverview />
					</div>
				),
			},
			{
				key: 'balance_sheet',
				label: 'Bảng cân đối kế toán',
				children: (
					<div>
						<BalanceSheetTable
							data={financialReportData?.balanceSheet ?? null}
							maxCol={5}
						/>
					</div>
				),
			},
			{
				key: 'income_statement',
				label: 'Báo cáo kết quả kinh doanh',
				children: (
					<IncomeStatementTable
						data={financialReportData?.incomeStatement ?? null}
						maxCol={5}
					/>
				),
			},
			{
				key: 'cash_flow',
				label: 'Báo cáo lưu chuyển tiền tệ',
				children: (
					<CashFlowTable
						data={financialReportData?.cashFlow ?? null}
						maxCol={5}
					/>
				),
			},
			{
				key: 'indicators',
				label: 'Chỉ số tài chính',
				children: (
					<div>
						<FinancialAnalysisTable data={financialAnalysis} maxCol={5} />
					</div>
				),
			},
			{
				key: 'Forecast',
				label: 'Dự Đoán',
				children: <div></div>,
			},
		]);
	}, [financialReportData]);

	return (
		<div className="w-screen h-svh bg-slate-100 relative overflow-y-scroll">
			<div className="w-[83%] fixed top-3 left-72 pl-2 z-50">
				<Header />
			</div>

			{/* Navbar Position */}
			<div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
				<SidebarMenu defaultLink="/home/Analyst" />
			</div>

			{/* Page Content */}
			<div className="w-[83%] h-full pt-32 mb-10 ml-72 pl-2 z-40">
				<div className="max-w-80">
					<Upload {...uploadProps}>
						<Button icon={<UploadOutlined />} className="w-48">
							<span className="direction-rtl block truncate">
								{fileName || 'Phân Tích Báo Cáo'}
							</span>
						</Button>
					</Upload>
				</div>

				<div className="mt-10">
					{<Tabs items={tabItems} defaultActiveKey="balance_sheet" />}
				</div>
			</div>
		</div>
	);
};

export default AnalystExtract;
