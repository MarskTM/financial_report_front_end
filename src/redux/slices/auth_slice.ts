import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../model/profile";
import * as Model from "../model";

// ------------------------------- Slice ---------------------------------
export interface AuthState {
  is_fetching: boolean;
  users: Model.User;
  profile: Profile;
}

const initialState: AuthState = {
  is_fetching: false,
  users: {
    id: "",
    username: "",
    role: "",
  },
  profile: {} as Profile,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    success: (state, action: PayloadAction<Model.User>) => {
      state.is_fetching = false;
      state.users = action.payload;
    },

    pending: (state) => {
      state.is_fetching = true;
    },

    failure: (state) => {
      state.is_fetching = false;
    },

    clear: (state) => {
      state.is_fetching = false;
      state.users = {
        id: "",
        username: "",
        role: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { success, pending, failure, clear } = authSlice.actions;
export default authSlice.reducer;
