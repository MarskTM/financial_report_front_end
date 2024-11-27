"use client";

import * as React from "react";
import { ChevronRight, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FinancialItem {
  id: string;
  name: string;
  values: number[];
  expanded?: boolean;
  children?: FinancialItem[];
}

const financialData: FinancialItem[] = [
  {
    id: "current-assets",
    name: "Tài sản ngắn hạn",
    values: [1231, 1068, 952, 974, 974],
    expanded: true,
    children: [
      {
        id: "cash",
        name: "Tiền và các khoản tương đương tiền",
        values: [17, 7, 6, 4, 10],
      },
      {
        id: "short-term-investments",
        name: "Các khoản đầu tư tài chính ngắn hạn",
        values: [0, 0, 0, 4, 0],
      },
      {
        id: "short-term-receivables",
        name: "Các khoản phải thu ngắn hạn",
        values: [1133, 1010, 891, 870, 883],
      },
      {
        id: "inventory",
        name: "Hàng tồn kho",
        values: [54, 38, 38, 71, 21],
      },
      {
        id: "other-current-assets",
        name: "Tài sản ngắn hạn khác",
        values: [28, 13, 17, 24, 59],
      },
    ],
  },
  {
    id: "non-current-assets",
    name: "Tài sản dài hạn",
    values: [1192, 929, 885, 910, 878],
    expanded: true,
    children: [
      {
        id: "long-term-receivables",
        name: "Các khoản phải thu dài hạn",
        values: [472, 375, 390, 382, 353],
      },
      {
        id: "fixed-assets",
        name: "Tài sản cố định",
        values: [177, 108, 93, 86, 77],
      },
      {
        id: "investment-properties",
        name: "Bất động sản đầu tư",
        values: [0, 0, 0, 0, 0],
      },
    ],
  },
];

interface Props {}

const TableBalanceSheet: React.FC<Props> = () => {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(() => {
    let setExpandedItems = new Set<string>();
    financialData.map((item) => {
      if (item.expanded) {
        setExpandedItems.add(item.id);
      }
    });
    return setExpandedItems;
  });

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (expandedItems.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderFinancialItem = (item: FinancialItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.id}>
        <tr className={cn(level === 0 ? "font-medium" : "")}>
          <td className="relative whitespace-nowrap py-4 pl-4 pr-3 text-sm">
            <div
              className="flex items-center gap-1"
              style={{ paddingLeft: `${level * 24}px` }}
            >
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => toggleItem(item.id)}
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
          {item.values.map((value, index) => (
            <td
              key={index}
              className="whitespace-nowrap px-3 py-4 text-sm text-right"
            >
              {value || "-"}
            </td>
          ))}
        </tr>
        {hasChildren &&
          isExpanded &&
          item.children?.map((child) => renderFinancialItem(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
		<div className="w-full space-y-4">
			<Tabs defaultValue="balance-sheet" className="w-full">
				<TabsList className="bg-white">
					<TabsTrigger value="balance-sheet">Bảng cân đối kế toán</TabsTrigger>
					<TabsTrigger value="income-statement">
						Báo cáo kết quả kinh doanh
					</TabsTrigger>
					<TabsTrigger value="cash-flow">
						Báo cáo lưu chuyển tiền tệ
					</TabsTrigger>
				</TabsList>

				<TabsContent value="balance-sheet" className="space-y-4">
					<div className="flex flex-wrap items-center gap-4 rounded-lg bg-muted/40 p-4">
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium">Kỳ báo cáo</span>
							<Select defaultValue="q3">
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
							<Select defaultValue="2024">
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
							<Select defaultValue="5">
								<SelectTrigger className="w-[120px]">
									<SelectValue placeholder="Chọn số kỳ" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="4">4</SelectItem>
									<SelectItem value="5">5</SelectItem>
									<SelectItem value="6">6</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium">Đơn vị</span>
							<Select defaultValue="billion">
								<SelectTrigger className="w-[120px]">
									<SelectValue placeholder="Chọn đơn vị" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="billion">Tỷ đồng</SelectItem>
									<SelectItem value="million">Triệu đồng</SelectItem>
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
									{financialData.map((item) =>
										renderFinancialItem(item),
									)}
								</tbody>
							</table>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="income-statement" className="space-y-4">
					<div className="flex flex-wrap items-center gap-4 rounded-lg bg-muted/40 p-4">
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium">Kỳ báo cáo</span>
							<Select defaultValue="q3">
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
							<Select defaultValue="2024">
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
							<Select defaultValue="5">
								<SelectTrigger className="w-[120px]">
									<SelectValue placeholder="Chọn số kỳ" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="4">4</SelectItem>
									<SelectItem value="5">5</SelectItem>
									<SelectItem value="6">6</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium">Đơn vị</span>
							<Select defaultValue="billion">
								<SelectTrigger className="w-[120px]">
									<SelectValue placeholder="Chọn đơn vị" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="billion">Tỷ đồng</SelectItem>
									<SelectItem value="million">Triệu đồng</SelectItem>
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
									{financialData.map((item) =>
										renderFinancialItem(item),
									)}
								</tbody>
							</table>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
  );
};

export default TableBalanceSheet;
