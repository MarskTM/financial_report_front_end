export const FieldIncomeDefinitions: Record<string, string> = {};

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
