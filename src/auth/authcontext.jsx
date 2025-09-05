import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth`, {withCredentials: true})
      .then((res) => {
        console.log(res.data.user)
        res.data.user
      })
      .catch(() => setUser(null))
  }, []);

  const login = async (email, password) => {
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.error(err)
      throw err;
    }
    
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
