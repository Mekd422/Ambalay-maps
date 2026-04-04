import { useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_ROOT}/auth/whoami`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setToken(null);
        setUser(null);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};