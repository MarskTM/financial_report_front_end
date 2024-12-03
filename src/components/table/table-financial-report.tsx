import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/Store";
import {} from "@/redux/slices/report_slice";

import * as model from "@/redux/model";

interface FinancialItem {
  field: string;
  name: string;
  expanded?: boolean;
  children?: FinancialItem[];
}

interface FormFilter {
  quarter: string;
  year: string;
  periods: string;
  unit: string;
}

const financialItem: FinancialItem[] = [
  {
    field: "cash_and_cash_equivalents",
    name: "Tài sản ngắn hạn",
    expanded: true,
    children: [
      {
        field: "accounts_receivable",
        name: "Tiền và các khoản tương đương tiền",
      },
      {
        field: "inventory",
        name: "Các khoản đầu tư tài chính ngắn hạn",
      },
      {
        field: "prepaid_expenses",
        name: "Các khoản phải thu ngắn hạn",
      },
      {
        field: "short_term_investments",
        name: "Hàng tồn kho",
      },
      {
        field: "other-current-assets",
        name: "Tài sản ngắn hạn khác",
      },
    ],
  },
  {
    field: "non-current-assets",
    name: "Tài sản dài hạn",

    expanded: true,
    children: [
      {
        field: "property_plant_equipment",
        name: "Các khoản phải thu dài hạn",
      },
      {
        field: "intangible_assets",
        name: "Tài sản cố định",
      },
      {
        field: "long_term_investments",
        name: "Bất động sản đầu tư",
      },
    ],
  },
];

// model.BalanceSheetModel
const datatests: any[] = [
  {
    cash_and_cash_equivalents: 123123,
    accounts_receivable: 123123,
    inventory: 123123,
    prepaid_expenses: 123123,
    short_term_investments: 123123,
    property_plant_equipment: 123123,
    intangible_assets: 123123,
    long_term_investments: 123123,
    deferred_tax_assets: 123123,
    goodwill: 123123,
  },

  {
    cash_and_cash_equivalents: 123123,
    accounts_receivable: 123123,
    inventory: 123123,
    prepaid_expenses: 123123,
    short_term_investments: 123123,
    property_plant_equipment: 123123,
    intangible_assets: 123123,
    long_term_investments: 123123,
    deferred_tax_assets: 123123,
    goodwill: 123123,
  },
  {
    cash_and_cash_equivalents: 123123,
    accounts_receivable: 123123,
    inventory: 123123,
    prepaid_expenses: 123123,
    short_term_investments: 123123,
    property_plant_equipment: 123123,
    intangible_assets: 123123,
    long_term_investments: 123123,
    deferred_tax_assets: 123123,
    goodwill: 123123,
  },
  {
    cash_and_cash_equivalents: 123123,
    accounts_receivable: 123123,
    inventory: 123123,
    prepaid_expenses: 123123,
    short_term_investments: 123123,
    property_plant_equipment: 123123,
    intangible_assets: 123123,
    long_term_investments: 123123,
    deferred_tax_assets: 123123,
    goodwill: 123123,
  },
  {
    cash_and_cash_equivalents: 123123,
    accounts_receivable: 123123,
    inventory: 123123,
    prepaid_expenses: 123123,
    short_term_investments: 123123,
    property_plant_equipment: 123123,
    intangible_assets: 123123,
    long_term_investments: 123123,
    deferred_tax_assets: 123123,
    goodwill: 123123,
  },
];

type Props = {
  tabName: string;
};

const TableFinancialReport: React.FC<Props> = ({ tabName }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    let setExpandedItems = new Set<string>();
    financialItem?.map((item) => {
      if (item.expanded) {
        setExpandedItems.add(item.field);
      }
    });
    return setExpandedItems;
  });

  const [formFilter, setFormFilter] = useState<FormFilter>({
    quarter: "q3",
    year: "2024",
    periods: "3",
    unit: "Tỷ đồng",
  });

  const toggleItem = (fieldName: string) => {
    const newExpanded = new Set(expandedItems);
    if (expandedItems.has(fieldName)) {
      newExpanded.delete(fieldName);
    } else {
      newExpanded.add(fieldName);
    }
    setExpandedItems(newExpanded);
  };

  const renderFinancialItem = (item: FinancialItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.field);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.field}>
        <tr className={cn(level === 0 ? "font-medium" : "")}>
          <td className="relative whitespace-nowrap py-4 pl-4 pr-3 w-96 text-sm">
            <div
              className="flex items-center gap-1"
              style={{ paddingLeft: `${level * 24}px` }}
            >
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => toggleItem(item.field)}
                >
                  {isExpanded ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              )}
              {item.name}
            </div>
          </td>

          {datatests.map((model) =>
            Object.entries(model).map(([key, value], index) => {
              if (item.field === key) {
                return (
                  <td
                    key={index}
                    className="whitespace-nowrap px-3 py-4 text-sm text-right"
                  >
                    {"-"}
                  </td>
                );
              }
            })
          )}
        </tr>
        {hasChildren &&
          isExpanded &&
          item.children?.map((child) => renderFinancialItem(child, level + 1))}
      </React.Fragment>
    );
  };

  useEffect(() => {
    console.log("useEffect - data filter: " + formFilter.periods);
  }, [formFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 rounded-lg bg-muted/60 p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Kỳ báo cáo</span>
          <Select
            defaultValue={formFilter?.quarter}
            onValueChange={(value: string) => {
              setFormFilter({ ...formFilter, quarter: value });
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chọn quý" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1">Quý 1</SelectItem>
              <SelectItem value="q2">Quý 2</SelectItem>
              <SelectItem value="q3">Quý 3</SelectItem>
              <SelectItem value="q4">Quý 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Năm</span>
          <Select
            defaultValue={formFilter?.year}
            onValueChange={(value: string) => {
              setFormFilter({ ...formFilter, year: value });
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Số kỳ hiển thị</span>
          <Select
            defaultValue={formFilter?.periods}
            onValueChange={(value: string) => {
              setFormFilter({ ...formFilter, periods: value });
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chọn số kỳ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Đơn vị</span>
          <Select
            defaultValue={formFilter?.unit}
            onValueChange={(value: string) => {
              setFormFilter({ ...formFilter, unit: value });
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chọn đơn vị" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Triệu đồng">Triệu đồng</SelectItem>
              <SelectItem value="Tỷ đồng">Tỷ đồng</SelectItem>
              <SelectItem value="Nghìn tỷ">Nghìn tỷ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">VND</span>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="bg-muted/50 py-3 pl-4 pr-3 text-left text-sm font-semibold">
                  Chỉ tiêu
                </th>
                <th className="bg-muted/50 px-3 py-3 text-right text-sm font-semibold">
                  Q3/2024
                </th>
                <th className="bg-muted/50 px-3 py-3 text-right text-sm font-semibold">
                  Q2/2024
                </th>
                <th className="bg-muted/50 px-3 py-3 text-right text-sm font-semibold">
                  Q1/2024
                </th>
                <th className="bg-muted/50 px-3 py-3 text-right text-sm font-semibold">
                  Q4/2023
                </th>
                <th className="bg-muted/50 px-3 py-3 text-right text-sm font-semibold">
                  Q3/2023
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {financialItem?.map((item) => renderFinancialItem(item))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableFinancialReport;
