import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formStatus: false,
};

const loginFormSlice = createSlice({
  name: "formReducer",
  initialState,
  reducers: {
    showForms(state, action) {
      state.formStatus = action.payload;
    },
  },
});

export const { showForms } = loginFormSlice.actions;

export default loginFormSlice.reducer;
