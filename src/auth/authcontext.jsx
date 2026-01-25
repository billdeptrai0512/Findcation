import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../config/api";
import { handleApiError } from "../utils/errorHandler";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user session on initial load
  useEffect(() => {
    apiClient.get('/auth/me')
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
      const res = await apiClient.post(
        '/auth/login',
        { email, password }
      );

      setUser(res.data.user);
      return res.data.user;

    } catch (err) {
      handleApiError(err, 'Login');
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await apiClient.post('/auth/logout', {});
      setUser(null);
    } catch (err) {
      handleApiError(err, 'Logout');
    }
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
