import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Model from "../model";

// ------------------------------- Slice ---------------------------------
export interface NewsState {
  list: Model.News[],
}

const initialState: NewsState = {
    list: [],
};

export const newsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getNews: (state) => {},
    updateNews: (state, payload: PayloadAction) => {},
    removeNews: (state, payload: PayloadAction) => {},
  },
});

// Action creators are generated for each case reducer function
export const { getNews, updateNews, removeNews } = newsSlice.actions;
export default newsSlice.reducer;