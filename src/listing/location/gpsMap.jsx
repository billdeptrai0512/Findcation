import { useState, useRef  } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import styles from './location.module.css'; // Ensure .map and .markerOverlay are styled here
import Home from "../../assets/home.png";

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
          <img src={Home} alt="Pin" />
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



