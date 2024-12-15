export const FieldIncomeDefinitions: Record<string, string> = {
  operating_interest_income: "Thu nhập lãi và các khoản thu nhập tương tự",
  operating_interest_expenses: "Chi phí lãi và các chi phí tương tự",
  net_operating_interest_income: "Thu nhập lãi thuần",
  fee_and_commission_income: "Thu nhập từ hoạt động dịch vụ",
  fee_and_commission_expenses: "Chi phí hoạt động dịch vụ",
  net_fee_and_commission_income: "Lãi thuần từ hoạt động dịch vụ",
  net_gain_loss_from_forex_and_gold_trading:
    "Lãi/(lỗ) thuần từ hoạt động kinh doanh ngoại hối và vàng",
  net_gain_loss_from_trading_securities:
    "Lãi/(lỗ) thuần từ mua bán chứng khoán kinh doanh",
  net_gain_loss_from_investment_securities:
    "Lãi/(lỗ) thuần từ mua bán chứng khoán đầu tư",
  other_operating_income: "Thu nhập từ hoạt động khác",
  other_operating_expenses: "Chi phí hoạt động khác",
  net_other_operating_income_expenses: "Lãi/(lỗ) thuần từ hoạt động khác",
  income_from_investment_in_associates: "Thu nhập từ góp vốn, mua cổ phần",
  total_operating_income: "Tổng thu nhập hoạt động",
  operating_expenses: "Chi phí hoạt động",
  profit_before_provision_for_credit_losses:
    "LN thuần từ hoạt động kinh doanh trước CP dự phòng rủi ro tín dụng",
  provision_expenses_for_credit_losses: "Chi phí dự phòng rủi ro tín dụng",
  profit_before_tax: "Tổng lợi nhuận trước thuế",
  current_corporate_income_tax_expense: "Chi phí thuế TNDN hiện hành",
  deferred_corporate_income_tax_expense: "Chi phí thuế TNDN hoãn lại",
  corporate_income_tax_expense: "Chi phí thuế thu nhập doanh nghiệp",
  profit_after_tax: "Lợi nhuận sau thuế",
  minority_interest: "Lợi ích của cổ đông thiểu số",
  parent_company_shareholders: "Cổ đông của Công ty mẹ",
  basic_earnings_per_share: "Lãi cơ bản trên cổ phiếu",
  ebit: "EBIT",
  ebitda: "EBITDA",
};

// Kết quả kinh doanh
export interface IncomeStatementModel {
  id?: number;
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
}
