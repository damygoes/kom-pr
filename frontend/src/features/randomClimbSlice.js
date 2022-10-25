import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  randomClimb: [],
};

const randomClimbSlice = createSlice({
  name: "randomClimbReducer",
  initialState,
  reducers: {
    setRandomClimb(state, action) {
      state.randomClimb = action.payload;
    },
  },
});

export const { setRandomClimb } = randomClimbSlice.actions;

export default randomClimbSlice.reducer;
