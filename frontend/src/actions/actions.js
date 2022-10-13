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
  const response = await axios.post(
    `${process.env.REACT_APP_STRAVA_AUTH_URL}?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&client_secret=${process.env.REACT_APP_STRAVA_CLIENT_SECRET}&code=${process.env.REACT_APP_STRAVA_URL_CODE}&grant_type=authorization_code`,
    {
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "*",
      },
    }
  );

  console.log(response);
};
