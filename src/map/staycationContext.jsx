import { createContext, useContext, useState } from "react";
import axios from "axios";

const StaycationContext = createContext();

const StaycationProvider = ({ children }) => {

  const [staycations, setStaycations] = useState([]);
  const [newStaycation, setNewStaycation] = useState(null)

  const fetchStaycations = async () => {

    try {
      
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/listing/all-listing`);

        setStaycations(response.data)
        
    } catch (err) {

      console.error('Fetch staycations failed', err);

    } 

  };

  return (
    <StaycationContext.Provider
      value={{
        staycations,
        newStaycation,
        setNewStaycation,
        fetchStaycations,
      }}
    >
      {children}
    </StaycationContext.Provider>
  );
};

const useStaycation = () => useContext(StaycationContext);

// eslint-disable-next-line react-refresh/only-export-components
export { StaycationProvider, useStaycation };
