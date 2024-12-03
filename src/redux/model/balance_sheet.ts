export const FieldBalanceDefinitions: Record<string, string> = {
  id: "ID",
  total_assets: "TỔNG TÀI SẢN",
  current_assets: "TÀI SẢN NGẮN HẠN",
  short_term_financial_assets: "Tài sản tài chính ngắn hạn",
  cash_and_cash_equivalents: "Tiền và tương đương tiền",
  cash: "Tiền",
  short_term_investments: "Các khoản tương đương tiền",
  net_investments: "Giá trị thuần đầu tư tài sản tài chính ngắn hạn",
  assets_fvtpl: "Các tài sản tài chính ghi nhận thông qua lãi/lỗ (FVTPL)",
  htm_investments: "Các khoản đầu tư nắm giữ đến ngày đáo hạn (HTM)",
  loans: "Các khoản cho vay",
  afs_investments: "Các khoản tài chính sẵn sàng để bán (AFS)",
  provision_for_stock_depreciation: "Dự phòng giảm giá chứng khoán kinh doanh",
  total_receivables: "Tổng các khoản phải thu",
  receivables_from_2016: "Các khoản phải thu (từ 2016)",
  receivables_customers: "Phải thu khách hàng",
  vat_deductible: "Thuế giá trị gia tăng được khấu trừ",
  prepayments: "Trả trước người bán",
  internal_receivables: "Phải thu nội bộ",
  construction_receivables: "Phải thu về XDCB",
  other_receivables: "Phải thu khác",
  provision_for_doubtful_receivables: "Dự phòng nợ khó đòi",
  inventory_net: "Hàng tồn kho (Ròng)",
  inventory: "Hàng tồn kho",
  provision_for_inventory_depreciation: "Dự phòng giảm giá HTK",
  other_current_assets: "Tài sản lưu động khác",
  long_term_assets: "TÀI SẢN DÀI HẠN",
  long_term_financial_assets: "Tài sản tài chính dài hạn",
  long_term_receivables: "Phải thu dài hạn",
  investments: "Đầu tư dài hạn",
  fixed_assets_net: "GTCL TSCĐ hữu hình",
  fixed_assets_gross: "Nguyên giá TSCĐ hữu hình",
  accumulated_depreciation: "Khấu hao lũy kế TSCĐ hữu hình",
  total_liabilities: "NỢ PHẢI TRẢ",
  short_term_liabilities: "Nợ ngắn hạn",
  short_term_financial_debts: "Vay và nợ thuê tài chính ngắn hạn",
  long_term_liabilities: "Nợ dài hạn",
  total_equity: "VỐN CHỦ SỞ HỮU",
  owner_investment: "Vốn đầu tư của chủ sở hữu",
  retained_earnings: "Lợi nhuận chưa phân phối",
  total_capital: "TỔNG CỘNG NGUỒN VỐN",
};

// Cân đối kế toán
export interface BalanceSheetModel {
  id?: number;
  total_assets?: number;
  current_assets?: number;
  short_term_financial_assets?: number;
  cash_and_cash_equivalents?: number;
  cash?: number;
  short_term_investments?: number;
  net_investments?: number;
  assets_fvtpl?: number;
  htm_investments?: number;
  loans?: number;
  afs_investments?: number;
  provision_for_stock_depreciation?: number;
  total_receivables?: number;
  receivables_from_2016?: number;
  receivables_customers?: number;
  vat_deductible?: number;
  prepayments?: number;
  internal_receivables?: number;
  construction_receivables?: number;
  other_receivables?: number;
  provision_for_doubtful_receivables?: number;
  inventory_net?: number;
  inventory?: number;
  provision_for_inventory_depreciation?: number;
  other_current_assets?: number;
  long_term_assets?: number;
  long_term_financial_assets?: number;
  long_term_receivables?: number;
  investments?: number;
  fixed_assets_net?: number;
  fixed_assets_gross?: number;
  accumulated_depreciation?: number;
  total_liabilities?: number;
  short_term_liabilities?: number;
  short_term_financial_debts?: number;
  long_term_liabilities?: number;
  total_equity?: number;
  owner_investment?: number;
  retained_earnings?: number;
  total_capital?: number;
}


