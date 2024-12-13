import { CompanyFinancialStatements } from "./financial_report";

// Interface định nghĩa thông tin công ty (dạng snake_case)
export interface CompanyInfo {
  // Muc 1: thông tin cơ bản
  id: number; // ID công ty (dùng để phân biệt các công ty)
  company_name: string; // Tên công ty
  company_code: string; // Mã công ty
  tax_code: string; // Mã số thuế
  establishment_date: Date | null; // Ngày thành lập (có thể null nếu chưa chọn)
  company_type: string; // Loại hình công ty
  company_logo: string | null; // Logo công ty (có thể là File hoặc null)
  company_address: string; // Địa chỉ công ty
  company_email?: string; // Gmail công ty
  company_phone?: string; // Điện thoại công ty
  company_website?: string | null; // Website công ty
  company_description?: string; // Giới thiệu về công ty

  // Mục 2: Thông tin ban lãnh đạo
  managements?: CompanyManagements[];

  // Mục 3: Thông tin niêm yết
  market_capitalization: number; // Vốn hóa
  first_trading_date: Date | null; // Ngày giao dịch đầu tiên
  first_trading_price: number | null; // Giá giao dịch ngày đầu
  initial_listing_volume: number | null; // Khối lượng niêm yết lần đầu
  current_listing_volume: number | null; // Khối lượng niêm yết hiện tại
  outstanding_shares: number | null; // Khối lượng cổ phiếu đang lưu hành

  // Mục 4: Tài liệu báo cáo
  files?: CompanyFiles[];

  // Mục 5: Thông tin tài chính
  financial_statements?: CompanyFinancialStatements[];

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

// "Thông tin ban lãnh đạo"
export interface CompanyManagements {
	id: number; // ID ban lãnh đạo
	company_id: number; // ID Công ty
	avatar: string; // Ảnh đai diện
	name: string; // Tên ban lãnh đạo
	position: string; // Chức vụ
	year_start: Date | null; // ngày bổ nhiệm
}

// Thông tin các file báo cóa doanh nghiệp công bố
interface CompanyFiles {
  id: number; //  ID mã tệp
  name: string; // Tên tệp
  path: string; // Đường dẫn
  year_start: Date | null; // Ngày đăng
}
