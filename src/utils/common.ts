import {
	BalanceSheetModel,
	FieldBalanceDefinitions,
} from './../redux/model/balance_sheet';
import { CashFlowModel, FieldCashFlowDefinitions } from './../redux/model/cash_flow';

import {
	FieldIncomeDefinitions,
	IncomeStatementModel,
} from './../redux/model/income_statement';
import { FinancialAnalysisModel, FinancialState } from '@/redux/model/financial_report';

import * as XLSX from 'xlsx';

// ====================================== Trích xuất data excel =========================================
export function ReadExcelData(file: File): Promise<{
	balanceSheet: { [year: string]: BalanceSheetModel };
	cashFlow: { [year: string]: CashFlowModel };
	incomeStatement: { [year: string]: IncomeStatementModel };
}> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			const data = e.target?.result;
			if (data) {
				const workbook = XLSX.read(data, { type: 'array' });

				// console.log(workbook.Sheets["Balance Sheet"]);

				try {
					// Xử lý từng sheet với định nghĩa và model tương ứng
					const balanceSheetData = processSheet<BalanceSheetModel>(
						workbook.Sheets['Balance Sheet'],
						FieldBalanceDefinitions,
					);

					const cashFlowData = processSheet<CashFlowModel>(
						workbook.Sheets['Cash Flow'],
						FieldCashFlowDefinitions,
					);

					const incomeStatementData = processSheet<IncomeStatementModel>(
						workbook.Sheets['Income Statement'],
						FieldIncomeDefinitions,
					);

					resolve({
						balanceSheet: balanceSheetData,
						cashFlow: cashFlowData,
						incomeStatement: incomeStatementData,
					});
				} catch (error) {
					reject(new Error('Lỗi khi xử lý dữ liệu từ file: ' + String(error)));
				}
			} else {
				reject(new Error('Không đọc được dữ liệu từ file'));
			}
		};

		reader.onerror = () => {
			reject(new Error('Lỗi khi đọc file'));
		};

		reader.readAsArrayBuffer(file);
	});
}

function processSheet<T>(
	sheet: XLSX.WorkSheet,
	definitions: Record<string, string>,
): { [year: string]: T } {
	const sheetData = XLSX.utils.sheet_to_json(sheet, {
		header: 1,
	}) as any[][];

	// console.log("preocess:", sheetData);

	let yearsRow: any[] | undefined;

	// Tìm dòng chứa tiêu đề
	for (const row of sheetData) {
		if (
			row &&
			row.length > 1 &&
			typeof row[0] === 'string' &&
			row[0].includes('CHỈ TIÊU')
		) {
			yearsRow = row;
			break;
		}
	}

	if (!yearsRow) {
		throw new Error('Không tìm thấy dòng tiêu đề chứa danh sách năm.');
	}

	let years = sheetData[7].slice(1); // Lấy danh sách năm từ dòng tiêu đề
	years = sortYearsOrQuarters(years); // Sắp xếp danh sách năm hoặc quý tăng dần

	const dataByYear: { [year: string]: T } = {};

	// Khởi tạo đối tượng cho mỗi năm
	years.forEach((year: string) => {
		dataByYear[year] = {} as T;
	});

	for (let i = 0; i < sheetData.length; i++) {
		const row = sheetData[i];
		const vietnameseDescription = row[0];

		const fieldName = GetFieldNameByVietnameseDescription<T>(
			vietnameseDescription,
			definitions,
		);

		if (fieldName) {
			for (let j = 1; j < row.length; j++) {
				const dataValue = row[j];
				const parsedValue = parseFloat(dataValue) || 0;
				const year = years[j - 1];

				dataByYear[year][fieldName as keyof T] = parsedValue as T[keyof T];
			}
		}
	}

	return dataByYear;
}

function GetFieldNameByVietnameseDescription<T>(
	description: string,
	definitions: Record<string, string>,
): keyof T | undefined {
	for (const key in definitions) {
		if (definitions[key] === description) {
			return key as keyof T;
		}
	}
	return undefined;
}

function sortYearsOrQuarters(years: string[]): string[] {
	return years.sort((a, b) => {
		const [partA, yearA] = a.split(' ');
		const [partB, yearB] = b.split(' ');

		// So sánh năm trước
		if (parseInt(yearA) !== parseInt(yearB)) {
			return parseInt(yearA) - parseInt(yearB);
		}

		// Nếu là quý, so sánh quý
		if (partA.startsWith('Q') && partB.startsWith('Q')) {
			return parseInt(partA.substring(1)) - parseInt(partB.substring(1));
		}

		return 0; // Nếu không phải dạng "Qx YYYY", giữ nguyên
	});
}

// ====================================== Tính tính toán nhóm chỉ số Tài chính =========================================
export function CalculateFinancialAnalysis(
	state: FinancialState,
	stock_price_map: { [year: string]: number }, // Bản đồ giá cổ phiếu theo kỳ hiển thị (quý, năm)
	outstanding_shares_map: { [year: string]: number }, // Bản đồ số cổ phiếu lưu hành theo kỳ hiển thị (quý, năm)
	dividends_per_share_map?: { [year: string]: number }, // Bản đồ cổ tức mỗi cổ phiếu theo năm (nếu có)
): { [year: string]: FinancialAnalysisModel } {
	const result: { [year: string]: FinancialAnalysisModel } = {};

	for (const year in state.incomeStatement) {
		const balance_sheet = state.balanceSheet[year];
		const income_statement = state.incomeStatement[year];
		const stock_price = stock_price_map[year];
		const outstanding_shares = outstanding_shares_map[year];
		const dividends_per_share = dividends_per_share_map?.[year];

		if (!balance_sheet || !income_statement || !stock_price || !outstanding_shares) {
			console.log('Thiếu dữ liệu tài chính'); // In thông báo nếu thiếu dữ liệu tài chính
			continue; // Bỏ qua nếu thiếu dữ liệu
		}

		// Cơ sở dữ liệu
		const net_income = income_statement.profit_after_tax ?? 0; // Lợi nhuận sau thuế
		const total_assets = balance_sheet.total_assets ?? 0; // Tổng tài sản
		const total_liabilities = balance_sheet.total_liabilities ?? 0; // Tổng nợ
		const equity = total_assets - total_liabilities; // Vốn chủ sở hữu

		// Nhóm chỉ số Định giá
		const eps = net_income / outstanding_shares; // EPS
		const bvps = equity / outstanding_shares; // BVPS
		const pe = stock_price / eps; // P/E
		const pb = stock_price / bvps; // P/B
		const dividend_yield = dividends_per_share
			? (dividends_per_share / stock_price) * 100
			: undefined; // Tỷ suất cổ tức

		// Nhóm chỉ số Tỷ suất
		const roe = (net_income / equity) * 100; // ROE
		const roa = (net_income / total_assets) * 100; // ROA

		const interest_and_similar_income =
			income_statement.interest_and_similar_income ?? 0;
		const interest_and_similar_expenses =
			income_statement.interest_and_similar_expenses ?? 0;
		const yoea = interest_and_similar_income / total_assets; // YOEA
		const cof = (interest_and_similar_expenses / total_assets) * 100; // COF
		const nim =
			((interest_and_similar_income - interest_and_similar_expenses) /
				total_assets) *
			100; // NIM

		// Nhóm chỉ số Tăng trưởng
		const previousYearIncomeStatement = state.incomeStatement[`${+year - 1}`];
		const previousYearBalanceSheet = state.balanceSheet[`${+year - 1}`];

		const profit_before_tax = income_statement.profit_before_tax ?? 0;
		const pre_tax_profit_growth =
			previousYearIncomeStatement && previousYearIncomeStatement.profit_before_tax
				? ((profit_before_tax - previousYearIncomeStatement.profit_before_tax) /
						previousYearIncomeStatement.profit_before_tax) *
				  100
				: undefined; // Tăng trưởng lợi nhuận trước thuế

		const profit_after_tax = income_statement.profit_after_tax ?? 0;
		const post_tax_profit_growth =
			previousYearIncomeStatement && previousYearIncomeStatement.profit_after_tax
				? ((profit_after_tax - previousYearIncomeStatement.profit_after_tax) /
						previousYearIncomeStatement.profit_after_tax) *
				  100
				: undefined; // Tăng trưởng lợi nhuận sau thuế

		const total_assets_growth =
			previousYearBalanceSheet && previousYearBalanceSheet.total_assets
				? ((total_assets - previousYearBalanceSheet.total_assets) /
						previousYearBalanceSheet.total_assets) *
				  100
				: undefined;

		const equity_growth =
			previousYearBalanceSheet && previousYearBalanceSheet.equity
				? ((equity - previousYearBalanceSheet.equity) /
						previousYearBalanceSheet.equity) *
				  100
				: undefined;

		// Nhóm chỉ số Thanh khoản và An toàn
		const customer_loans = balance_sheet.customer_loans ?? 0;
		const provision_customer_loans = balance_sheet.provision_customer_loans ?? 0;
		const customer_deposits = balance_sheet.customer_deposits ?? 0;
		const trading_securities = balance_sheet.trading_securities ?? 0; // Cổ phiếu kinh doanh

		const ldr = customer_loans / customer_deposits; // LDR
		const loan_to_total_assets = customer_loans / total_assets; // Loan/Total Assets
		const equity_to_deposit_ratio = equity / customer_deposits; // Equity/Deposits
		const equity_to_total_assets = equity / total_assets; // Equity/Total Assets

		// Nhóm chỉ số Rủi ro
		const risk_reserve_to_loans = provision_customer_loans / customer_loans; // Risk reserve to loans
		const earning_assets_to_total_assets = trading_securities / total_assets; // Earning assets/Total assets

		// Kết quả cho từng năm
		result[year] = {
			net_income,
			total_assets,
			total_liabilities,
			outstanding_shares,
			stock_price,
			dividends_per_share,
			eps,
			bvps,
			pe,
			pb,
			dividend_yield,
			roe,
			roa,
			yoea,
			cof,
			nim,
			pre_tax_profit_growth,
			post_tax_profit_growth,
			total_assets_growth,
			equity_growth,
			ldr,
			loan_to_total_assets,
			equity_to_deposit_ratio,
			equity_to_total_assets,
			risk_reserve_to_loans,
			earning_assets_to_total_assets,
		};
	}

	return result;
}
