import { useState, useRef  } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import styles from './location.module.css'; // Ensure .map and .markerOverlay are styled here


export default function GPSMap({ location, setLocation }) {

  const [initialPositionSet, setInitialPositionSet] = useState(false);

  return (
    <div className={styles.map_wrap} style={{ position: "relative" }}>
        <MapContainer
          center={location.gps}
          zoom={20}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          attributionControl={false}
          className={styles.map}
          whenCreated={(map) => {
            // Only center the map once at initial load
            if (!initialPositionSet) {
              map.setView(location.gps, 17);
              setInitialPositionSet(true);
            }
          }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
  
          {/* <Marker position={location.gps} icon={customIcon} 
              eventHandlers={{add: (e) => e.target.openPopup()}}>
          </Marker> */}

          <ZoomControl position="bottomleft" />
  
          <TrackCenterOnDrag setLocation={setLocation} />
          
        </MapContainer>

        <div className={styles.markerOverlay}>
          <img src={iconUrl} alt="Pin" />
        </div>
      
    </div>
  );
}

function TrackCenterOnDrag({ setLocation }) {
  const timeoutRef = useRef(null);

  useMapEvents({
    move: (e) => {
      const map = e.target;
      const center = map.getCenter();

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setLocation((prev) => ({
          ...prev,
          gps: { lat: center.lat, lng: center.lng },
        }));
      }, 86); // Adjust delay if needed
    },
  });

  return null;
}

const color = "#ff5e5e";

const svgWithIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 384 512">
  <path fill="${color}" d="M192 0C86 0 0 86 0 192c0 99.4 131.1 286.6 168 352 36.9-65.4 168-252.6 168-352C336 86 250 0 192 0z"/>
  <path fill="white" d="M192 144l-96 72h32v72h48v-48h32v48h48v-72h32z"/>
</svg>
`;

const iconUrl = `data:image/svg+xml;base64,${btoa(svgWithIcon)}`;



