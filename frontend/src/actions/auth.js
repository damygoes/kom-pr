import * as api from "../api";
import { setUser } from "../features/userSlice";

// * USERS
export const userLogin = (formData) => async (dispatch) => {
  try {
    const response = await api.loginUser(formData);
    const user = response.data.user;
    dispatch(setUser(user));
    // axios.defaults.headers.common["Authorization"] = data.user.token;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    const response = await api.createNewUser(formData);
    const userProfile = response.data.user;
    dispatch(setUser(userProfile));
    // axios.defaults.headers.common["Authorization"] = data.user.token;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

export const updateUserProfile = (userID, formData) => async (dispatch) => {
  try {
    const response = await api.updateUserInfo(userID, formData);
    let newUserInfo = response.data.updatedUserProfile;
    return {
      message: response.data.message,
      success: response.data.success,
      newUserInfo,
    };
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};
