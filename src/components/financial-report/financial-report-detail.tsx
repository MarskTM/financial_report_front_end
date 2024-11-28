import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableFinancialReport } from "@/components/";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/Store";
import { } from "@/redux/slices/report_slice";

type Props = {};

const FinancialReportDetail: React.FC<Props> = () => {
  


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

        {/* Bảng cân đối kế toán */}
        <TabsContent value="balance-sheet" className="space-y-4">
          <TableFinancialReport tabName="balance-sheet" />
        </TabsContent>

        <TabsContent value="income-statement" className="space-y-4">
          <TableFinancialReport tabName="income-statement" />
        </TabsContent>

        <TabsContent value="cash-flow" className="space-y-4">
          <TableFinancialReport tabName="cash-flow" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReportDetail;
