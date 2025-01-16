import React, { useEffect, useState } from "react";
import { Upload, Button, Select, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  ReadExcelData,
  CalculateFinancialAnalysis,
  SortByQuarterAndYearASC,
  ConvertFinancialReportData,
} from "@/utils/common";

import {
  FinancialAnalysisModel,
  FinancialState,
  FinancialReportModel,
} from "@/redux/model/financial_report";
import { CompanyReport } from "@/redux/model/company";
import {
  BalanceSheetTable,
  IncomeStatementTable,
  CashFlowTable,
  FinancialExtractAnalysis,
} from "@/components";

import { Tabs } from "antd";
import { notify } from "@/utils/toast";
import type { TabsProps } from "antd";

import * as api from "@/redux/api/financial";
import { RootState } from "@/redux/Store";
import { useSelector, useDispatch } from "react-redux";
import * as reportSlice from "@/redux/slices/report_slice";

import { ProcessFinancialReports } from "@/utils/common";

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

const CompanyTabExtract: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const companyInfo = useSelector((state: RootState) => state.company.company);
  const isClearReportData = useSelector(
    (state: RootState) => state.report.is_clear_data
  );
  const companyReportData = useSelector(
    (state: RootState) => state.report.compnayReport
  );

  const [fileName, setFileName] = useState<string>("");
  const [formValues, setFormValues] = useState({
    quarter: "Q1",
    numPeriods: 4,
    unitConcurrency: "Triệu đồng",
    reportYear: "2024",
  });

  // ----------------------------------------------------------------
  const [reportData, setReportData] = useState<FinancialReportModel[]>();

  const [financialReportDataDraw, setFinancialReportDataDraw] =
    useState<FinancialState | null>(null);

  const [financialAnalysis, setFinancialAnalysis] = useState<{
    [year: string]: FinancialAnalysisModel;
  } | null>(null);

  const [tabItems, setTabItems] = useState<NonNullable<TabsProps["items"]>>([]);

  const handleFormValueChange = (updatedFields: Partial<typeof formValues>) => {
    setFormValues((prevValues) => {
      const newValues = { ...prevValues, ...updatedFields };
      return newValues;
    });
  };

  console.log("companyInfo: ", companyInfo);
  console.log("companyInfo.Company_report: ", companyInfo.Company_report);
  const handelSaveToHistory = async () => {
    if (reportData === undefined || !reportData) {
      notify("warning", "Vui lòng cung cấp dữ liệu phân tích của bạn!");
      return;
    }
    // console.log("companyInfo.Company_report?.id: ",companyInfo?.Company_report);
    try {
      const companyReport: CompanyReport = {
        id: companyInfo?.Company_report?.id,
        company_id: companyInfo.id,
        name: fileName,
        category: "company_reports",
        date: new Date(),
      };
      const companyReportID = await api.UpsertCompanyReport(
        companyReport,
        dispatch
      );

      const mapReportData = reportData?.map((report) => {
        return {
          ...report,
          company_report_id: companyReportID,
        };
      });

      await api.UpsertReportData(mapReportData, dispatch);

      console.log("handel save to history: ", reportData);
    } catch (err) {
      console.error("Lỗi khi lưu trữ báo cáo:", err);
    }
  };

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
        setFinancialReportDataDraw(dataDraw);

        let financialAnalysisData = CalculateFinancialAnalysis(
          { ...dataDraw },
          StockPriceMap,
          OutstandingSharesMap
        );
        financialAnalysisData = SortByQuarterAndYearASC(financialAnalysisData);
        setFinancialAnalysis(financialAnalysisData);

        // Thêm dữ liệu của fiancialAnalysis vào để lưu
        let newFinancialReport = dataSheet.financialReport
          .filter((report) => report.quarter != undefined) // Lọc các phần tử hợp lệ
          .map<FinancialReportModel>((report) => {
            const newData: FinancialReportModel = {
              ...report,
              ...(financialAnalysisData[report.quarter!] || {}), // Đảm bảo không có undefined
            };
            return newData;
          });

        setReportData(newFinancialReport);

        console.log("Dữ liệu Balance Sheet:", newFinancialReport);
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
      financialReportDataDraw &&
      ConvertFinancialReportData(financialReportDataDraw, conversionUnit);

    if (isClearReportData) {
      setFinancialReportDataDraw(null);
      dispatch(reportSlice.finished());
    }

    setTabItems([
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
        label: "Chỉ số sức khỏe",
        children: (
          <div>
            <FinancialExtractAnalysis
              data={financialAnalysis}
              unit={formValues.unitConcurrency}
              maxCol={formValues.numPeriods}
              quarter={formValues.quarter}
              reportYear={formValues.reportYear}
              pageName="system-company-extract"
            />
          </div>
        ),
      },
    ]);
  }, [
    financialReportDataDraw,
    financialAnalysis,
    formValues,
    isClearReportData,
  ]);

  useEffect(() => {
    let listReportData = companyReportData?.reports
      ? companyReportData.reports
      : [];
    let currentCompanyReportDataDraw = ProcessFinancialReports(listReportData);
    console.log(
      "currentCompanyReportDataDraw.Ananlyst: ",
      currentCompanyReportDataDraw.financialAnalyst
    );
    console.log("currentCompanyReportDataDraw: ", currentCompanyReportDataDraw);
    setReportData(companyReportData?.reports || []);
    setFinancialReportDataDraw({
      ...currentCompanyReportDataDraw,
    } as FinancialState);
    setFinancialAnalysis(currentCompanyReportDataDraw.financialAnalyst);
  }, [companyReportData]);

  return (
    <div className="w-screen min-h-full bg-slate-100 relative overflow-y-scroll">
      {/* Page Content */}
      <div className="h-full z-40">
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
            <div className="ml-auto w-80 flex flex-row items-center justify-between">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} className="w-48">
                  <span className="direction-rtl block truncate">
                    {fileName || "Cập nhật dữ liệu"}
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

export default CompanyTabExtract;

// =================================================================
