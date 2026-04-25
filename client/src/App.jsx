import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
// import CreatePost from "./components/CreatePost";

// 🔐 Protected Route
const PrivateRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <Router>
      {/* ✅ pass state to Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/create"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              {/* <CreatePost /> */}
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h1 className="p-4">404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;