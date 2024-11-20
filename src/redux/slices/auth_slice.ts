import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Model from "../model";

// ------------------------------- Slice ---------------------------------
export interface AuthState {
  users: Model.User;
}

const initialState: AuthState = {
    users: {
      id: "",
      username: "",
      role: [],
    },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Model.Credentials>) => {
      
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = authSlice.actions;
export default authSlice.reducer;