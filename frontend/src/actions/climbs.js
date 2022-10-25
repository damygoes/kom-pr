import * as api from "../api";
import { setClimbs } from "../features/climbsSlice";
import { setRandomClimb } from "../features/randomClimbSlice";

export const fetchClimbs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllClimbs();
    console.log(data);
    dispatch(setClimbs(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchRandomClimb = () => async (dispatch) => {
  try {
    const { data } = await api.getRandomClimb();
    console.log(data);
    dispatch(setRandomClimb(data));
  } catch (error) {
    console.log(error.message);
  }
};
