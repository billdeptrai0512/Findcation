import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user session on initial load
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setUser(res.data.user);
      return res.data.user;

    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
