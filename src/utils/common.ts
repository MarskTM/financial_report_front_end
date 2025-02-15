import {
  BalanceSheetModel,
  FieldBalanceDefinitions,
} from "./../redux/model/balance_sheet";
import {
  CashFlowModel,
  FieldCashFlowDefinitions,
} from "./../redux/model/cash_flow";

import {
  FieldIncomeDefinitions,
  IncomeStatementModel,
} from "./../redux/model/income_statement";
import {
  FinancialReportModel,
  FinancialAnalysisModel,
  FinancialState,
} from "@/redux/model/financial_report";

import { HistoryStock, StockDataUI } from "./../redux/model/financial_report";

import * as XLSX from "xlsx";

// ====================================== Trích xuất data excel =========================================
export function ReadExcelData(file: File): Promise<{
  balanceSheet: { [year: string]: BalanceSheetModel };
  cashFlow: { [year: string]: CashFlowModel };
  incomeStatement: { [year: string]: IncomeStatementModel };
  financialReport: FinancialReportModel[];
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "array" });

        // console.log(workbook.Sheets["Balance Sheet"]);
        try {
          // Xử lý từng sheet với định nghĩa và model tương ứng
          const balanceSheetData = processSheet<BalanceSheetModel>(
            workbook.Sheets["Balance Sheet"],
            FieldBalanceDefinitions
          );

          const cashFlowData = processSheet<CashFlowModel>(
            workbook.Sheets["Cash Flow"],
            FieldCashFlowDefinitions
          );

          const incomeStatementData = processSheet<IncomeStatementModel>(
            workbook.Sheets["Income Statement"],
            FieldIncomeDefinitions
          );

          SortByQuarterAndYearASC;

          let colNames = sortYearsOrQuarters(
            Object.keys(SortByQuarterAndYearASC(incomeStatementData))
          ); // hiện tại lấy tạm tên các cột theo sheet của income, version sau yêu cấu lấy từ thằng đầy đủ nhât.
          const financialReportData = colNames.map<FinancialReportModel>(
            (colName) => {
              const reportData: FinancialReportModel = {
                quarter: colName,
                ...balanceSheetData[colName],
                ...cashFlowData[colName],
                ...incomeStatementData[colName],
              };

              return reportData;
            }
          );

          resolve({
            balanceSheet: balanceSheetData,
            cashFlow: cashFlowData,
            incomeStatement: incomeStatementData,
            financialReport: financialReportData,
          });
        } catch (error) {
          reject(new Error("Lỗi khi xử lý dữ liệu từ file: " + String(error)));
        }
      } else {
        reject(new Error("Không đọc được dữ liệu từ file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Lỗi khi đọc file"));
    };

    reader.readAsArrayBuffer(file);
  });
}

function processSheet<T>(
  sheet: XLSX.WorkSheet,
  definitions: Record<string, string>
): { [year: string]: T } {
  const sheetData = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
  }) as any[][];

  // console.log("preocess:", sheetData);

  let yearsRow: any[] | undefined;

  // Tìm dòng chứa tiêu đề
  for (const row of sheetData) {
    if (
      row &&
      row.length > 1 &&
      typeof row[0] === "string" &&
      row[0].includes("CHỈ TIÊU")
    ) {
      yearsRow = row;
      break;
    }
  }

  if (!yearsRow) {
    throw new Error("Không tìm thấy dòng tiêu đề chứa danh sách năm.");
  }

  let years = sheetData[7].slice(1); // Lấy danh sách năm từ dòng tiêu đề
  years = sortYearsOrQuarters(years); // Sắp xếp danh sách năm hoặc quý tăng dần

  const dataByYear: { [year: string]: T } = {};

  // Khởi tạo đối tượng cho mỗi năm
  years.forEach((year: string) => {
    dataByYear[year] = {} as T;
  });

  for (let i = 0; i < sheetData.length; i++) {
    const row = sheetData[i];
    const vietnameseDescription = row[0];

    const fieldName = GetFieldNameByVietnameseDescription<T>(
      vietnameseDescription,
      definitions
    );

    if (fieldName) {
      for (let j = 1; j < row.length; j++) {
        const dataValue = row[j];
        const parsedValue = parseFloat(dataValue) || 0;
        const year = years[j - 1];

        dataByYear[year][fieldName as keyof T] = parsedValue as T[keyof T];
      }
    }
  }

  return dataByYear;
}

function GetFieldNameByVietnameseDescription<T>(
  description: string,
  definitions: Record<string, string>
): keyof T | undefined {
  for (const key in definitions) {
    if (definitions[key] === description) {
      return key as keyof T;
    }
  }
  return undefined;
}

function sortYearsOrQuarters(years: string[]): string[] {
  return years.sort((a, b) => {
    const [partA, yearA] = a.split(" ");
    const [partB, yearB] = b.split(" ");

    // So sánh năm trước
    if (parseInt(yearA) !== parseInt(yearB)) {
      return parseInt(yearA) - parseInt(yearB);
    }

    // Nếu là quý, so sánh quý
    if (partA.startsWith("Q") && partB.startsWith("Q")) {
      return parseInt(partA.substring(1)) - parseInt(partB.substring(1));
    }

    return 0; // Nếu không phải dạng "Qx YYYY", giữ nguyên
  });
}

// ====================================== Tính tính toán nhóm chỉ số Tài chính =========================================
export function CalculateFinancialAnalysis(
  state: FinancialState,
  stock_price_map: { [year: string]: number }, // Bản đồ giá cổ phiếu theo kỳ hiển thị (quý, năm)
  outstanding_shares_map: { [year: string]: number }, // Bản đồ số cổ phiếu lưu hành theo kỳ hiển thị (quý, năm)
  dividends_per_share_map?: { [year: string]: number } // Bản đồ cổ tức mỗi cổ phiếu theo năm (nếu có)
): { [year: string]: FinancialAnalysisModel } {
  const result: { [year: string]: FinancialAnalysisModel } = {};

  for (const year in state.incomeStatement) {
    const balance_sheet = state.balanceSheet[year];
    const income_statement = state.incomeStatement[year];
    const stock_price = stock_price_map[year];
    const outstanding_shares = outstanding_shares_map[year];
    const dividends_per_share = dividends_per_share_map?.[year];

    if (
      !balance_sheet ||
      !income_statement ||
      !stock_price ||
      !outstanding_shares
    ) {
      console.log("Thiếu dữ liệu tài chính"); // In thông báo nếu thiếu dữ liệu tài chính
      continue; // Bỏ qua nếu thiếu dữ liệu
    }

    // Cơ sở dữ liệu
    const net_income = income_statement.profit_after_tax ?? 0; // Lợi nhuận sau thuế
    const total_assets = balance_sheet.total_company_assets ?? 0; // Tổng tài sản
    const total_liabilities = balance_sheet.company_liabilities ?? 0; // Tổng nợ
    const equity = total_assets - total_liabilities; // Vốn chủ sở hữu

    // Nhóm chỉ số Định giá
    const eps = net_income / outstanding_shares; // EPS
    const bvps = equity / outstanding_shares; // BVPS
    const pe = stock_price / eps; // P/E
    const pb = stock_price / bvps; // P/B
    const dividend_yield = dividends_per_share
      ? (dividends_per_share / stock_price) * 100
      : undefined; // Tỷ suất cổ tức

    // Nhóm chỉ số Tỷ suất
    const roe = (net_income / equity) * 100; // ROE
    const roa = (net_income / total_assets) * 100; // ROA

    const interest_and_similar_income =
      income_statement.operating_interest_income ?? 0;
    const interest_and_similar_expenses =
      income_statement.operating_interest_expenses ?? 0;
    const yoea = interest_and_similar_income / total_assets; // YOEA
    const cof = (interest_and_similar_expenses / total_assets) * 100; // COF
    const nim =
      ((interest_and_similar_income - interest_and_similar_expenses) /
        total_assets) *
      100; // NIM

    // Nhóm chỉ số Tăng trưởng
    const previousYearIncomeStatement = state.incomeStatement[`${+year - 1}`];
    const previousYearBalanceSheet = state.balanceSheet[`${+year - 1}`];

    const profit_before_tax = income_statement.profit_before_tax ?? 0;
    const pre_tax_profit_growth =
      previousYearIncomeStatement &&
      previousYearIncomeStatement.profit_before_tax
        ? ((profit_before_tax - previousYearIncomeStatement.profit_before_tax) /
            previousYearIncomeStatement.profit_before_tax) *
          100
        : undefined; // Tăng trưởng lợi nhuận trước thuế

    const profit_after_tax = income_statement.profit_after_tax ?? 0;
    const post_tax_profit_growth =
      previousYearIncomeStatement &&
      previousYearIncomeStatement.profit_after_tax
        ? ((profit_after_tax - previousYearIncomeStatement.profit_after_tax) /
            previousYearIncomeStatement.profit_after_tax) *
          100
        : undefined; // Tăng trưởng lợi nhuận sau thuế

    const total_assets_growth =
      previousYearBalanceSheet && previousYearBalanceSheet.total_company_assets
        ? ((total_assets - previousYearBalanceSheet.total_company_assets) /
            previousYearBalanceSheet.total_company_assets) *
          100
        : undefined;

    const equity_growth =
      previousYearBalanceSheet && previousYearBalanceSheet.equity
        ? ((equity - previousYearBalanceSheet.equity) /
            previousYearBalanceSheet.equity) *
          100
        : undefined;

    // Nhóm chỉ số Thanh khoản và An toàn
    const customer_loans = balance_sheet.customer_loans ?? 0;
    const provision_customer_loans =
      balance_sheet.provision_customer_loans ?? 0;
    const customer_deposits = balance_sheet.customer_deposits ?? 0;
    const trading_securities = balance_sheet.trading_securities ?? 0; // Cổ phiếu kinh doanh

    const ldr = customer_loans / customer_deposits; // LDR
    const loan_to_total_assets = customer_loans / total_assets; // Loan/Total Assets
    const equity_to_deposit_ratio = equity / customer_deposits; // Equity/Deposits
    const equity_to_total_assets = equity / total_assets; // Equity/Total Assets

    // Nhóm chỉ số Rủi ro
    const risk_reserve_to_loans = provision_customer_loans / customer_loans; // Risk reserve to loans
    const earning_assets_to_total_assets = trading_securities / total_assets; // Earning assets/Total assets

    // Kết quả cho từng năm
    result[year] = {
      net_income,
      total_assets,
      total_liabilities,
      outstanding_shares,
      stock_price,
      dividends_per_share,
      eps,
      bvps,
      pe,
      pb,
      dividend_yield,
      roe,
      roa,
      yoea,
      cof,
      nim,
      pre_tax_profit_growth,
      post_tax_profit_growth,
      total_assets_growth,
      equity_growth,
      ldr,
      loan_to_total_assets,
      equity_to_deposit_ratio,
      equity_to_total_assets,
      risk_reserve_to_loans,
      earning_assets_to_total_assets,
    };
  }

  return result;
}

export function SortByQuarterAndYearASC<T>(data: { [quarter: string]: T }): {
  [quarter: string]: T;
} {
  const quarterOrder: Record<"Q1" | "Q2" | "Q3" | "Q4", number> = {
    Q1: 1,
    Q2: 2,
    Q3: 3,
    Q4: 4,
  };

  // Sắp xếp theo năm trước, sau đó đến quý
  const sortedEntries = Object.entries(data).sort(([keyA], [keyB]) => {
    // Tách năm và quý từ các key
    const [quarterA, yearA] = keyA.split(" ");
    const [quarterB, yearB] = keyB.split(" ");

    // So sánh năm
    const yearComparison = parseInt(yearA) - parseInt(yearB);
    if (yearComparison !== 0) {
      return yearComparison;
    }

    // Nếu cùng năm, so sánh thứ tự quý
    return (
      quarterOrder[quarterA as "Q1" | "Q2" | "Q3" | "Q4"] -
      quarterOrder[quarterB as "Q1" | "Q2" | "Q3" | "Q4"]
    );
  });

  // Chuyển mảng đã sắp xếp về lại đối tượng
  return Object.fromEntries(sortedEntries);
}

// ------------------------------------------------------------------------------------------------

type FinancialReportData = {
  balanceSheet: { [year: string]: BalanceSheetModel };
  cashFlow: { [year: string]: CashFlowModel };
  incomeStatement: { [year: string]: IncomeStatementModel };
};

export function ConvertCurrency(
  amount: number,
  targetUnit: "dong" | "trieu" | "ty" | "nghin_ty" = "trieu"
): number {
  // Đơn vị chuyển đổi
  const conversionRates: Record<"dong" | "trieu" | "ty" | "nghin_ty", number> =
    {
      dong: 1, // VND
      trieu: 1_000_000, // 1 triệu = 1,000,000 VND
      ty: 1_000_000_000, // 1 tỷ = 1,000,000,000 VND
      nghin_ty: 1_000_000_000_000, // 1 nghìn tỷ = 1,000,000,000,000 VND
    };

  // Chuyển đổi giá trị
  const convertedValue = amount / conversionRates[targetUnit];

  // Trả về giá trị dạng số
  return parseFloat(convertedValue.toFixed(2)); // Đảm bảo làm tròn đến 2 chữ số thập phân
}

/**
 * Chuyển đổi toàn bộ dữ liệu của một object model bằng cách duyệt qua các trường.
 */
export function ConvertModel<T extends Record<string, any>>(
  data: { [year: string]: T },
  unit: "dong" | "trieu" | "ty" | "nghin_ty"
): { [year: string]: T } {
  return Object.fromEntries(
    Object.entries(data).map(([period, fields]) => [
      period,
      Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [
          key,
          typeof value === "number" ? ConvertCurrency(value, unit) : value,
        ])
      ),
    ])
  ) as { [year: string]: T };
}

export function ConvertFinancialReportData(
  reportData: FinancialReportData,
  unit: "dong" | "trieu" | "ty" | "nghin_ty"
): FinancialReportData {
  return {
    balanceSheet: ConvertModel(reportData.balanceSheet, unit),
    cashFlow: ConvertModel(reportData.cashFlow, unit),
    incomeStatement: ConvertModel(reportData.incomeStatement, unit),
  };
}

export function ConvertFinancialAnalystData<T extends Record<string, any>>(
  data: { [year: string]: T },
  unit: "dong" | "trieu" | "ty" | "nghin_ty"
): { [year: string]: T } {
  // Danh sách các chỉ số cần chuyển đổi
  const convertibleFields = [
    "net_income",
    "total_assets",
    "total_liabilities",
    "eps",
    "bvps",
  ];

  return Object.fromEntries(
    Object.entries(data).map(([period, fields]) => [
      period,
      Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [
          key,
          // Chỉ chuyển đổi nếu key nằm trong danh sách cần chuyển đổi
          convertibleFields.includes(key) && typeof value === "number"
            ? ConvertCurrency(value, unit)
            : value,
        ])
      ),
    ])
  ) as { [year: string]: T };
}

// ------------------------------- Đọc file excel cho lịch sử giá ---------------------------------
export const ReadHistoryStockExcelFile = async (
  file: File
): Promise<HistoryStock[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1, // Dữ liệu dạng mảng
        raw: true,
      });

      const parsedData: HistoryStock[] = jsonData
        .slice(6) // Bỏ qua tiêu đề (6 dòng đầu)
        .filter(
          (row: any) => row[0] && new Date(row[0]) > new Date("2023-01-01")
        )
        .map((row: any) => ({
          date: row[0], // Cột A: Ngày
          openingPrice: parseFloat(row[1]), // Cột B: Giá mở cửa
          highestPrice: parseFloat(row[2]), // Cột C: Giá cao nhất
          lowestPrice: parseFloat(row[3]), // Cột D: Giá thấp nhất
          closingPrice: parseFloat(row[4]), // Cột E: Giá đóng cửa
          priceChange: parseFloat(row[5]), // Cột F: Thay đổi giá
          percentChange: parseFloat(row[6]), // Cột G: % Thay đổi
          volume: parseFloat(row[7]), // Cột H: Khối lượng
        }));
      resolve(parsedData);
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const ConvertDBToUIFormat = (data: HistoryStock[]): StockDataUI[] => {
  return data.map((item) => ({
    date: item.date,
    openingPrice: item.openingPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    highestPrice: item.highestPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    lowestPrice: item.lowestPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    closingPrice: item.closingPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    priceChange: item.priceChange.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    percentChange: item.percentChange.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    volume: item.volume.toLocaleString("en-US"),
  }));
};

export const FormatNumberUI = (number: number): string => {
  return new Intl.NumberFormat("en-US").format(number);
};



// Hàm xử lý dữ liệu
export function ProcessFinancialReports(reports: FinancialReportModel[]) {
  const result = {
    balanceSheet: {} as { [quarter: string]: BalanceSheetModel },
    cashFlow: {} as { [quarter: string]: CashFlowModel },
    incomeStatement: {} as { [quarter: string]: IncomeStatementModel },
    financialAnalyst: {} as { [quarter: string]: FinancialAnalysisModel },
  };

  reports.forEach((report) => {
    const quarter = report.quarter; // Lấy giá trị 'quarter' từ báo cáo

    // Kiểm tra nếu 'quarter' có giá trị, sau đó tiến hành xử lý dữ liệu
    if (quarter) {
      // Process balanceSheet
      if (!result.balanceSheet[quarter]) {
        result.balanceSheet[quarter] = {} as BalanceSheetModel;
      }
      result.balanceSheet[quarter] = {
        ...result.balanceSheet[quarter],
        ...report,
      };

      // Process cashFlow
      if (!result.cashFlow[quarter]) {
        result.cashFlow[quarter] = {} as CashFlowModel;
      }
      result.cashFlow[quarter] = { ...result.cashFlow[quarter], ...report };

      // Process incomeStatement
      if (!result.incomeStatement[quarter]) {
        result.incomeStatement[quarter] = {} as IncomeStatementModel;
      }
      result.incomeStatement[quarter] = {
        ...result.incomeStatement[quarter],
        ...report,
      };

      // Process financialAnalyst
      if (!result.financialAnalyst[quarter]) {
        result.financialAnalyst[quarter] = {} as FinancialAnalysisModel;
      }
      result.financialAnalyst[quarter] = {
        ...result.financialAnalyst[quarter],
        ...report,
      };
    }
  });

  return result;
}