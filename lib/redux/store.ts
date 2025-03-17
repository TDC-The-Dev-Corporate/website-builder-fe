import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { templateReducer } from "./slices/templatesSlice";
import { portfolioReducer } from "./slices/portfolioSlice";
import { authReducer } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    templates: templateReducer,
    portfolio: portfolioReducer,
    auth: authReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Optional: Define a type for thunks if needed elsewhere in your app
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
