import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    message: "",
    success: false,
    token: "",
  },
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    resetUser(state, action) {
      state.user = {
        message: "",
        success: false,
        token: "",
      };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
