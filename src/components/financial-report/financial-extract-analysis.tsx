import React from "react";
import {
  FinancialAnalysisModel,
  FieldFinancialAnalysisModel,
} from "@/redux/model/financial_report";
import {
  TableFinancialExtract,
  DividendIndexChart,
  ValuationIndexChart,
  RateIndexGroupChart,
} from "@/components";
import { ConvertFinancialAnalystData } from "@/utils/common";

interface Props {
  data: { [year: string]: FinancialAnalysisModel } | null;
  unit: string;
  maxCol?: number;
  quarter?: string;
  reportYear?: string;
  pageName: string;
}

const FinancialExtractAnalysis: React.FC<Props> = ({
  data,
  maxCol,
  quarter,
  reportYear,
  unit,
  pageName,
}) => {
  const conversionUnit =
    unit === "Đồng"
      ? "dong"
      : unit === "Triệu đồng"
      ? "trieu"
      : unit === "Tỉ đồng"
      ? "ty"
      : "nghin_ty";
  let dataWithUnit = data && ConvertFinancialAnalystData(data, conversionUnit);

  return (
    <div className="flex flex-row bg-white justify-between ">
      <div
        className={`${
          data != null && pageName !== "system-company-extract"
            ? "w-3/5"
            : "w-full"
        }`}
      >
        <TableFinancialExtract<FinancialAnalysisModel>
          data={dataWithUnit}
          fieldDefinitions={FieldFinancialAnalysisModel}
          maxCol={maxCol}
          quarter={quarter}
          reportYear={reportYear}
        />
      </div>
      {pageName !== "system-company-extract" ? (
        data != null ? (
          // Biểu đồ cho nhóm chỉ số định giá
          <div className="w-2/5 px-10 pt-10">
            <ValuationIndexChart data={dataWithUnit} unit={unit} />
            <DividendIndexChart data={dataWithUnit} unit={unit} />
            <RateIndexGroupChart data={dataWithUnit} unit={unit} />
          </div>
        ) : (
          <></>
        )
      ) : null}
    </div>
  );
};

export default FinancialExtractAnalysis;
