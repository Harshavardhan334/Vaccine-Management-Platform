import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config.js";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // No dedicated profile route; decode from token response after login/register
        setLoading(false);
      } catch (e) {
        setUser(null);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (payload) => {
    const res = await axios.post(`${BACKEND_URL}/api/users`, payload, {
      withCredentials: true,
    });
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    await axios.post(`${BACKEND_URL}/api/users/logout`, {}, {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;