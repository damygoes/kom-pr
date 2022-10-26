import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    message: "",
    status: "",
  },
};

const notificationSlice = createSlice({
  name: "notificationReducer",
  initialState,
  reducers: {
    onProfileUpdate(state, action) {
      state.info = action.payload;
    },
    onAuth(state, action) {
      state.info = action.payload;
    },
    onClimbSave(state, action) {
      state.info = action.payload;
    },
  },
});

export const { onProfileUpdate, onAuth, onClimbSave } =
  notificationSlice.actions;

export default notificationSlice.reducer;
