"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  registerUser,
  loginUser,
  getProfile,
} from "@/services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();
        setUser(data.user || data);
      } catch (error) {
        console.error("Failed to load user:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const register = async (userData) => {
    const data = await registerUser(userData);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    if (data.user) {
      setUser(data.user);
    }

    return data;
  };

  const login = async (userData) => {
    const data = await loginUser(userData);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    if (data.user) {
      setUser(data.user);
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};