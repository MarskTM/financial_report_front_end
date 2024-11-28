import { FinancialReport } from "./../model/index";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Model from "../model";

// ------------------------------- Slice ---------------------------------
export interface FinancialReportState {
  quarter: number;
  period: number;
  year: number;
  financial_report: FinancialReport[];
}

const initialState: FinancialReportState = {
  quarter: 3,
  period: 4,
  year: 2024,
  financial_report: [],
};

export const financialReportSlice = createSlice({
  name: "financialReport",
  initialState,
  reducers: {

    loadFinancialData: () => {

    }

    
  },
});

// Action creators are generated for each case reducer function
export const {  } = financialReportSlice.actions;
export default financialReportSlice.reducer;
