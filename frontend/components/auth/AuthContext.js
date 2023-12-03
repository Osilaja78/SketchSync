"use client"
import { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  let localToken, localUserId, userState;
  if (typeof window !== 'undefined') {
    localToken = window.sessionStorage.getItem("accessToken");
    localUserId = window.sessionStorage.getItem("userId");
    userState = window.sessionStorage.getItem("isLoggedIn");
  }
  const [accessToken, setAccessToken] = useState( localToken || null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(localUserId || null);
  const [isLoggedIn, setIsLoggedIn] = useState(userState || false);

  const login = (token, userDetails, id) => {
    setIsLoggedIn(true);
    setAccessToken(token);
    setUserId(id);
    window.sessionStorage.setItem("accessToken", token);
    window.sessionStorage.setItem("userId", id);
    window.sessionStorage.setItem("isLoggedIn", true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccessToken(null);
    setUser(null);
    window.sessionStorage.removeItem("accessToken");
    window.sessionStorage.removeItem("userId");
    window.sessionStorage.removeItem("isLoggedIn");
  };

  const authValues = {
    isLoggedIn,
    accessToken,
    userId,
    user,
    setIsLoggedIn,
    setUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
