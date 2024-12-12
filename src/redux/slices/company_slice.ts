import { CompanyInfo } from "@/redux/model/company";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Model from "../model";

// ------------------------------- Slice ---------------------------------
export interface CompanyState {
  is_loading: boolean;
  company: CompanyInfo;
  listCompany: CompanyInfo[];
}

const initialState: CompanyState = {
  is_loading: false,
  listCompany: [],
  company: {} as CompanyInfo,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    success: (state, action: PayloadAction<CompanyInfo>) => {
      state.is_loading = false;
      state.company = action.payload;
    },

    getListSuccess: (state, action: PayloadAction<CompanyInfo[]>) => {
      state.is_loading = false;
      state.listCompany = [...state.listCompany, ...action.payload];
    },

    pending: (state) => {
      state.is_loading = true;
    },

    failure: (state) => {
      state.is_loading = false;
    },

    clear: (state) => {
      state.is_loading = false;
      state.company = {} as CompanyInfo;
      state.listCompany = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { success, getListSuccess, pending, failure, clear } =
  companySlice.actions;
export default companySlice.reducer;
