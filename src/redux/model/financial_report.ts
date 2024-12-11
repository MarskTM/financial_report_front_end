import { BalanceSheetModel } from "./balance_sheet";
import { IncomeStatementModel } from "./income_statement";
import { CashFlowModel } from "./cash_flow";

// -------------------------------- Financial Report Model --------------------------------
export interface CompanyFinancialStatements {
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

// =========================================================== Model thông tin báo cáo tài chính trích xuất từ file excel ==================================================================
export const FieldFinancialAnalysisModel: Record<string, string> = {
  // Nhóm chỉ số Định giá
  valuation_index_group: "Nhóm chỉ số Định giá",
  net_income: "Lợi nhuận sau thuế", // Net Income
  total_assets: "Tổng tài sản", // Total Assets
  total_liabilities: "Tổng nợ", // Total Liabilities
  outstanding_shares: "Số lượng cổ phiếu lưu hành", // Outstanding Shares
  stock_price: "Giá cổ phiếu", // Stock Price
  dividends_per_share: "Cổ tức trên mỗi cổ phiếu", // Dividends Per Share
  eps: "Thu nhập trên mỗi cổ phiếu (EPS)", // Earnings Per Share (EPS)
  bvps: "Giá trị sổ sách trên mỗi cổ phiếu (BVPS)", // Book Value Per Share (BVPS)
  pe: "Tỷ lệ giá trên thu nhập (P/E)", // Price to Earnings Ratio (P/E)
  pb: "Tỷ lệ giá trên giá trị sổ sách (P/B)", // Price to Book Ratio (P/B)
  dividend_yield: "Tỷ suất cổ tức", // Dividend Yield

  // Nhóm chỉ số Tỷ suất
  profitability_index_group: "Nhóm chỉ số Tỷ suất",
  roe: "Tỷ suất lợi nhuận trên vốn chủ sở hữu bình quân (ROEA)", // Return on Average Equity
  roa: "Tỷ suất sinh lời trên tổng tài sản bình quân (ROAA)", // Return on Average Assets
  yoea: "Tỷ suất sinh lợi của Tài sản Có sinh lãi (YOEA)", // Yield on Earning Assets
  cof: "Tỷ lệ chi phí hình thành Tài sản Có sinh lãi (COF)", // Cost of Funds
  nim: "Tỷ lệ thu nhập lãi thuần (NIM)", // Net Interest Margin

  // Nhóm chỉ số Tăng trưởng
  // growth_index_group: 'Nhóm chỉ số Tăng trưởng',
  // pre_tax_profit_growth: 'Tăng trưởng lợi nhuận trước thuế', // Pre-Tax Profit Growth
  // post_tax_profit_growth: 'Tăng trưởng lợi nhuận sau thuế', // Post-Tax Profit Growth
  // total_assets_growth: 'Tăng trưởng tổng tài sản', // Total Assets Growth
  // equity_growth: 'Tăng trưởng vốn chủ sở hữu', // Equity Growth
  // loan_growth: 'Tăng trưởng dư nợ cho vay', // Loan Growth

  // Nhóm chỉ số Thanh khoản và An toàn
  safety_index_group: "Nhóm chỉ số Thanh khoản và An toàn",
  ldr: "Dư nợ cho vay khách hàng/Tổng vốn huy động (LDR)", // Loan-to-Deposit Ratio
  loan_to_total_assets: "Dư nợ cho vay/Tổng tài sản Có", // Loans to Total Assets
  equity_to_deposit_ratio: "Vốn chủ sở hữu/Tổng vốn huy động", // Equity to Deposit Ratio
  equity_to_total_assets: "Vốn chủ sở hữu/Tổng tài sản Có", // Equity to Total Assets

  // Nhóm chỉ số Rủi ro
  risk_index_group: "Nhóm chỉ số Rủi ro",
  risk_reserve_to_loans: "Dự phòng rủi ro tín dụng/Tổng dư nợ", // Risk Reserves to Total Loans
  earning_assets_to_total_assets: "Tài sản Có sinh lãi/Tổng tài sản Có", // Earning Assets to Total Assets
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


// =========================================================== Model thông tin báo cáo tài chính trích xuất từ file excel ==================================================================
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