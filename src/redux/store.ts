import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice.ts";
import journalReducer from "./journalSlice.ts";

export const store = configureStore({
  reducer: {
    app: appReducer, 
    journal: journalReducer, 

  },
});
export type RootState = ReturnType<typeof store.getState>; // Global state type
export type AppDispatch = typeof store.dispatch; // Dispatch type
