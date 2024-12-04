import { Header, SidebarMenu, FinancialChartOverview } from "@/components";

import React, { useEffect, useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ReadExcelData } from "@/utils/common";

import { BalanceSheetModel } from "@/redux/model/balance_sheet";
import { CashFlowModel } from "@/redux/model/cash_flow";
import { IncomeStatementModel } from "@/redux/model/income_statement";

import {
  BalanceSheetTable,
  IncomeStatementTable,
  CashFlowTable,
} from "@/components";

import { Tabs } from "antd";
// import { CSS } from "@dnd-kit/utilities";
import type { TabsProps } from "antd";

interface Props {}

const AnalystExtract: React.FC<Props> = ({}) => {
  const [fileName, setFileName] = useState<string>("");
  const [financialReportData, setFinancialReportData] = useState<{
    balanceSheet: {
      [year: string]: BalanceSheetModel;
    };
    cashFlow: {
      [year: string]: CashFlowModel;
    };
    incomeStatement: {
      [year: string]: IncomeStatementModel;
    };
  } | null>(null);

  const uploadProps = {
    beforeUpload: async (file: File) => {
      // Cập nhật tên file và ngăn chặn upload tự động
      setFileName(file.name);
      try {
        const financialReport = await ReadExcelData(file);

        setFinancialReportData(financialReport);
        console.log("Dữ liệu Balance Sheet:", financialReport);
      } catch (error) {
        console.error("Lỗi khi đọc dữ liệu:", error);
      }

      return false; // Ngăn upload tự động
    },

    afterUpload: (file: File) => {},
    showUploadList: false, // Ẩn danh sách file upload
  };

  const [tabItems, setTabItems] = useState<NonNullable<TabsProps["items"]>>([]);

  useEffect(() => {
    setTabItems([
      {
        key: "report_chart",
        label: "Biểu đồ",
        children: <div><FinancialChartOverview /></div>,
      },
      {
        key: "balance_sheet",
        label: "Bảng cân đối kế toán",
        children: (
          <div>
            <BalanceSheetTable
              data={financialReportData?.balanceSheet ?? null}
              maxCol={5}
            />
          </div>
        ),
      },
      {
        key: "income_statement",
        label: "Báo cáo kết quả kinh doanh",
        children: (
          <IncomeStatementTable
            data={financialReportData?.incomeStatement ?? null}
            maxCol={5}
          />
        ),
      },
      {
        key: "cash_flow",
        label: "Báo cáo lưu chuyển tiền tệ",
        children: (
          <CashFlowTable
            data={financialReportData?.cashFlow ?? null}
            maxCol={5}
          />
        ),
      },
      {
        key: "indicators",
        label: "Chỉ số tài chính",
        children: <div></div>,
      },
      {
        key: "Forecast",
        label: "Dự Đoán",
        children: <div></div>,
      },
    ]);
  }, [financialReportData]);

  return (
    <div className="w-screen h-svh bg-slate-100 relative overflow-y-scroll">
      <div className="w-[83%] fixed top-3 left-72 pl-2 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Analyst" />
      </div>

      {/* Page Content */}
      <div className="w-[83%] h-full pt-32 mb-10 ml-72 pl-2 z-40">
        <div className="max-w-80">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} className="w-48">
              <span className="direction-rtl block truncate">
                {fileName || "Phân Tích Báo Cáo"}
              </span>
            </Button>
          </Upload>
        </div>

        <div className="mt-10">
          {<Tabs items={tabItems} defaultActiveKey="balance_sheet" />}
        </div>
      </div>
    </div>
  );
};

export default AnalystExtract;
