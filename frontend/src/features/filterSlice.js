import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterQuery: "",
  filterDirection: "",
  country: "",
};

const filterSlice = createSlice({
  name: "filterReducer",
  initialState,
  reducers: {
    setFilterQuery(state, action) {
      state.filterQuery = action.payload;
    },
    setFilterDirection(state, action) {
      if (action.payload === true) {
        state.filterDirection = "desc";
      }
      if (action.payload === false) {
        state.filterDirection = "asc";
      }
    },
    setCountry(state, action) {
      state.country = action.payload;
    },
    resetFilters(state, action) {
      return initialState;
    },
  },
});

export const { setFilterQuery, setFilterDirection, setCountry, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
