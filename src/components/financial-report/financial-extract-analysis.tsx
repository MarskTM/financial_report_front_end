import React from "react";
import {
  FinancialAnalysisModel,
  FieldFinancialAnalysisModel,
} from "@/redux/model/financial_report";
import { TableFinancialExtract } from "@/components";

interface Props {
  data: { [year: string]: FinancialAnalysisModel } | null;
  maxCol?: number;
}

const FinancialExtractAnalysis: React.FC<Props> = ({ data, maxCol }) => {
  return (
    <div className="flex flex-row bg-white">
      <div className="w-1/2 p-2">
        <TableFinancialExtract<FinancialAnalysisModel>
          data={data}
          fieldDefinitions={FieldFinancialAnalysisModel}
          maxCol={maxCol}
        />
      </div>

      <div className="w-1/2">

      </div>
    </div>
  );
};

export default FinancialExtractAnalysis;
