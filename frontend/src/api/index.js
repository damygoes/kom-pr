import axios from "axios";
import {
  baseURL,
  userLoginRoute,
  userSignUpRoute,
  likeClimbRoute,
  fetchLikedClimbsRoute,
  deleteLikedClimbRoute,
  fetchRandomClimbRoute,
  updateUserProfileRoute,
} from "../constants/constants";

// ############################
// import { store } from "../app/store";
// const { userReducer } = store.getState();
// const { userData } = userReducer;

// console.log(userData);

// const AUTH_TOKEN = userData.token;
// console.log(AUTH_TOKEN);

// ############################

const API = axios.create({ baseURL: baseURL }); // creating AXIOS instance

// * Interceptor for token

//   API.defaults.headers.common["Authorization-Header"] = `Bearer ${JSON.parse(
//     localStorageToken
//   )}`;
// }

// API.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
//   AUTH_TOKEN
// )}`;

// API.interceptors.request.use((req) => {
//   req.headers.Authorization = `Bearer ${AUTH_TOKEN}`;

//   return req;
// });

// * Users
export const loginUser = (formData) => API.post(userLoginRoute, formData);
export const createNewUser = (formData) => API.post(userSignUpRoute, formData);
export const updateUserInfo = (userID, formData) =>
  API.patch(`${updateUserProfileRoute}${userID}`, formData);

// * Climbs
export const fetchAllClimbs = () => API.get(baseURL);
export const getRandomClimb = () => API.get(fetchRandomClimbRoute);
export const likeClimb = (data) => API.post(likeClimbRoute, data);
export const fetchLikedClimbs = (userId) =>
  API.get(`${fetchLikedClimbsRoute}${userId}`, userId);
export const deleteLikedClimb = (data) =>
  API.delete(`${deleteLikedClimbRoute}${data.climbID}`, { data });
