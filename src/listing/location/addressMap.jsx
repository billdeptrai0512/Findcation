import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


import styles from './location.module.css';


export default function AddressMap({ location }) {

  const [text, setText] = useState("");

  useEffect(() => {

    if (location.address === "" || location.public === false) return setText("Bạn đang ở đây!");
    
    return setText(location.address);
    
  }, [location]);

  return (
    <div className={styles.map_wrap} style={{ position: "relative" }}>
        <MapContainer
          center={location.gps}
          zoom={20}
          dragging={false}
          zoomControl={false}
          doubleClickZoom={false}
          touchZoom={false}
          keyboard={false}
          scrollWheelZoom={false} 
          attributionControl={false}
          className={styles.map}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
  
          <Marker position={location.gps} icon={customIcon} eventHandlers={{add: (e) => e.target.openPopup()}}>
              <Popup autoOpen={true} > {text} </Popup>
          </Marker>
  
          <SetViewOnPosition position={location.gps} />

        </MapContainer>
      
    </div>
  );
}

const SetViewOnPosition = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.setView(position, 20);
    }, 150);
    return () => clearTimeout(timer);
  }, [position, map]);

  return null;
};

// Change fill color to a specific color

const svgWithColor = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 384 512" fill="#ff5e5e"> 
    <path d="M168 0C75.1 0 0 75.1 0 168c0 87.3 131.1 265.6 168 344 36.9-78.4 168-256.7 168-344C336 75.1 260.9 0 168 0zm0 240c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72-32.2 72-72 72z"/>
  </svg>
`;

const iconUrl = `data:image/svg+xml;base64,${btoa(svgWithColor)}`;

const customIcon = L.icon({
  iconUrl,
  iconSize: [36, 48],
  iconAnchor: [11, 48],
  popupAnchor: [0, -48],
});


