import { createContext, useContext, useState, useEffect } from "react";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // { lat, lng }
  const [hasPermission, setHasPermission] = useState(false);

  // On initial mount, try to get permission state
  useEffect(() => {
    if (!navigator.permissions) return;

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        setHasPermission(true);
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err) => console.warn("Error getting location:", err),
          { enableHighAccuracy: true }
        );
      } else {
        setHasPermission(false);
      }

      // Listen to permission changes
      result.onchange = () => {
        if (result.state === "denied") {
          setHasPermission(false);
          setLocation(null);
        }
      };
    });
  }, []);

  const saveLocation = (coords) => {
    setLocation(coords);
    setHasPermission(true);
  };

  const clearLocation = () => {
    setHasPermission(false);
    setLocation(null);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        hasPermission,
        saveLocation,
        clearLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

const useLayout = () => useContext(LocationContext);

// eslint-disable-next-line react-refresh/only-export-components
export { LocationProvider, useLayout };
