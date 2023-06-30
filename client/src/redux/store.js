import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import profileSlice from "./slices/profileSlice";
import authSlice from "./slices/authSlice";
import courseSlice from "./slices/courseSlice";
import viewCourseSlice from "./slices/viewCourseSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  cart: cartSlice,
  course: courseSlice,
  viewCourse: viewCourseSlice,
});

export default configureStore({ reducer: rootReducer });
