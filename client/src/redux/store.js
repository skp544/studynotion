import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import profileSlice from "./slices/profileSlice";
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  cart: cartSlice,
});

export default configureStore({ reducer: rootReducer });
