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
export const userLogin = async () => {
  const response = await axios.get("https://www.strava.com/api/v3/athlete", {
    Authorization: "Bearer 1cb5328a06c75f771c184e2e92f0a4fa50ba670d",
  });

  console.log(response);
};
