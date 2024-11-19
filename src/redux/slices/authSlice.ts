import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// ------------------------------- Model type ---------------------------------
export interface User {
  id: string;
  username: string;
  role: string[];
}

export interface Credentials {
    username: string;
    password: string;
}

// ------------------------------- Slice ---------------------------------
export interface AuthState {
  users: User;
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
        login: (state: Credentials) => {{
            async 
        }}
    },
})

