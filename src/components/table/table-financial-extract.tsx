import React from "react";
import { Table } from "antd";
import {
  FieldBalanceDefinitions,
  BalanceSheetModel,
} from "@/redux/model/balance_sheet";
import {
  FieldCashFlowDefinitions,
  CashFlowModel,
} from "@/redux/model/cash_flow";
import {
  FieldIncomeDefinitions,
  IncomeStatementModel,
} from "@/redux/model/income_statement";

interface Props<T> {
  data?: { [year: string]: T } | null;
  fieldDefinitions: Record<string, string>;
  maxCol?: number;
}

export const TableFinancialExtract = <T,>({
  data,
  fieldDefinitions,
  maxCol,
}: Props<T>) => {
  const maxColumns = maxCol ?? 5;

  const indicators = Object.keys(fieldDefinitions);
  const dataSource = indicators.map((indicator, index) => {
    const row: {
      key: string;
      name: string;
      [quarter: string]: number | string;
    } = {
      key: `${index}`,
      name: fieldDefinitions[indicator],
    };

    Object.keys(data || {}).forEach((quarter) => {
      const value = data?.[quarter]?.[indicator as keyof T];
      row[quarter] =
        typeof value === "number" || typeof value === "string" ? value : "-";
    });

    return row;
  });

  const sortedColumns = Object.keys(data || {}).sort(); // Sắp xếp theo thứ tự tăng dần
  const columns = [
    {
      title: "Chỉ tiêu",
      dataIndex: "name",
      key: "name",
      fixed: "left" as const,
    },
    ...sortedColumns.slice(-maxColumns).map((quarter) => ({
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
      {data ? (
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="key"
          pagination={false}
        />
      ) : (
        <Table
          columns={[]}
          dataSource={[]}
          rowKey="key"
          pagination={false}
        />
      )}
    </div>
  );
};

export const BalanceSheetTable = ({
  data,
  maxCol,
}: {
  data: { [year: string]: BalanceSheetModel } | null;
  maxCol?: number;
}) => (
  <TableFinancialExtract<BalanceSheetModel>
    data={data}
    fieldDefinitions={FieldBalanceDefinitions}
    maxCol={maxCol}
  />
);

export const CashFlowTable = ({
  data,
  maxCol,
}: {
  data: { [year: string]: CashFlowModel } | null;
  maxCol?: number;
}) => (
  <TableFinancialExtract<CashFlowModel>
    data={data}
    fieldDefinitions={FieldCashFlowDefinitions}
    maxCol={maxCol}
  />
);

export const IncomeStatementTable = ({
  data,
  maxCol,
}: {
  data: { [year: string]: IncomeStatementModel } | null;
  maxCol?: number;
}) => (
  <TableFinancialExtract<IncomeStatementModel>
    data={data}
    fieldDefinitions={FieldIncomeDefinitions}
    maxCol={maxCol}
  />
);

export default IncomeStatementTable;
