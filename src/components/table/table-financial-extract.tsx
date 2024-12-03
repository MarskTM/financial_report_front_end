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
  } | null;
}

const TableFinancialExtract: React.FC<Props> = ({ balance }) => {
  const indicators = Object.keys(FieldBalanceDefinitions);
  const dataSource = indicators
    .filter((item, index) => index !== 0)
    .map((indicator, index) => {
      const row: {
        key: string;
        name: string;
        [quarter: string]: number | string;
      } = {
        key: `${index}`,
        name: FieldBalanceDefinitions[indicator],
      };

      Object.keys(balance || {}).forEach((quarter) => {
        row[quarter] =
          balance?.[quarter]?.[indicator as keyof BalanceSheetModel] || "-";
      });

      return row;
    });

  const columns = [
    {
      title: "Chỉ tiêu",
      dataIndex: "name",
      key: "name",
      fixed: "left" as const,
    },
    ...Object.keys(balance || {}).map((quarter) => ({
      title: quarter,
      dataIndex: quarter,
      key: quarter,
      align: "center" as const,
      render: (value: number | string) =>
        typeof value === "number" ? value.toLocaleString() : value,
    })),
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        pagination={false}
      />
    </div>
  );
};

export default TableFinancialExtract;
