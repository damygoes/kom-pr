// All API functions go here
import axios from "axios";

export const fetchClimbs = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}`);
  return data;
};
export const fetchRandomClimb = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}random`);
  return data;
};
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
    // const { success } = errorObject;
    return errorObject;
    // console.log(success);
  }
};
