import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FinancialReportModel } from "../model/financial_report";

// ------------------------------- Slice ---------------------------------
export interface FinancialReportState {
  is_fetching: boolean;
  quarter: number;
  period: number;
  year: number;
  report: FinancialReportModel | null;
}

const initialState: FinancialReportState = {
  is_fetching: false,
  quarter: 3,
  period: 4,
  year: 2024,
  report: null,
};

export const financialReportSlice = createSlice({
  name: "financialReport",
  initialState,
  reducers: {
    getHistoryReport: () => {},

    pending: (state) => {
      state.is_fetching = true;
    },

    failure: (state) => {
      state.is_fetching = false;
    },

    clear: (state) => {
      state.is_fetching = false;
      state.report = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pending, failure, clear } = financialReportSlice.actions;
export default financialReportSlice.reducer;
