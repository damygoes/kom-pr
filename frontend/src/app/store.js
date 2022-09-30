import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filterSlice";
import climbsReducer from "../features/climbsSlice";

export const store = configureStore({
  reducer: {
    filterReducer,
    climbsReducer,
  },
});
