import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Login, Signup } from "./pages";
import { Navbar, OpenRoute } from "./components";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            // <OpenRoute>
            <Signup />
            /* </OpenRoute> */
          }
        />
        <Route
          path="/login"
          element={
            // <OpenRoute>
            <Login />
            // </OpenRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
