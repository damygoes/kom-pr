import * as api from "../api";
import { setUser } from "../features/userSlice";

// * USERS
export const userLogin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(formData);
    dispatch(setUser(data.user));
    // axios.defaults.headers.common["Authorization"] = data.user.token;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createNewUser(formData);
    dispatch(setUser(data.user));
    // axios.defaults.headers.common["Authorization"] = data.user.token;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

export const updateUserProfile = (userID, formData) => async (dispatch) => {
  try {
    const response = await api.updateUserInfo(userID, formData);
    let profile = response.data.updatedUserProfile.profile;
    return {
      message: response.data.message,
      success: response.data.success,
      profile: profile,
    };
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};
