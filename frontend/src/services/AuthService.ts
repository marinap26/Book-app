import React, { useEffect } from "react";

import { User } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface AuthService {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
}

const useAuthService = (): AuthService => {
  const { authenticateUser, unAuthenticateUser } = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (token && user) {
      authenticateUser(JSON.parse(localStorage.getItem("user") as string));
      navigate("/books");
    }
    //  else {
    //   navigate("/login");
    // }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    const url = "http://localhost:5000/login";
    const data = { username, password };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      const { token, user } = responseData;
      authenticateUser(user);
      localStorage.setItem("userToken", token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    const url = "http://localhost:5000/logout";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      unAuthenticateUser();
      localStorage.removeItem("userToken");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const register = async (
    username: string,
    password: string
  ): Promise<void> => {
    const url = "http://localhost:5000/register";
    const data = { username, password };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      const { message } = responseData;
      console.log("Registration successful:", message);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return { login, logout, register };
};

export default useAuthService;
