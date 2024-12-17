import { createSlice } from '@reduxjs/toolkit';
import { UserReport, CompanyReport } from '../model';
import type { PayloadAction } from '@reduxjs/toolkit';

// ------------------------------- Slice ---------------------------------
export interface FinancialReportState {
	is_fetching: boolean;
  userReport: UserReport | null;
	historyReport: UserReport[] | null;
	compnayReport: CompanyReport | null;
}

const initialState: FinancialReportState = {
	is_fetching: false,
	historyReport: null,
	compnayReport: null,
  userReport: null,
};

export const financialReportSlice = createSlice({
	name: 'financialReport',
	initialState,
	reducers: {
		responeUpsert: (state, payload: PayloadAction<UserReport>) => {
      state.userReport = payload.payload
    },

		getHistoryReport: () => {},

		pending: (state) => {
			state.is_fetching = true;
		},

		finished: (state) => {
			state.is_fetching = false;
		},

		clear: (state) => {
			state.is_fetching = false;
			state.historyReport = null;
			state.compnayReport = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { responeUpsert, getHistoryReport, pending, finished, clear } =
	financialReportSlice.actions;
export default financialReportSlice.reducer;
