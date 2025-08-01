import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth`, {withCredentials: true})
      .then((res) => (res.data.user))
      .catch(() => setUser(null))
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, { email, password }, { withCredentials: true });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
