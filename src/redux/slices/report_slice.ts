import { createSlice } from "@reduxjs/toolkit";
import { UserReport, CompanyReport, FinancialReportModel } from "../model";
import type { PayloadAction } from "@reduxjs/toolkit";

// ------------------------------- Slice ---------------------------------
export interface FinancialReportState {
  is_fetching: boolean;
  userReport: UserReport;
  historyReport: UserReport[];
  compnayReport: CompanyReport;
}

const initialState: FinancialReportState = {
  is_fetching: false,
  historyReport: [],
  compnayReport: {},
  userReport: {
    id: 0,
    name: "",
    reports: [],
  },
};

export const financialReportSlice = createSlice({
  name: "financialReport",
  initialState,
  reducers: {
    upsertUserReport: (state, payload: PayloadAction<UserReport>) => {
      state.userReport = payload.payload;
    },

    upsertUserReportData: (
      state,
      payload: PayloadAction<FinancialReportModel[]>
    ) => {
      state.userReport.reports = payload.payload || [];
    },

    getHistoryReport: (state, payload: PayloadAction<UserReport[]>) => {
      state.historyReport = payload.payload;
    },

    pending: (state) => {
      state.is_fetching = true;
    },

    finished: (state) => {
      state.is_fetching = false;
    },

    clear: (state) => {
      state.is_fetching = false;
      state.historyReport = [];
      state.compnayReport = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  upsertUserReport,
  upsertUserReportData,
  getHistoryReport,
  pending,
  finished,
  clear,
} = financialReportSlice.actions;
export default financialReportSlice.reducer;
