import { createContext, useContext, useState } from "react";
import axios from "axios";

const StaycationContext = createContext();

const StaycationProvider = ({ children }) => {

  const [staycations, setStaycations] = useState([]); // { lat, lng }

  const fetchStaycations = async () => {

    try {
      
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/listing/all-listing`);

        console.log(response.data.length)

        setStaycations(response.data)
        
    } catch (err) {

        console.error('Fetch staycations failed', err);

    } 

  };

  return (
    <StaycationContext.Provider
      value={{
        staycations,
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
