import * as api from "../api";
import { setClimbs } from "../features/climbsSlice";
import { setRandomClimb } from "../features/randomClimbSlice";

export const fetchClimbs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllClimbs();
    dispatch(setClimbs(data));
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

export const fetchRandomClimb = () => async (dispatch) => {
  try {
    const { data } = await api.getRandomClimb();
    dispatch(setRandomClimb(data));
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

export const likeClimb = (data) => async (dispatch) => {
  try {
    const response = await api.likeClimb(data);
    const result = response.data;
    const resInfo = {
      success: result.success,
      message: result.message,
    };
    return resInfo;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};
export const fetchLikedClimbs = (userId) => async (dispatch) => {
  try {
    const response = await api.fetchLikedClimbs(userId);
    const result = response.data.savedClimbs;
    return result;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

export const deleteLikedClimb = (data) => async (dispatch) => {
  try {
    const response = await api.deleteLikedClimb(data);
    const result = response.data;
    return result;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};
