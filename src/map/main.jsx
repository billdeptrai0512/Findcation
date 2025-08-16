import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { useAuth } from "../auth/authcontext";
import { useUserLocation } from "./userLocationContext";
import { useStaycation } from "./staycationContext";
import { useMediaQuery } from "react-responsive";
import styles from "./map.module.css";
import LoadingScreen from "./loading";
import Footer from "../footer/main";
import Staycation from "./staycation";


import People from "../assets/people.png";
import Home from "../assets/home.png"

export default function Map() {
  const { user } = useAuth();
  const { GPS, hasPermission } = useUserLocation();
  const { staycations } = useStaycation();

  const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

  if (!hasPermission || !GPS || !staycations) return <LoadingScreen />;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={GPS}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        className={styles.map}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />

        {/* Current user location */}
        <Marker position={GPS} icon={peopleIcon} >
          <Popup >{user ? user.name : "Bạn"} đang ở đây!</Popup>
        </Marker>

        {/* Staycation markers */}
        {staycations.map((stay) => (
          <Marker key={stay.id} icon={homeIcon}
            position={[stay.location.gps.lat, stay.location.gps.lng]}>
            <Popup minWidth={isMobile ? 50.2 : 240.2} closeButton={false} className={styles.content}>
              <Staycation staycation={stay}/>
            </Popup>
          </Marker>
        ))}

        <SetViewOnPosition position={GPS} />
      </MapContainer>

      <Footer />
    </div>
  );
}

const homeIcon = new L.Icon({
  iconUrl: Home,
  iconSize: [41, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
});

const peopleIcon = new L.Icon({
  iconUrl: People,
  iconSize: [41, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
});

const SetViewOnPosition = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.setView(position, 12);
    }, 150);
    return () => clearTimeout(timer);
  }, [position, map]);

  return null;
};
