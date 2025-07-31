import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebaseConfig";
import { Spin } from "antd";

function App() {
  const { isLoggedIn, login, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  // ✅ Firebase Auth listener - keeps user logged in after refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Store user data globally
        login(user.accessToken, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "User",
        });
      } else {
        logout();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
