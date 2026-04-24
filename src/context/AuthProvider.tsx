import { useState, useEffect, type ReactNode } from "react";
import API, { setAuthToken } from "../api/axios"; 
import { AuthContext, type User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
  return sessionStorage.getItem("token");
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
        sessionStorage.removeItem("token");
      }
    };

    fetchUser();
  }, [token]);

  const login = async (newToken: string, newUser?: User | null) => {
    setToken(newToken);
    if (newUser) {
      setUser(newUser);
    }
    sessionStorage.setItem("token", newToken); // 🔥 persist
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
