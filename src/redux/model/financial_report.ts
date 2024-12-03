import { BalanceSheetModel } from "./balance_sheet";
import { IncomeStatementModel } from "./income_statement";
import { CashFlowModel } from "./cash_flow";
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
