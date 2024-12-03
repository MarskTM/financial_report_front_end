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
