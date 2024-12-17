import { BalanceSheetModel } from './balance_sheet';
import { IncomeStatementModel } from './income_statement';
import { CashFlowModel } from './cash_flow';

// -------------------------------- Financial Report Model --------------------------------
export interface FinancialReportModel {
	// ================================================================= Meta data =================================================================
	id?: number;
	company_id?: number;
	media_id?: number;

	quarter?: string; // Quý báo cáo.

	// ================================================================= Income statements =================================================================
	operating_interest_income?: number;
	operating_interest_expenses?: number;
	net_operating_interest_income?: number;
	fee_and_commission_income?: number;
	fee_and_commission_expenses?: number;
	net_fee_and_commission_income?: number;
	net_gain_loss_from_forex_and_gold_trading?: number;
	net_gain_loss_from_trading_securities?: number;
	net_gain_loss_from_investment_securities?: number;
	other_operating_income?: number;
	other_operating_expenses?: number;
	net_other_operating_income_expenses?: number;
	income_from_investment_in_associates?: number;
	total_operating_income?: number;
	operating_expenses?: number;
	profit_before_provision_for_credit_losses?: number;
	provision_expenses_for_credit_losses?: number;
	profit_before_tax?: number;
	current_corporate_income_tax_expense?: number;
	deferred_corporate_income_tax_expense?: number;
	corporate_income_tax_expense?: number;
	profit_after_tax?: number;
	minority_interest?: number;
	parent_company_shareholders?: number;
	basic_earnings_per_share?: number;
	ebit?: number;
	ebitda?: number;

	// ================================================================= Balance sheets =================================================================
	total_company_assets?: number;
	cash_gold_silver?: number;
	state_bank_deposits?: number;
	credit_institution_deposits?: number;
	trading_securities?: number;
	provision_trading_securities?: number;
	derivatives_and_other_financial_assets?: number;
	customer_loans?: number;
	provision_customer_loans?: number;
	investment_securities?: number;
	securities_available_for_sale?: number;
	securities_held_to_maturity?: number;
	provision_investment_securities?: number;
	long_term_investments?: number;
	investments_in_subsidiaries?: number;
	investments_in_joint_ventures?: number;
	other_long_term_investments?: number;
	provision_long_term_investments?: number;
	fixed_assets?: number;
	tangible_fixed_assets?: number;
	leased_fixed_assets?: number;
	intangible_fixed_assets?: number;
	investment_properties?: number;
	other_assets?: number;
	company_liabilities_and_equity?: number;
	company_liabilities?: number;
	government_debts_and_state_bank?: number;
	deposits_and_loans_from_credit_institutions?: number;
	customer_deposits?: number;
	derivatives_and_other_financial_liabilities?: number;
	sponsored_capital_and_trust_investments?: number;
	issued_debt_instruments?: number;
	other_liabilities?: number;
	equity?: number;
	credit_institution_capital?: number;
	charter_capital?: number;
	capital_for_construction?: number;
	share_premium?: number;
	treasury_shares?: number;
	preferred_shares?: number;
	other_equity?: number;
	funds_of_credit_institution?: number;
	foreign_exchange_difference?: number;
	revaluation_difference_of_assets?: number;
	undistributed_profits?: number;

	// ================================================================= Cash flow statements =================================================================
	net_cash_flow_from_operating_activities?: number;
	net_cash_flow_from_operating_activities_before_tax?: number;
	profit_loss_before_changes_in_working_capital?: number;
	interest_and_similar_income?: number;
	interest_and_similar_expenses?: number;
	fee_and_commission_income_received?: number;
	income_from_trading_securities?: number;
	other_income?: number;
	recovered_bad_debts?: number;
	payments_to_employees_and_suppliers?: number;
	corporate_income_tax_paid?: number;
	deposits_at_state_bank?: number;
	change_deposits_loans_others?: number;
	change_trading_securities?: number;
	change_derivatives_assets?: number;
	change_customer_loans?: number;
	change_interest_fee_receivables?: number;
	change_provision_funds?: number;
	change_other_assets?: number;
	change_gov_borrowings?: number;
	change_deposits_loans_institutions?: number;
	change_customer_deposits?: number;
	change_derivatives_liabilities?: number;
	change_trust_investments?: number;
	change_issued_debt?: number;
	change_interest_fee_payables?: number;
	change_other_liabilities?: number;
	corporate_income_tax_paid_again?: number;
	payments_from_credit_institution_funds?: number;
	receipts_from_bad_debt_recoveries?: number;
	net_cash_investing?: number;
	payments_for_fixed_assets?: number;
	proceeds_from_fixed_assets?: number;
	payments_for_asset_disposals?: number;
	payments_for_investment_properties?: number;
	proceeds_from_investment_properties_disposal?: number;
	payments_for_investment_properties_disposal?: number;
	investments_in_entities?: number;
	proceeds_from_investment_disposals?: number;
	dividends_interest_received?: number;
	net_cash_financing?: number;
	proceeds_from_shares_capital?: number;
	proceeds_from_long_term_debt?: number;
	payments_for_long_term_debt?: number;
	dividends_paid?: number;
	payments_for_purchase_of_treasury_shares?: number;
	proceeds_from_sale_of_treasury_shares?: number;
	net_change_cash_equivalents?: number;
	cash_equivalents_at_start?: number;
	exchange_rate_effect?: number;
	cash_equivalents_at_end?: number;

	// ================================================================= financial analyst =================================================================
	net_income?: number; // Lợi nhuận sau thuế
	total_assets?: number; // Tổng tài sản
	total_liabilities?: number; // Tổng nợ
	outstanding_shares?: number; // Số lượng cổ phiếu lưu hành
	stock_price?: number; // Giá cổ phiếu
	dividends_per_share?: number; // Cổ tức trên mỗi cổ phiếu
	eps?: number; // Thu nhập trên mỗi cổ phiếu (EPS)
	bvps?: number; // Giá trị sổ sách trên mỗi cổ phiếu (BVPS)
	pe?: number; // Tỷ lệ giá trên thu nhập (P/E)
	pb?: number; // Tỷ lệ giá trên giá trị sổ sách (P/B)
	dividend_yield?: number; // Tỷ suất cổ tức

	// Nhóm chỉ số Tỷ suất
	roe?: number; // Tỷ suất lợi nhuận trên vốn chủ sở hữu (ROEA)
	roa?: number; // Tỷ suất sinh lời trên tổng tài sản (ROAA)
	yoea?: number; // Tỷ suất sinh lợi của Tài sản Có sinh lãi (YOEA)
	cof?: number; // Tỷ lệ chi phí hình thành Tài sản Có sinh lãi (COF)
	nim?: number; // Tỷ lệ thu nhập lãi thuần (NIM)

	// Nhóm chỉ số Tăng trưởng
	pre_tax_profit_growth?: number; // Tăng trưởng lợi nhuận trước thuế
	post_tax_profit_growth?: number; // Tăng trưởng lợi nhuận sau thuế
	total_assets_growth?: number; // Tăng trưởng tổng tài sản
	equity_growth?: number; // Tăng trưởng vốn chủ sở hữu
	loan_growth?: number; // Tăng trưởng dư nợ cho vay

	// Nhóm chỉ số Thanh khoản và An toàn
	ldr?: number; // Dư nợ cho vay khách hàng/Tổng vốn huy động (LDR)
	loan_to_total_assets?: number; // Dư nợ cho vay/Tổng tài sản Có
	equity_to_deposit_ratio?: number; // Vốn chủ sở hữu/Tổng vốn huy động
	equity_to_total_assets?: number; // Vốn chủ sở hữu/Tổng tài sản Có

	// Nhóm chỉ số Rủi ro
	risk_reserve_to_loans?: number; // Dự phòng rủi ro tín dụng/Tổng dư nợ
	earning_assets_to_total_assets?: number; // Tài sản Có sinh lãi/Tổng tài sản Có
	// balance_sheet?: BalanceSheetModel;
	// income_statement?: IncomeStatementModel;
	// cash_flow?: CashFlowModel;
	// financial_analyst?: FinancialAnalysisModel;
}

// =========================================================== Model thông tin báo cáo tài chính trích xuất từ file excel ==================================================================
export const FieldFinancialAnalysisModel: Record<string, string> = {
	// Nhóm chỉ số Định giá
	valuation_index_group: 'Nhóm chỉ số Định giá',
	net_income: 'Lợi nhuận sau thuế', // Net Income
	total_assets: 'Tổng tài sản', // Total Assets
	total_liabilities: 'Tổng nợ', // Total Liabilities
	outstanding_shares: 'Số lượng cổ phiếu lưu hành', // Outstanding Shares
	stock_price: 'Giá cổ phiếu', // Stock Price
	dividends_per_share: 'Cổ tức trên mỗi cổ phiếu', // Dividends Per Share
	eps: 'Thu nhập trên mỗi cổ phiếu (EPS)', // Earnings Per Share (EPS)
	bvps: 'Giá trị sổ sách trên mỗi cổ phiếu (BVPS)', // Book Value Per Share (BVPS)
	pe: 'Tỷ lệ giá trên thu nhập (P/E)', // Price to Earnings Ratio (P/E)
	pb: 'Tỷ lệ giá trên giá trị sổ sách (P/B)', // Price to Book Ratio (P/B)
	dividend_yield: 'Tỷ suất cổ tức', // Dividend Yield

	// Nhóm chỉ số Tỷ suất
	profitability_index_group: 'Nhóm chỉ số Tỷ suất',
	roe: 'Tỷ suất lợi nhuận trên vốn chủ sở hữu bình quân (ROEA)', // Return on Average Equity
	roa: 'Tỷ suất sinh lời trên tổng tài sản bình quân (ROAA)', // Return on Average Assets
	yoea: 'Tỷ suất sinh lợi của Tài sản Có sinh lãi (YOEA)', // Yield on Earning Assets
	cof: 'Tỷ lệ chi phí hình thành Tài sản Có sinh lãi (COF)', // Cost of Funds
	nim: 'Tỷ lệ thu nhập lãi thuần (NIM)', // Net Interest Margin

	// Nhóm chỉ số Tăng trưởng
	// growth_index_group: 'Nhóm chỉ số Tăng trưởng',
	// pre_tax_profit_growth: 'Tăng trưởng lợi nhuận trước thuế', // Pre-Tax Profit Growth
	// post_tax_profit_growth: 'Tăng trưởng lợi nhuận sau thuế', // Post-Tax Profit Growth
	// total_assets_growth: 'Tăng trưởng tổng tài sản', // Total Assets Growth
	// equity_growth: 'Tăng trưởng vốn chủ sở hữu', // Equity Growth
	// loan_growth: 'Tăng trưởng dư nợ cho vay', // Loan Growth

	// Nhóm chỉ số Thanh khoản và An toàn
	safety_index_group: 'Nhóm chỉ số Thanh khoản và An toàn',
	ldr: 'Dư nợ cho vay khách hàng/Tổng vốn huy động (LDR)', // Loan-to-Deposit Ratio
	loan_to_total_assets: 'Dư nợ cho vay/Tổng tài sản Có', // Loans to Total Assets
	equity_to_deposit_ratio: 'Vốn chủ sở hữu/Tổng vốn huy động', // Equity to Deposit Ratio
	equity_to_total_assets: 'Vốn chủ sở hữu/Tổng tài sản Có', // Equity to Total Assets

	// Nhóm chỉ số Rủi ro
	risk_index_group: 'Nhóm chỉ số Rủi ro',
	risk_reserve_to_loans: 'Dự phòng rủi ro tín dụng/Tổng dư nợ', // Risk Reserves to Total Loans
	earning_assets_to_total_assets: 'Tài sản Có sinh lãi/Tổng tài sản Có', // Earning Assets to Total Assets
};

export interface FinancialAnalysisModel {
	// Nhóm chỉ số Định giá
	net_income: number; // Lợi nhuận sau thuế
	total_assets: number; // Tổng tài sản
	total_liabilities: number; // Tổng nợ
	outstanding_shares: number; // Số lượng cổ phiếu lưu hành
	stock_price: number; // Giá cổ phiếu
	dividends_per_share?: number; // Cổ tức trên mỗi cổ phiếu
	eps?: number; // Thu nhập trên mỗi cổ phiếu (EPS)
	bvps?: number; // Giá trị sổ sách trên mỗi cổ phiếu (BVPS)
	pe?: number; // Tỷ lệ giá trên thu nhập (P/E)
	pb?: number; // Tỷ lệ giá trên giá trị sổ sách (P/B)
	dividend_yield?: number; // Tỷ suất cổ tức

	// Nhóm chỉ số Tỷ suất
	roe?: number; // Tỷ suất lợi nhuận trên vốn chủ sở hữu (ROEA)
	roa?: number; // Tỷ suất sinh lời trên tổng tài sản (ROAA)
	yoea?: number; // Tỷ suất sinh lợi của Tài sản Có sinh lãi (YOEA)
	cof?: number; // Tỷ lệ chi phí hình thành Tài sản Có sinh lãi (COF)
	nim?: number; // Tỷ lệ thu nhập lãi thuần (NIM)

	// Nhóm chỉ số Tăng trưởng
	pre_tax_profit_growth?: number; // Tăng trưởng lợi nhuận trước thuế
	post_tax_profit_growth?: number; // Tăng trưởng lợi nhuận sau thuế
	total_assets_growth?: number; // Tăng trưởng tổng tài sản
	equity_growth?: number; // Tăng trưởng vốn chủ sở hữu
	loan_growth?: number; // Tăng trưởng dư nợ cho vay

	// Nhóm chỉ số Thanh khoản và An toàn
	ldr?: number; // Dư nợ cho vay khách hàng/Tổng vốn huy động (LDR)
	loan_to_total_assets?: number; // Dư nợ cho vay/Tổng tài sản Có
	equity_to_deposit_ratio?: number; // Vốn chủ sở hữu/Tổng vốn huy động
	equity_to_total_assets?: number; // Vốn chủ sở hữu/Tổng tài sản Có

	// Nhóm chỉ số Rủi ro
	risk_reserve_to_loans?: number; // Dự phòng rủi ro tín dụng/Tổng dư nợ
	earning_assets_to_total_assets?: number; // Tài sản Có sinh lãi/Tổng tài sản Có
}

export type FinancialState = {
	balanceSheet: {
		[year: string]: BalanceSheetModel;
	};
	cashFlow: {
		[year: string]: CashFlowModel;
	};
	incomeStatement: {
		[year: string]: IncomeStatementModel;
	};
};

// =========================================================== Model thông tin lich sử giao dịch tài chính trích xuất từ file excel ==================================================================
export interface HistoryStock {
	date: string; // Ngày
	openingPrice: number; // Giá mở cửa
	highestPrice: number; // Giá cao nhất
	lowestPrice: number; // Giá thấp nhất
	closingPrice: number; // Giá đóng cửa
	priceChange: number; // Thay đổi giá
	percentChange: number; // % Thay đổi
	volume: number; // Khối lượng
}

export interface StockDataUI {
	date: string; // Ngày
	openingPrice: string; // Giá mở cửa
	highestPrice: string; // Giá cao nhất
	lowestPrice: string; // Giá thấp nhất
	closingPrice: string; // Giá đóng cửa
	priceChange: string; // Thay đổi giá
	percentChange: string; // % Thay đổi
	volume: string; // Khối lượng
}
