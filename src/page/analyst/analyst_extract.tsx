import { Header, SidebarMenu, FinancialChartOverview } from "@/components";

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { notify } from "@/utils/toast";

import React, { useEffect, useState } from "react";
import { Upload, Button, Select, Form } from "antd";
import { SaveFilled, UploadOutlined } from "@ant-design/icons";
import {
  ReadExcelData,
  CalculateFinancialAnalysis,
  SortByQuarterAndYearASC,
  ConvertModel,
  ConvertFinancialReportData,
} from "@/utils/common";

// ---------------------------------------------------------------------------------------------------------------
import {
  BalanceSheetTable,
  IncomeStatementTable,
  CashFlowTable,
  FinancialExtractAnalysis,
} from "@/components";

// ------------------------------------------- Declear Model -----------------------------------------------------
import { BalanceSheetModel } from "@/redux/model/balance_sheet";
import { CashFlowModel } from "@/redux/model/cash_flow";
import { IncomeStatementModel } from "@/redux/model/income_statement";
import {
  FinancialReportModel,
  FinancialAnalysisModel,
} from "@/redux/model/financial_report";

interface Props {}

// Stock price map theo từng quý
const StockPriceMap: { [quarter: string]: number } = {
  "Q1 2023": 39884.95970441841,
  "Q2 2023": 39209.58776566245,
  "Q3 2023": 40603.824651699346,
  "Q4 2023": 39212.253015420116,
  "Q1 2024": 49636.4406779661,
  "Q2 2024": 48162.903225806454,
  "Q3 2024": 48467.2131147541,
  "Q4 2024": 47841.0,
};

const OutstandingSharesMap: { [year: string]: number } = {
  "Q1 2023": 1261588,
  "Q2 2023": 953709,
  "Q3 2023": 1688125,
  "Q4 2023": 948285,
  "Q1 2024": 1908024,
  "Q2 2024": 1744915,
  "Q3 2024": 2415880,
  "Q4 2024": 1981210,
};

const quarterOptions = ["Q1", "Q2", "Q3", "Q4"];
const NumPeriods = [1, 2, 3, 4, 5];
const unitConcurrency = ["Đồng", "Triệu đồng", "Tỉ đồng"];
const reportYears = ["2023", "2024"];
const systemTypeAnalysis = [
  "Sử dụng bộ dữ liệu cá nhân",
  "Sử dụng bộ dữ liệu của hệ thống",
];

const AnalystExtract: React.FC<Props> = ({}) => {
  const [fileName, setFileName] = useState<string>("");
  const [formValues, setFormValues] = useState({
    quarter: "Q1",
    numPeriods: 4,
    unitConcurrency: "Triệu đồng",
    reportYear: "2024",
    systemTypeAnalyst: "Sử dụng bộ dữ liệu cá nhân",
  });

  const [tabItems, setTabItems] = useState<NonNullable<TabsProps["items"]>>([]);

  const handleFormValueChange = (updatedFields: Partial<typeof formValues>) => {
    setFormValues((prevValues) => {
      const newValues = { ...prevValues, ...updatedFields };
      return newValues;
    });
  };

  // ----------------------------------------------------------------
  const [reportData, setReportData] = useState<FinancialReportModel[]>();

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

  const [financialAnalysis, setFinancialAnalysis] = useState<{
    [year: string]: FinancialAnalysisModel;
  } | null>(null);

  const uploadProps = {
    beforeUpload: async (file: File) => {
      // Cập nhật tên file và ngăn chặn upload tự động
      setFileName(file.name);
      try {
        let dataSheet = await ReadExcelData(file);
        const dataDraw = {
          balanceSheet: SortByQuarterAndYearASC(dataSheet?.balanceSheet),
          cashFlow: SortByQuarterAndYearASC(dataSheet?.cashFlow),
          incomeStatement: SortByQuarterAndYearASC(dataSheet?.incomeStatement),
        };

        setReportData(dataSheet.financialReport);
        setFinancialReportData(dataDraw);

        let financialAnalysisData = CalculateFinancialAnalysis(
          { ...dataDraw },
          StockPriceMap,
          OutstandingSharesMap
        );

        financialAnalysisData = SortByQuarterAndYearASC(financialAnalysisData);
        setFinancialAnalysis(financialAnalysisData);

        console.log("Dữ liệu Balance Sheet:", dataDraw);
      } catch (error) {
        console.error("Lỗi khi đọc dữ liệu:", error);
      }

      return false; // Ngăn upload tự động
    },

    showUploadList: false, // Ẩn danh sách file upload
  };

  useEffect(() => {
    const conversionUnit =
      formValues.unitConcurrency === "Đồng"
        ? "dong"
        : formValues.unitConcurrency === "Triệu đồng"
        ? "trieu"
        : formValues.unitConcurrency === "Tỉ đồng"
        ? "ty"
        : "nghin_ty";

    let data =
      financialReportData &&
      ConvertFinancialReportData(financialReportData, conversionUnit);

    setTabItems([
      // {
      // 	key: 'report_chart',
      // 	label: 'Biểu đồ',
      // 	children: (
      // 		<div>
      // 			<FinancialChartOverview />
      // 		</div>
      // 	),
      // },
      {
        key: "1",
        label: "Bảng cân đối kế toán",
        children: (
          <div>
            <BalanceSheetTable
              data={data?.balanceSheet ?? null}
              maxCol={formValues.numPeriods}
            />
          </div>
        ),
      },
      {
        key: "2",
        label: "Báo cáo kết quả kinh doanh",
        children: (
          <IncomeStatementTable
            data={data?.incomeStatement ?? null}
            maxCol={formValues.numPeriods}
          />
        ),
      },
      {
        key: "3",
        label: "Báo cáo lưu chuyển tiền tệ",
        children: (
          <CashFlowTable
            data={data?.cashFlow ?? null}
            maxCol={formValues.numPeriods}
          />
        ),
      },
      {
        key: "4",
        label: "Chỉ số tài chính",
        children: (
          <div>
            <FinancialExtractAnalysis
              data={financialAnalysis}
              unit={formValues.unitConcurrency}
              maxCol={formValues.numPeriods}
              quarter={formValues.quarter}
              reportYear={formValues.reportYear}
              pageName="user-extract"
            />
          </div>
        ),
      },
      {
        key: "5",
        label: "So Sánh Doanh Nghiệp",
        children: <div></div>,
      },
      {
        key: "6",
        label: "Dự Đoán",
        children: <div></div>,
      },
    ]);
  }, [financialReportData, formValues]);

  const handelSaveToHistory = () => {
    if (financialReportData === null) {
      notify("warning", "Vui lòng cung cấp dữ liệu phân tích của bạn!");
    }
    console.log("handel save to history: ", reportData);
  };

  //   useEffect(() => {
  //     // const conversionUnit =
  //     // 	formValues.unitConcurrency === 'Triệu đồng'
  //     // 		? 'trieu'
  //     // 		: formValues.unitConcurrency === 'Tỉ đồng'
  //     // 		? 'ty'
  //     // 		: 'nghin_ty';

  //     // const convertedFinancialReport = ConvertFinancialReportData(
  //     // 	financialReportData,
  //     // 	conversionUnit,
  //     // );
  //     // setFinancialReportData(convertedFinancialReport);

  //     console.log(formValues);
  //   }, [formValues]);

  return (
    <div className="w-screen min-h-full bg-slate-100 relative overflow-y-scroll">
      <div className="w-[83%] fixed top-3 left-72 pl-2 z-50">
        <Header />
      </div>

      {/* Navbar Position */}
      <div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
        <SidebarMenu defaultLink="/home/Analyst" />
      </div>

      {/* Page Content */}
      <div className="w-[83%] h-full pt-28 mb-10 ml-72 pl-2 z-40">
        <div className="flex flex-row">
          <Form
            layout="inline"
            initialValues={formValues}
            onValuesChange={handleFormValueChange}
            style={{
              padding: "20px",
            }}
            className="w-full bg-slate-300/90 flex flex-row"
          >
            <Form.Item label="Quý" name="quarter">
              <Select
                placeholder="Chọn quý"
                defaultValue={quarterOptions[2]}
                options={quarterOptions.map((quarter) => ({
                  label: quarter,
                  value: quarter,
                }))}
              />
            </Form.Item>
            <Form.Item label="Năm" name="reportYear">
              <Select
                placeholder="Chọn năm"
                style={{ width: 100 }}
                defaultValue={reportYears[1]}
                options={reportYears.map((quarter) => ({
                  label: quarter,
                  value: quarter,
                }))}
              />
            </Form.Item>

            <Form.Item label="Số Kỳ" name="numPeriods">
              <Select
                placeholder="Chọn số kỳ"
                defaultValue={NumPeriods[3]}
                options={NumPeriods.map((num) => ({
                  label: `${num}`,
                  value: num,
                }))}
              />
            </Form.Item>

            <Form.Item label="Đơn Vị Tiền Tệ" name="unitConcurrency">
              <Select
                placeholder="Chọn đơn vị"
                defaultValue={unitConcurrency[1]}
                style={{ width: 120 }}
                options={unitConcurrency.map((unit) => ({
                  label: unit,
                  value: unit,
                }))}
              />
            </Form.Item>
            <Form.Item label="Dữ liệu" name="systemTypeAnalysis">
              <Select
                placeholder="Mô tả bộ dữ liệu"
                defaultValue={systemTypeAnalysis[0]}
                style={{ width: 250 }}
                options={systemTypeAnalysis.map((type) => ({
                  label: type,
                  value: type,
                }))}
                onChange={(value) => {
                  if (value === systemTypeAnalysis[1]) {
                    alert(
                      "Lưu ý: Với phương thức này hệ thống sẽ điền dữ liệu của mình vào những quý bị thiếu trong dữ liệu ban đăng tải"
                    );
                  }
                }}
              />
            </Form.Item>
            <div className="ml-auto w-80 flex flex-row items-center justify-between">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} className="w-48">
                  <span className="direction-rtl block truncate">
                    {fileName || "Phân Tích Báo Cáo"}
                  </span>
                </Button>
              </Upload>

              <Button type="primary" onClick={handelSaveToHistory}>
                Lưu Phân Tích
              </Button>
            </div>
          </Form>
        </div>
        <div className="mt-10">
          {<Tabs items={tabItems} defaultActiveKey="1" />}
        </div>
      </div>
    </div>
  );
};

export default AnalystExtract;

// =================================================================
