import {
  BalanceSheetModel,
  FieldBalanceDefinitions,
} from "@/redux/model/balance_sheet";
import { CashFlowModel } from "@/redux/model/cash_flow";
import { IncomeStatementModel } from "@/redux/model/income_statement";

import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { title } from "process";

interface Props {
  balance?: {
    [year: string]: BalanceSheetModel;
  };
}

const TableFinancialExtract: React.FC<Props> = ({ balance }) => {

  const [tableFile, setTableFile] = useState<ColumnsType<BalanceSheetModel>>(
  );

  return (
    <div>
      {/* <Table columns={columns} dataSource={dataSource} rowKey="year" />; */}
    </div>
  );
};

export default TableFinancialExtract;
