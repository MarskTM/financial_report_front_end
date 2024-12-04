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

import * as XLSX from "xlsx";


// =================================================================
export function ReadExcelData(file: File): Promise<{
  balanceSheet: { [year: string]: BalanceSheetModel };
  cashFlow: { [year: string]: CashFlowModel };
  incomeStatement: { [year: string]: IncomeStatementModel };
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

          resolve({
            balanceSheet: balanceSheetData,
            cashFlow: cashFlowData,
            incomeStatement: incomeStatementData,
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