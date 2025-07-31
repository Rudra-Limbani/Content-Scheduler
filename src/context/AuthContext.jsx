// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged, signOut, getIdToken } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Firebase listener - runs once
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user, true);
        const userData = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "User",
          photoURL: user.photoURL || "",
        };

        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(userData));

        setIsLoggedIn(true);
        setCurrentUser(userData);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Manual login (custom logic if needed)
  const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(userData));
    setIsLoggedIn(true);
    setCurrentUser(userData);
  };

  // ✅ Logout
  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
