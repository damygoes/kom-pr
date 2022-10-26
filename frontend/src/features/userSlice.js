import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    success: false,
    admin: false,
    avatar: "",
    email: "",
    id: "",
    firstName: "",
    lastName: "",
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
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
      state.success = true;
    },
    resetUser(state, action) {
      state.userData = {
        success: false,
        admin: false,
        avatar: "",
        email: "",
        id: "",
        firstName: "",
        lastName: "",
        token: "",
        profile: {
          ftp: 0,
          weight: 0,
          wattPerKilo: 0,
          bikeWeight: 0,
          gender: "",
          location: "",
        },
      };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
