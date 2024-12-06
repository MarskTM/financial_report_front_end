import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FinancialReportModel } from "../model/financial_report";

// ------------------------------- Slice ---------------------------------
export interface FinancialReportState {
  quarter: number;
  period: number;
  year: number;
  report: FinancialReportModel | null;
}

const initialState: FinancialReportState = {
  quarter: 3,
  period: 4,
  year: 2024,
  report: null,
};

export const financialReportSlice = createSlice({
  name: "financialReport",
  initialState,
  reducers: {
    loadFinancialData: () => {},
    extractFinancialData: (
      state,
      action: PayloadAction<FinancialReportState>
    ) => {
      state.quarter = action.payload.quarter;
      state.period = action.payload.period;
      state.year = action.payload.year;
      state.report = action.payload.report;
    },
  },
});

// Action creators are generated for each case reducer function
export const { extractFinancialData } = financialReportSlice.actions;
export default financialReportSlice.reducer;
