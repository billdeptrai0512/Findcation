import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserLocationContext = createContext();


const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // { lat, lng }
  const [hasPermission, setHasPermission] = useState(false);

  // useEffect(() => {
  //   const fetchIPLocation = async () => {
  //     try {
  //       //This is default IP based on user IP address.
  //       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/geojson/location`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (res.data) {
  //         setIPLocation({
  //           lat: res.data.location[0],
  //           lng: res.data.location[1],
  //         });
  //       }

  //     } catch (err) {
  //       console.error("IP location failed:", err);
  //     }
  //   };

  //   fetchIPLocation();
  // }, []);

  // By default we call geojson/location to assume user location. if user clicked near me, then we ask for permission to get user exact location.
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
    <UserLocationContext.Provider
      value={{
        location,
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
