import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const hotelsSlice = createSlice({
  name: "hotelsReducer",
  initialState,
  reducers: {
    setHotels(state, action) {
      state.hotels = action.payload;
    },
  },
});

export const { setHotels } = hotelsSlice.actions;

export default hotelsSlice.reducer;
