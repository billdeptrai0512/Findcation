import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEffect } from "react";
import { useAuth } from "../auth/authcontext";
import { useLayout } from "./layoutContext";
import styles from "./map.module.css"
import LoadingScreen from "./loading";
import Footer from "../footer/main";

export default function Map() {

  const { user } = useAuth();
  const { location, hasPermission, saveLocation } = useLayout();

  // ❌ Don't render the map until GPS is confirmed
  if (!hasPermission || !location) {
    return (
      <LoadingScreen
        onLocationAllowed={saveLocation}
      />
    );
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={location}
        zoom={20}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        className={styles.map}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />

        <Marker position={location} icon={customIcon} 
            eventHandlers={{add: (e) => e.target.openPopup()}}>
            <Popup autoOpen={true} >{user ? user.name : "Bạn"} đang ở đây!</Popup>
        </Marker>

        <SetViewOnPosition position={location} />
      </MapContainer>

      <Footer />
    </div>
  );
}

const color = "#ff5e5e"; // any HEX or named color

// Inject color into the SVG using CSS `currentColor`
const svgWithColor = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 384 512" fill="${color}">
    <path d="M168 0C75.1 0 0 75.1 0 168c0 87.3 131.1 265.6 168 344 36.9-78.4 168-256.7 168-344C336 75.1 260.9 0 168 0zm0 240c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72-32.2 72-72 72z"/>
  </svg>
`;

const iconUrl = `data:image/svg+xml;base64,${btoa(svgWithColor)}`;

const customIcon = L.icon({
  iconUrl,
  iconSize: [24, 48],
  iconAnchor: [11, 48],
  popupAnchor: [0, -48],
});

const SetViewOnPosition = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      const timer = setTimeout(() => {
        map.setView(position, 17);
      }, 150);
      return () => clearTimeout(timer);
    }, [position, map]);

    return null;
};
