// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { createPortal } from "react-dom";

function PeopleMarker({ position, iconUrl }) {
  const markerRef = useRef(null);
  const divRef = useRef(document.createElement("div"));
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const icon = L.divIcon({
      className: "custom-div-icon",
      html: divRef.current,
      iconSize: [41, 50],
      iconAnchor: [20, 50],
      popupAnchor: [0, -50],
    });

    const marker = L.marker(position, { icon }).addTo(map);
    marker.bindPopup("Bạn đang ở đây!");
    markerRef.current = marker;

    return () => {
      map.removeLayer(marker);
    };
  }, [map, position]);

    return createPortal(
        <motion.img
            src={iconUrl}
            style={{ width: "41px", height: "50px" }}  // 🔑 force size
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
        />,
        divRef.current
    );
}

export default PeopleMarker;
