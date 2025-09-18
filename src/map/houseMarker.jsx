// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Staycation from "./staycation";

export default function HouseMarker({ stay, iconUrl, markerRefs, styles }) {
  const divRef = useRef(document.createElement("div"));

  // keep one stable divIcon instance so Leaflet doesn't get a new icon each render
  const iconRef = useRef();
  if (!iconRef.current) {
    iconRef.current = L.divIcon({
        className: "custom-div-icon",
        html: divRef.current,
        iconSize: [41, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -50],
    });
  }

  return (
    <Marker
        position={[stay.location.gps.lat, stay.location.gps.lng]}
        icon={iconRef.current}
        ref={(ref) => {
            if (markerRefs && markerRefs.current) {
                markerRefs.current[stay.id] = ref;
            }
        }}
        eventHandlers={{
            click: (e) => {
            const marker = e.target;
            const map = marker._map;
            if (!map) return;
                marker.openPopup();
                map.flyTo(marker.getLatLng(), map.getZoom(), {
                    animate: true,
                    duration: 0.75,
                });
            },
            mouseover: (e) => {
                e.target.openPopup();
            },
        }}
        >
        <Popup closeButton={false} className={styles.content}>
            <Staycation staycation={stay} />
        </Popup>

        {createPortal(
            <motion.img
                src={iconUrl}
                width={41}
                height={50}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                alt=""
                />,
            divRef.current
        )}
    </Marker>
  );
}
