import {
  BalanceSheetModel,
  FieldBalanceDefinitions,
} from "./../redux/model/balance_sheet";
import * as XLSX from "xlsx";

function getFieldNameByVietnameseDescription(
  description: string
): keyof BalanceSheetModel | undefined {
  for (const key in FieldBalanceDefinitions) {
    if (FieldBalanceDefinitions[key] === description) {
      return key as keyof BalanceSheetModel;
    }
  }
  return undefined;
}

export function ReadBalanceSheetData(
  file: File
): Promise<{ [year: string]: BalanceSheetModel }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as any[][];

        const years = sheetData[3].slice(1); // Lấy danh sách năm từ dòng đầu tiên, bỏ qua cột đầu
        const balanceSheetDataByYear: { [year: string]: BalanceSheetModel } =
          {};

        // console.log(sheetData);

        // Khởi tạo đối tượng cho mỗi năm
        years.forEach((year: string) => {
          balanceSheetDataByYear[year] = {} as BalanceSheetModel;
        });
        // console.log(years);
        // const balanceSheetData: BalanceSheetModel = {} as BalanceSheetModel;

        for (let i = 0; i < sheetData.length; i++) {
          const row = sheetData[i];
          const vietnameseDescription = row[0];
          const id = row[1];

          const fieldName = getFieldNameByVietnameseDescription(
            vietnameseDescription
          );

          if (fieldName) {
            // const parsedValue = parseFloat(dataValue) || 0;
            // balanceSheetData[fieldName] = parsedValue;

            for (let j = 1; j < row.length; j++) {
              const dataValue = row[j];
              const parsedValue = parseFloat(dataValue) || 0;
              const year = years[j - 1];

              balanceSheetDataByYear[year][fieldName] = parsedValue;
            }
          } else {
            // console.warn(
            //   `Không tìm thấy trường cho mô tả: ${vietnameseDescription}`
            // );
            continue;
          }
        }

        resolve(balanceSheetDataByYear);
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
