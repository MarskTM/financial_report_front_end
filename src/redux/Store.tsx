import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    company: companyReducer,
    job: JobSlice,
    recuritment: recuritmentSlice,
    evaluate: evaluateSlice,
    interShip: interShipSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
