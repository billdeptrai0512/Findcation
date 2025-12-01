import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Home from "../../assets/home.webp"
import styles from '../host.module.css';

export default function ConfirmMap({ location, handleChangeGPS }) {

  const markerRef = useRef();

  return (
    <div className={styles.map_wrap}>
      <MapContainer center={location.gps} zoom={20} className={styles.map}
        dragging={true} zoomControl={true}
        scrollWheelZoom={false}
        doubleClickZoom={false} touchZoom={true}
        keyboard={false} attributionControl={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />

        {location.address !== "" &&
          <Marker position={location.gps} icon={customIcon} ref={markerRef} eventHandlers={{ add: (e) => e.target.openPopup() }}>
            <Popup closeButton={false} closeOnClick={false} autoClose={false}> Staycation ở đây </Popup>
          </Marker>
        }

        <TrackCenterOnDrag editLocationGPS={handleChangeGPS} />

      </MapContainer>

    </div>
  );
}

const customIcon = new L.Icon({
  iconUrl: Home,
  iconSize: [41, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
});


function TrackCenterOnDrag({ editLocationGPS }) {
  const map = useMapEvents({
    dragend: () => {
      const center = map.getCenter();
      editLocationGPS(center);
    }
  });

  return null;
}



