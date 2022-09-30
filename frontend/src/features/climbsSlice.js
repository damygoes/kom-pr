import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  climbs: [],
};

const climbsSlice = createSlice({
  name: "climbsReducer",
  initialState,
  reducers: {
    setClimbs(state, action) {
      state.climbs = action.payload;
    },
  },
});

export const { setClimbs } = climbsSlice.actions;

export default climbsSlice.reducer;
