import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  About,
  Contact,
  Dashboard,
  Error,
  ForgotPassword,
  Home,
  Login,
  Signup,
  UpdatePassword,
  VerifyEmail,
} from "./pages";
import {
  AddCourse,
  Cart,
  EnrolledCourses,
  MyProfile,
  Navbar,
  OpenRoute,
  PrivateRoute,
  Setting,
} from "./components";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Setting />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="/dashboard/add-course" element={<AddCourse />} />
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
