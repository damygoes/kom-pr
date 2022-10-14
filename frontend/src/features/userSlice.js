import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    success: false,
    user: {
      admin: false,
      avatar: "",
      email: "",
      id: "",
      username: "",
      token: "",
    },
  },
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    resetUser(state, action) {
      state.userData = {
        success: false,
        user: {
          admin: false,
          avatar: "",
          email: "",
          id: "",
          username: "",
          token: "",
        },
      };
    },
  },
});

export const { setUser, getUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
