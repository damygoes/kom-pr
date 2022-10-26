import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formStatus: false,
};

const loginFormSlice = createSlice({
  name: "formReducer",
  initialState,
  reducers: {
    setFormStatus(state, action) {
      state.formStatus = action.payload;
    },
  },
});

export const { setFormStatus } = loginFormSlice.actions;

export default loginFormSlice.reducer;
