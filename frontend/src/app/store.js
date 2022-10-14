import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filterSlice";
import climbsReducer from "../features/climbsSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    filterReducer,
    climbsReducer,
    userReducer,
  },
});
