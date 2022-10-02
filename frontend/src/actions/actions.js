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
