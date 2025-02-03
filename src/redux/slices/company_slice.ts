import { CompanyInfo, CompanyManagements } from "@/redux/model/company";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Model from "../model";

// ------------------------------- Slice ---------------------------------
export interface CompanyState {
  is_loading: boolean;
  tab_key: string;
  company: CompanyInfo;
  listCompany: CompanyInfo[];
  insertCompany: CompanyInfo;
}

const initialState: CompanyState = {
  is_loading: false,
  tab_key: "1",
  listCompany: [],
  insertCompany: {
    Company_report: {} as Model.CompanyReport,
  } as CompanyInfo,

  // --------------------------------- Thông tin chi tiết của doanh nghiệp
  company: {} as CompanyInfo,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setStakeHodler: (state, action: PayloadAction<CompanyManagements[]>) => {
      state.company.company_stakeholder = action.payload;
    },

    setCompany: (state, action: PayloadAction<CompanyInfo>) => {
      state.is_loading = false;
      state.company = { ...state.company, ...action.payload }; // Nên merge nếu cần giữ lại các giá trị cũ
    },

    setInsertCompany: (state, action: PayloadAction<CompanyInfo>) => {
      state.is_loading = false;
      state.insertCompany = { ...state.company, ...action.payload }; // Nên merge nếu cần giữ lại các giá trị cũ
    },

    setListSuccess: (state, action: PayloadAction<CompanyInfo[]>) => {
      state.is_loading = false;
      state.listCompany = [...action.payload];
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

    clearCompany: (state) => {
      state.company = {} as CompanyInfo;
    },

    clearInsertCompany: (state) => {
      state.insertCompany = {} as CompanyInfo;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStakeHodler,
  setCompany,
  setListSuccess,
  setInsertCompany,
  pending,
  failure,
  clear,
  clearCompany,
  clearInsertCompany,
} = companySlice.actions;
export default companySlice.reducer;
