import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice.ts";

export const store = configureStore({
  reducer: {
    app: appReducer, // Add your app slice here

  },
});
export type RootState = ReturnType<typeof store.getState>; // Global state type
export type AppDispatch = typeof store.dispatch; // Dispatch type
