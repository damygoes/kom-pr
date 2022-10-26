import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import filterReducer from "../features/filterSlice";
import climbsReducer from "../features/climbsSlice";
import userReducer from "../features/userSlice";
import hotelsReducer from "../features/hotelsSlice";
import formReducer from "../features/loginFormSlice";
import randomClimbReducer from "../features/randomClimbSlice";
import notificationReducer from "../features/notificationSlice";

const persistConfig = {
  key: "root",
  storage,
  // if you do not want to persist this part of the state
  blacklist: ["hotelsReducer", "formReducer"],
};

const rootReducer = combineReducers({
  userReducer,
  climbsReducer,
  filterReducer,
  // not persisting these reducers
  formReducer,
  hotelsReducer,
  randomClimbReducer,
  notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
