import { configureStore } from "@reduxjs/toolkit";
import financialReportReducer from "./slices/report_slice";
import authenReducer from "./slices/auth_slice";

export const store = configureStore({
  reducer: {
    auth: authenReducer,  
    report: financialReportReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
