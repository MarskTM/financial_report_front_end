
// ------------------------------- Authentication model ---------------------------
export interface User {
	id: string;
	username: string;
	role: string[];
}

export interface Credentials {
	username: string;
	password: string;
}

// -------------------------------- News Model --------------------------------
export interface News {
	id: string;
	title: string;
	content: string;
	author: string;
	createdAt: Date;
}

// -------------------------------- Company Model --------------------------------

// -------------------------------- Financial Report Model --------------------------------
export interface FinancialReport {
	id: number;
	company_id: number;
	media_id: number;

	name: string; // Tên báo cáo.
	category: string; // Loại hình báo cáo.
	quarter: number; // Quý báo cáo.
	date: Date; // Ngày công bố báo cáo.

	balance_sheet: BalanceSheetModel;
	income_statement: IncomeStatementModel;
	cash_flow: CashFlowModel;
}

// Cân đối kế toán
export interface BalanceSheetModel {
	// Tài sản ngắn hạn
	cash_and_cash_equivalents: number;
	accounts_receivable: number;
	inventory: number;
	prepaid_expenses: number;
	short_term_investments: number;

	// Tài sản dài hạn
	property_plant_equipment: number;
	intangible_assets: number;
	long_term_investments: number;
	deferred_tax_assets: number;
	goodwill: number;

	// Nợ phải trả ngắn hạn
	accounts_payable: number;
	short_term_debt: number;
	accrued_liabilities: number;
	deferred_revenue: number;
	current_portion_of_long_term_debt: number;

	// Nợ phải trả dài hạn
	long_term_debt: number;
	pension_liabilities: number;
	deferred_tax_liabilities: number;
	other_long_term_liabilities: number;

	// Vốn chủ sở hữu
	common_stock: number;
	retained_earnings: number;
	additional_paid_in_capital: number;
	treasury_stock: number;
	accumulated_other_comprehensive_income: number;
}

// Kết quả kinh doanh
export interface IncomeStatementModel {
	// Doanh thu
	revenue: number;
	cost_of_goods_sold: number;
	gross_profit: number;

	// Chi phí hoạt động
	selling_general_administrative_expenses: number;
	research_and_development_expenses: number;
	depreciation_and_amortization: number;
	other_operating_expenses: number;
	total_operating_expenses: number;

	// Thu nhập hoạt động
	operating_income: number;

	// Thu nhập khác và chi phí
	interest_income: number;
	interest_expense: number;
	other_non_operating_income: number;
	other_non_operating_expense: number;

	// Thu nhập trước thuế
	income_before_tax: number;
	income_tax_expense: number;

	// Lợi nhuận ròng
	net_income: number;
	earnings_per_share: number;
}

// Lưu chuyển tiền tệ
export interface CashFlowModel {
	// Dòng tiền từ hoạt động kinh doanh (Operating Activities)
	net_income: number;
	depreciation_and_amortization: number;
	changes_in_working_capital: number;
	accounts_receivable_changes: number;
	inventory_changes: number;
	accounts_payable_changes: number;
	other_operating_activities: number;
	net_cash_from_operating_activities: number;

	// Dòng tiền từ hoạt động đầu tư (Investing Activities)
	capital_expenditures: number;
	purchase_of_investments: number;
	sale_of_investments: number;
	other_investing_activities: number;
	net_cash_from_investing_activities: number;

	// Dòng tiền từ hoạt động tài chính (Financing Activities)
	issuance_of_debt: number;
	repayment_of_debt: number;
	issuance_of_equity: number;
	dividends_paid: number;
	other_financing_activities: number;
	net_cash_from_financing_activities: number;

	// Tổng lưu chuyển tiền tệ
	net_increase_in_cash: number;
	cash_at_beginning_of_period: number;
	cash_at_end_of_period: number;
}