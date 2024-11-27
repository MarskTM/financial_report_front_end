import { FinancialReport } from './../model/index';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Model from "../model";

// ------------------------------- Slice ---------------------------------
export interface FinancialReportState {
  users: Model.User;
}

const initialState: FinancialReportState = {
	users: {
		id: '',
		username: '',
		role: [],
	},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getDetail: (state, action: PayloadAction<Model.FinancialReport>) => {},

    getList: () => {},

    updateLoad: () => {},

    delete: () => {},
  },
});

// Action creators are generated for each case reducer function
export const { getDetail, getList, updateLoad } = authSlice.actions;
export default authSlice.reducer;