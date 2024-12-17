export const FieldCashFlowDefinitions: Record<string, string> = {
	net_cash_flow_from_operating_activities:
		'Lưu chuyển tiền thuần từ các hoạt động sản xuất kinh doanh',
	net_cash_flow_from_operating_activities_before_tax:
		'Lưu chuyển tiền thuần từ hoạt động kinh doanh trước thuế thu nhập DN',
	profit_loss_before_changes_in_working_capital:
		'Lãi/lỗ trước những thay đổi vốn lưu động',
	interest_and_similar_income: 'Thu nhập lãi và các khoản tương đương',
	interest_and_similar_expenses: 'Chi phí lãi và các khoản tương đương',
	fee_and_commission_income_received: 'Thu nhập từ hoạt động dịch vụ nhận được',
	income_from_trading_securities: 'Thu nhập từ hoạt động kinh doanh chứng khoán',
	other_income: 'Thu nhập khác',
	recovered_bad_debts:
		'Tiền thu các khoản nợ đã được xử lý, xóa, bù đắp bằng nguồn rủi ro',
	payments_to_employees_and_suppliers: 'Thanh toán cho nhân viên và nhà cung cấp',
	corporate_income_tax_paid: 'Tiền chi nộp thuế thu nhập doanh nghiệp',
	deposits_at_state_bank: 'Tiền gửi tại NHNN',
	change_deposits_loans_others:
		'(Tăng)/Giảm các khoản tiền gửi và cho vay các tổ chức tín dụng khác',
	change_trading_securities: '(Tăng)/giảm các khoản về kinh doanh chứng khoán',
	change_derivatives_assets:
		'(Tăng)/Giảm các công cụ tài chính phái sinh và các tài sản tài chính khác',
	change_customer_loans: '(Tăng)/Giảm các khoản cho vay khách hàng',
	change_interest_fee_receivables: '(Tăng)/Giảm lãi, phí phải thu',
	change_provision_funds: 'Tăng/(Giảm) nguồn dự phòng để bù đắp tổn thất các khoản',
	change_other_assets: '(Tăng)/Giảm khác về tài sản hoạt động',
	change_gov_borrowings: 'Tăng/(Giảm) các khoản nợ chính phủ và NHNN',
	change_deposits_loans_institutions:
		'Tăng/(Giảm) các khoản tiền gửi và vay các TCTD khác',
	change_customer_deposits: 'Tăng/(Giảm) tiền gửi của khách hàng',
	change_derivatives_liabilities:
		'Tăng/(Giảm) các công cụ tài chính phái sinh và các khoản nợ tài chính khác',
	change_trust_investments:
		'Tăng/(Giảm) vốn tài trợ, uỷ thác đầu tư của chính phủ và các TCTD khác',
	change_issued_debt: 'Tăng/(Giảm) phát hành giấy tờ có giá',
	change_interest_fee_payables: 'Tăng/(Giảm) lãi, phí phải trả',
	change_other_liabilities: 'Tăng/(Giảm) khác về công nợ hoạt động',
	corporate_income_tax_paid_again: 'Thuế thu nhập doanh nghiệp đã trả',
	payments_from_credit_institution_funds: 'Chi từ các quỹ của TCTD',
	receipts_from_bad_debt_recoveries: 'Thu được từ nợ khó đòi',
	net_cash_investing: 'Lưu chuyển tiền thuần từ hoạt động đầu tư',
	payments_for_fixed_assets: 'Tiền mua tài sản cố định và các tài sản dài hạn khác',
	proceeds_from_fixed_assets: 'Tiền thu được từ thanh lý tài sản cố định',
	payments_for_asset_disposals: 'Tiền chi từ thanh lý, nhượng bán TSCĐ',
	payments_for_investment_properties: 'Mua sắm Bất động sản đầu tư',
	proceeds_from_investment_properties_disposal:
		'Tiền thu từ bán, thanh lý bất động sản đầu tư',
	payments_for_investment_properties_disposal:
		'Tiền chi ra do bán, thanh lý bất động sản đầu tư',
	investments_in_entities: 'Đầu tư vào các doanh nghiệp khác',
	proceeds_from_investment_disposals:
		'Tiền thu từ việc bán các khoản đầu tư vào các doanh nghiệp khác',
	dividends_interest_received: 'Cổ tức và tiền lãi nhận được',
	net_cash_financing: 'Lưu chuyển tiền từ hoạt động tài chính',
	proceeds_from_shares_capital: 'Tiền thu từ phát hành cổ phiếu và vốn góp',
	proceeds_from_long_term_debt:
		'Tiền thu từ phát hành giấy tờ có giá dài hạn đủ điều kiện tính vào vốn tự có và các khoản vốn vay dài hạn khác',
	payments_for_long_term_debt:
		'Tiền chi thanh toán giấy tờ có giá dài hạn đủ điều kiện tính vào vốn tự có và các khoản vốn vay dài hạn khác',
	dividends_paid: 'Cổ tức đã trả',
	payments_for_purchase_of_treasury_shares: 'Tiền chi ra mua cổ phiếu quỹ',
	proceeds_from_sale_of_treasury_shares: 'Tiền thu được do bán cổ phiếu quỹ',
	net_change_cash_equivalents: 'Lưu chuyển tiền thuần trong kỳ',
	cash_equivalents_at_start: 'Tiền và tương đương tiền đầu kỳ',
	exchange_rate_effect: 'Ảnh hưởng của chênh lệch tỷ giá',
	cash_equivalents_at_end: 'Tiền và tương đương tiền cuối kỳ',
};

export interface CashFlowModel {
	// id?: number;
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
}
