import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useStaycation } from "./staycationContext";
import { useMediaQuery } from "react-responsive";
import styles from "./map.module.css";

import Staycation from "./staycation";


import People from "../assets/people.png";
import Home from "../assets/home.png"

export default function Map() {

  const { staycations, fetchStaycations } = useStaycation();

  const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

  const GPS = { lat : 16, lng : 109 }

  function VietnamBoundaries() {
    const [geoData, setGeoData] = useState(null);
  
    useEffect(() => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/geo/vn_islands.geojson`)   // endpoint backend bạn vừa tạo
        .then((res) => res.json())
        .then((data) => setGeoData(data))
        .catch((err) => console.error("Failed to load GeoJSON:", err));
    }, []);
  
    if (!geoData) return null;
  
    return (
      <GeoJSON
        data={geoData}
        style={{ color: "black", weight: 0.5, fillOpacity: 0.01, cursor: "unset" }}
        onEachFeature={(feature, layer) => {
          if (feature.properties.ten_tinh === "Khánh Hòa") {
            layer.bindTooltip("quần đảo Trường Sa", {
              permanent: true,
              direction: "center",
              className: "vn-label",
            });
          }
          if (feature.properties.ten_tinh === "Đà Nẵng") {
            layer.bindTooltip("quần đảo Hoàng Sa", {
              permanent: true,
              direction: "center",
              className: "vn-label",
            });
          }
        }}
      />
    );
  }

  useEffect(() => {
    fetchStaycations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!hasPermission || !GPS || !staycations) return <LoadingScreen />;

  return (

        <div className={styles.map_box}>
          <div className={styles.mapContainer}>
            <MapContainer
              center={GPS}
              dragging={true} scrollWheelZoom={true} 
              doubleClickZoom={false} touchZoom={true}
              keyboard={false} zoomControl={false} attributionControl={false}
              className={styles.map}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />

              {/* Current user location */}
              {/* <Marker position={GPS} icon={peopleIcon} >
                <Popup >{user ? user.name : "Bạn"} đang ở đây!</Popup>
              </Marker> */}

              <VietnamBoundaries />

              {/* Staycation markers */}
              {staycations && staycations.map((stay) => (
                <Marker key={stay.id} icon={homeIcon}
                  position={[stay.location.gps.lat, stay.location.gps.lng]}>
                  <Popup minWidth={isMobile ? 50.2 : 240.2} closeButton={false} className={styles.content}>
                    <Staycation staycation={stay}/>
                  </Popup>
                </Marker>
              ))}

              <SetViewOnPosition position={GPS} zoom={isMobile ? 5 : 6}/>
            </MapContainer>

              {/* vl this one is the button lolololo */}
          </div>
        </div>
  );
}

const homeIcon = new L.Icon({
  iconUrl: Home,
  iconSize: [41, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
});

// const peopleIcon = new L.Icon({
//   iconUrl: People,
//   iconSize: [41, 50],
//   iconAnchor: [20, 50],
//   popupAnchor: [0, -50],
// });

const SetViewOnPosition = ({ position, zoom }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.setView(position, zoom);
    }, 150);
    return () => clearTimeout(timer);
  }, [position, map, zoom]);

  return null;
};
