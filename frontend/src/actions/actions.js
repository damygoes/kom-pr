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

// * HOTELS SEARCH
export const getNearbyHotels = async (climbCoordinates, formData) => {
  const config = {
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
      "X-RapidAPI-Host": `${process.env.REACT_APP_RAPID_API_HOST}`,
    },
    params: {
      latitude: climbCoordinates.latitude,
      longitude: climbCoordinates.longitude,
      checkin_date: formData.checkin_date,
      checkout_date: formData.checkout_date,
      currency: formData.currency,
      sort_order: formData.sort_order,
      adults_number: formData.adults_number,
      locale: formData.locale,
    },
  };
  const { data } = await axios.get(
    `${process.env.REACT_APP_HOTELS_URL}`,
    config
  );
  return data;
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
