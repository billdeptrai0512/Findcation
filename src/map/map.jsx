import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON  } from "react-leaflet";
import { useEffect, useState } from "react";
import { useUserLocation } from "./userLocationContext";
import { useStaycation } from "./staycationContext";
import { useMediaQuery } from "react-responsive";
import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";
import L from "leaflet";
import axios from "axios";
import Staycation from "./staycation";
import Home from "../assets/home.png"
import People from "../assets/people.png"

export default function Map() {

  const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

  const { staycations, fetchStaycations } = useStaycation();
  const { location } = useUserLocation()
  const [GPS, setGPS] = useState({ lat : 16, lng : 109 })
  const [zoom, setZoom] = useState(isMobile ? 5 : 6)

  function VietnamBoundaries() {
    const [geoData, setGeoData] = useState(null);
  
    useEffect(() => {

        const fetchGeoJSOn = async () => {

            try {
              
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/assets/geo/vn_islands.geojson`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                }).then((res) => res.data);
        
                setGeoData(response.features)
                
            } catch (err) {
        
                console.error('Fetch staycations failed', err);
        
            } 
        
          };

        fetchGeoJSOn();
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

  useEffect(() => {
    if (!location) return 
    setGPS(location);
    setZoom(15) //zoom in when have user's location
  }, [isMobile, location]);


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

              <VietnamBoundaries />

              {staycations && staycations.map((stay) => (
                <Marker key={stay.id} icon={homeIcon}
                  position={[stay.location.gps.lat, stay.location.gps.lng]}>
                  <Popup closeButton={false} className={styles.content}>
                    <Staycation staycation={stay}/>
                  </Popup>
                </Marker>
              ))}

              {location && (
                <Marker position={[GPS.lat, GPS.lng]} icon={peopleIcon}>
                  <Popup>Bạn đang ở đây!</Popup>
                </Marker>
              )}

              <SetViewOnPosition position={GPS} zoom={zoom}/>
            </MapContainer>

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

const peopleIcon = new L.Icon({
  iconUrl: People,
  iconSize: [41, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
});

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
