export const FieldBalanceDefinitions: Record<string, string> = {
  total_company_assets: "TỔNG TÀI SẢN",
  cash_gold_silver: "Tiền mặt, vàng bạc, đá quý",
  state_bank_deposits: "Tiền gửi tại Ngân hàng nhà nước Việt Nam",
  credit_institution_deposits:
    "Tiền gửi tại các TCTD khác và cho vay các TCTD khác",
  trading_securities: "Chứng khoán kinh doanh",
  provision_trading_securities: "Dự phòng giảm giá chứng khoán kinh doanh",
  derivatives_and_other_financial_assets:
    "Các công cụ tài chính phái sinh và các tài sản tài chính khác",
  customer_loans: "Cho vay khách hàng",
  provision_customer_loans: "Dự phòng rủi ro cho vay khách hàng",
  investment_securities: "Chứng khoán đầu tư",
  securities_available_for_sale: "Chứng khoán đầu tư sẵn sàng để bán",
  securities_held_to_maturity: "Chứng khoán đầu tư giữ đến ngày đáo hạn",
  provision_investment_securities: "Dự phòng giảm giá chứng khoán đầu tư",
  long_term_investments: "Góp vốn, đầu tư dài hạn",
  investments_in_subsidiaries: "Đầu tư vào công ty con",
  investments_in_joint_ventures: "Đầu tư vào công ty liên doanh",
  other_long_term_investments: "Đầu tư dài hạn khác",
  provision_long_term_investments: "Dự phòng giảm giá đầu tư dài hạn",
  fixed_assets: "Tài sản cố định",
  tangible_fixed_assets: "Tài sản cố định hữu hình",
  leased_fixed_assets: "Tài sản cố định thuê tài chính",
  intangible_fixed_assets: "Tài sản cố định vô hình",
  investment_properties: "Investment properties",
  other_assets: "Other assets",
  total_liabilities_and_equity: "NỢ PHẢI TRẢ VÀ VỐN CHỦ SỞ HỮU",
  company_liabilities: "Tổng nợ phải trả",
  government_debts_and_state_bank: "Các khoản nợ chính phủ và NHNN Việt Nam",
  deposits_and_loans_from_credit_institutions:
    "Tiền gửi và vay các Tổ chức tín dụng khác",
  customer_deposits: "Tiền gửi của khách hàng",
  derivatives_and_other_financial_liabilities:
    "Các công cụ tài chính phái sinh và các khoản nợ tài chính khác",
  sponsored_capital_and_trust_investments:
    "Vốn tài trợ, uỷ thác đầu tư của Chính phủ và các tổ chức tín dụng khác",
  issued_debt_instruments: "Phát hành giấy tờ có giá",
  other_liabilities: "Các khoản nợ khác",
  equity: "Vốn chủ sở hữu",
  credit_institution_capital: "Vốn của tổ chức tín dụng",
  charter_capital: "Vốn điều lệ",
  capital_for_construction: "Vốn đầu tư XDCB",
  share_premium: "Thặng dư vốn cổ phần",
  treasury_shares: "Cổ phiếu Quỹ",
  preferred_shares: "Cổ phiếu ưu đãi",
  other_equity: "Vốn khác",
  funds_of_credit_institution: "Quỹ của tổ chức tín dụng",
  foreign_exchange_difference: "Chênh lệch tỷ giá hối đoái",
  revaluation_difference_of_assets: "Chênh lệch đánh giá lại tài sản",
  undistributed_profits: "Lợi nhuận chưa phân phối",
};

export interface BalanceSheetModel {
  // id?: number;
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
  total_liabilities_and_equity?: number;
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
}
