import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../model/profile';
import * as Model from '../model';

// ------------------------------- Slice ---------------------------------
export interface AuthState {
	is_fetching: boolean;
	users: Model.User;
	profile: Profile;
}

const initialState: AuthState = {
	is_fetching: false,
	users: {
		id: 0,
		username: '',
		role: '',
	},
	profile: {} as Profile,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		success: (state, action: PayloadAction<Model.User>) => {
			state.is_fetching = false;
			state.users = action.payload;
		},

		loadProfile: (state, action: PayloadAction<Profile>) => {
			state.profile = {
				...state.profile,
                ...action.payload,
			};
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
				id: 0,
				username: '',
				role: '',
			};
		},
	},
});

// Action creators are generated for each case reducer function
export const { loadProfile, success, pending, failure, clear } = authSlice.actions;
export default authSlice.reducer;
