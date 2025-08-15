import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { useAuth } from "../auth/authcontext";
import { useUserLocation } from "./userLocationContext";
import { useStaycation } from "./staycationContext";
import styles from "./map.module.css";
import LoadingScreen from "./loading";
import Footer from "../footer/main";
import People from "../assets/people.png";

export default function Map() {
  const { user } = useAuth();
  const { GPS, hasPermission } = useUserLocation();
  const { staycations } = useStaycation();

  if (!hasPermission || !GPS || !staycations) return <LoadingScreen />;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={GPS}
        zoom={20}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        className={styles.map}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />

        {/* Current user location */}
        <Marker
          position={GPS}
          icon={customIcon}
          eventHandlers={{ add: (e) => e.target.openPopup() }}
        >
          <Popup>{user ? user.name : "Bạn"} đang ở đây!</Popup>
        </Marker>

        {/* Staycation markers */}
        {staycations.map((stay) => (
          <Marker
            key={stay.id}
            position={[stay.location.gps.lat, stay.location.gps.lng]}
          >
            <Popup>
              <strong>{stay.name}</strong> <br />
              {stay.location.address}
            </Popup>
          </Marker>
        ))}

        <SetViewOnPosition position={GPS} />
      </MapContainer>

      <Footer />
    </div>
  );
}

const customIcon = new L.Icon({
  iconUrl: People,
  iconSize: [40, 60],
  iconAnchor: [20, 50],
  popupAnchor: [0, -60],
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
