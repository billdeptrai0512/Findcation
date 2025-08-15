import { createContext, useContext, useState, useEffect } from "react";

const UserLocationContext = createContext();

const UserLocationProvider = ({ children }) => {
  const [GPS, setGPS] = useState(null); // { lat, lng }
  const [hasPermission, setHasPermission] = useState(false);

  // On initial mount, try to get permission state
  useEffect(() => {
    if (!navigator.permissions) return;

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        setHasPermission(true);
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setGPS({
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
          setGPS(null);
        }
      };
    });
  }, []);

  const saveLocation = (coords) => {
    setGPS(coords);
    setHasPermission(true);
  };

  const clearLocation = () => {
    setHasPermission(false);
    setGPS(null);
  };

  return (
    <UserLocationContext.Provider
      value={{
        GPS,
        hasPermission,
        saveLocation,
        clearLocation,
      }}
    >
      {children}
    </UserLocationContext.Provider>
  );
};

const useUserLocation = () => useContext(UserLocationContext);

// eslint-disable-next-line react-refresh/only-export-components
export { UserLocationProvider, useUserLocation };
