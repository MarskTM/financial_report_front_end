import { createSlice } from "@reduxjs/toolkit";
import { UserReport, CompanyReport, FinancialReportModel } from "../model";
import type { PayloadAction } from "@reduxjs/toolkit";

// ------------------------------- Slice ---------------------------------
export interface FinancialReportState {
  is_fetching: boolean;
  is_clear_data: boolean;
  userReport: UserReport;
  historyReport: UserReport[];
  compnayReport: CompanyReport;
}

const initialState: FinancialReportState = {
  is_fetching: false,
  is_clear_data: false,
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
    upsertCompanyReport: (state, payload: PayloadAction<CompanyReport>) => {
      state.compnayReport = payload.payload;
    },

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
      state.is_clear_data = false;
    },

    clear: (state) => {
      state.is_fetching = true;
      state.is_clear_data = true;
      state.historyReport = [];
      state.compnayReport = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  upsertCompanyReport,
  upsertUserReport,
  upsertUserReportData,
  getHistoryReport,
  pending,
  finished,
  clear,
} = financialReportSlice.actions;
export default financialReportSlice.reducer;
