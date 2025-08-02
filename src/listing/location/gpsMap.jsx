import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useAuth } from "../../auth/authcontext";

import styles from './location.module.css'; // Ensure .map and .markerOverlay are styled here


export default function GPSMap({ location, setLocation }) {

  const { user } = useAuth();
  const [initialPositionSet, setInitialPositionSet] = useState(false);

  return (
    <div className={styles.map_wrap} style={{ position: "relative" }}>
        <MapContainer
          center={location}
          zoom={20}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={false}
          className={styles.map}
          whenCreated={(map) => {
            // Only center the map once at initial load
            if (!initialPositionSet) {
              map.setView(location, 17);
              setInitialPositionSet(true);
            }
          }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
  
          <Marker position={location} icon={customIcon} 
              eventHandlers={{add: (e) => e.target.openPopup()}}>
              <Popup autoOpen={true} >{user ? user.name : "Bạn"} đang ở đây!</Popup>
          </Marker>
  
          <TrackCenterOnDrag setLocation={setLocation} />
          
        </MapContainer>
      
    </div>
  );
}

function TrackCenterOnDrag({ setLocation }) {
  useMapEvents({
    dragend: (e) => {
      const map = e.target;
      const center = map.getCenter();
      setLocation([center.lat, center.lng]);
    },
  });

  return null;
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



