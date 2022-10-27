import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  userData: {
    admin: false,
    avatar: "",
    email: "",
    id: "",
    firstName: "",
    lastName: "",
    token: "",
    ftp: 0,
    weight: 0,
    wattPerKilo: 0,
    bikeWeight: 0,
    gender: "",
    location: "",
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
      state.success = false;
      state.userData = {
        admin: false,
        avatar: "",
        email: "",
        id: "",
        firstName: "",
        lastName: "",
        token: "",
        ftp: 0,
        weight: 0,
        wattPerKilo: 0,
        bikeWeight: 0,
        gender: "",
        location: "",
      };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
