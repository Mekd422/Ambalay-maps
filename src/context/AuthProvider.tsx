import { useState, useEffect, type ReactNode } from "react";
import API, { setAuthToken } from "../api/axios"; 
import { AuthContext } from "./AuthContext";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
  return localStorage.getItem("token");
});

  useEffect(() => {
    setAuthToken(token); 

    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/whoami"); 
        setUser(res.data.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, [token]);

  const login = async (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // 🔥 persist
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};