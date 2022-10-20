// All API functions go here
import axios from "axios";

// * CLIMBS
export const fetchClimbs = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}`);
  return data;
};

export const fetchRandomClimb = async (user) => {
  const config = {
    headers: {
      Authorization: user.token,
    },
  };
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_URL}random`,
    config
  );
  return data;
};

// * ################################

// * SAVED CLIMBS
export const saveOneClimb = async (data) => {
  const { climbID, user } = data;
  const config = {
    headers: {
      Authorization: user.token,
    },
  };
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_SAVE_ONE_CLIMB_ROUTE}`,
      {
        userID: user.id,
        climbID,
      },
      config
    );
    return data;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

export const fetchSavedClimbs = async (user) => {
  const config = {
    headers: {
      Authorization: user.token,
    },
  };

  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_URL}savedClimbs`,
    config
  );
  return data;
};

export const deleteOneSavedClimb = async (climbID, user) => {
  const config = {
    headers: {
      Authorization: user.token,
    },
  };

  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}savedClimbs/${climbID}`,
      config
    );
    return data;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};
// * ################################

// * USERS
export const userLogin = async (user) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_USER_LOGIN_ROUTE}`,
      {
        email: user.email,
        password: user.password,
      }
    );
    return data;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

export const registerUser = async (newUser) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_USER_SIGNUP_ROUTE}`,
      {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      }
    );
    return data;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

export const updateUserProfile = async (userID, userData) => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}user/${userID}`,
      { userData }
    );
    return data;
  } catch (error) {
    const errorObject = error.response.data;
    return errorObject;
  }
};

// * ################################
