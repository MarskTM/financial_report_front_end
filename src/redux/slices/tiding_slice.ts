import { createSlice } from "@reduxjs/toolkit";
import { TidingModel } from "../model";
import type { PayloadAction } from "@reduxjs/toolkit";

// ------------------------------- Slice ---------------------------------
export interface TidingState {
  is_fetching: boolean;
  is_clear_data: boolean;
}

const initialState: TidingState = {
  is_fetching: false,
  is_clear_data: false,
  // tidingList: [] as TidingModel[], // You can add other properties for your tiding model here. For example, tidingList: TidingModel[] = []; or tidingList: TidingModel[] | undefined = undefined;
};

export const tidingSlice = createSlice({
  name: "tidingReport",
  initialState,
  reducers: {
    pending: (state) => {
      state.is_fetching = true;
    },

    finished: (state) => {
      state.is_fetching = false;
      state.is_clear_data = false;
    },

    clear: (state) => {
      state.is_fetching = true;
    },

    InsertTiding: (state) => {
      state.is_fetching = true;
    },

    // setListTiding: (state, payload: PayloadAction<TidingModel>) => {
    //   state.is_clear_data = true;
    //   state.is_fetching = false;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {} = tidingSlice.actions;
export default tidingSlice.reducer;
