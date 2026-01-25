import { createContext, useContext, useState } from "react";
import { apiClient } from "../config/api";
import { handleApiError } from "../utils/errorHandler";

const StaycationContext = createContext();

const StaycationProvider = ({ children }) => {

  const [staycations, setStaycations] = useState([]);
  const [newStaycation, setNewStaycation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStaycations = async () => {

    setLoading(true);

    try {
      const response = await apiClient.get('/listing/all-listing');
      setStaycations(response.data);
    } catch (err) {
      handleApiError(err, 'Fetch Staycations');
    } finally {
      setLoading(false);
    }

  };

  return (
    <StaycationContext.Provider
      value={{
        staycations,
        newStaycation,
        setNewStaycation,
        fetchStaycations,
        loading
      }}
    >
      {children}
    </StaycationContext.Provider>
  );
};

const useStaycation = () => useContext(StaycationContext);

// eslint-disable-next-line react-refresh/only-export-components
export { StaycationProvider, useStaycation };
