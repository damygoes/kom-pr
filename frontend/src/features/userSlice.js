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
      profile: {
        ftp: 0,
        weight: 0,
        wattPerKilo: 0,
        bikeWeight: 0,
        gender: "",
        location: "",
      },
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
    updateOldUserProfile(state, action) {
      state.userData.user.profile = action.payload;
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

export const { setUser, updateOldUserProfile, resetUser } = userSlice.actions;

export default userSlice.reducer;
