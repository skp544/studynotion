import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import profileSlice from "./slices/profileSlice";
import authSlice from "./slices/authSlice";
import courseSlice from "./slices/courseSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  cart: cartSlice,
  course: courseSlice,
});

export default configureStore({ reducer: rootReducer });
