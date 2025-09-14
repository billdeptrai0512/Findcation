import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON  } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { useUserLocation } from "./userLocationContext";
import { useStaycation } from "./staycationContext";
import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";
import L from "leaflet";
import axios from "axios";
import Staycation from "./staycation";
import Home from "../assets/home.png"
import People from "../assets/people.png"

export default function Map() {
  const { staycations, fetchStaycations } = useStaycation();
  const { location } = useUserLocation();
  const [GPS, setGPS] = useState({ lat: 16, lng: 109 });
  const [zoom, setZoom] = useState(6);
  const [autoOpened, setAutoOpened] = useState(false); // 👈 flag
  // keep refs to all staycation markers
  const markerRefs = useRef({});

  useEffect(() => {
    fetchStaycations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!location) return;
    setGPS(location);
    setZoom(15);
  }, [location]);

  // 👉 auto open nearest staycation popup
  useEffect(() => {
    if (autoOpened || !location || !staycations?.length) return;

    const userLatLng = L.latLng(location.lat, location.lng);

    let nearestStay = null;
    let nearestDist = Infinity;

    staycations.forEach((stay) => {
      const stayLatLng = L.latLng(stay.location.gps.lat, stay.location.gps.lng);
      const dist = userLatLng.distanceTo(stayLatLng);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestStay = stay;
      }
    });

    if (nearestStay && markerRefs.current[nearestStay.id]) {
      markerRefs.current[nearestStay.id].openPopup();
      setAutoOpened(true); // 👈 prevent future auto-opens
    }
  }, [location, staycations, autoOpened]);

  return (
    <div className={styles.map_box}>
      <div className={styles.mapContainer}>
        <MapContainer
          center={GPS}
          zoom={zoom}
          className={styles.map}
          preferCanvas={true}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />

          <VietnamBoundaries />

          {staycations &&
            staycations.map((stay) => (
              <Marker
                key={stay.id}
                icon={homeIcon}
                position={[stay.location.gps.lat, stay.location.gps.lng]}
                ref={(ref) => (markerRefs.current[stay.id] = ref)}
                eventHandlers={{
                  click: (e) => {
                    const marker = e.target;
                    const map = marker._map;
                    if (!map) return;

                    // open popup manually
                    marker.openPopup();

                    // then pan/fly to the marker
                    map.flyTo(marker.getLatLng(), map.getZoom(), {
                      animate: true,
                      duration: 0.75,
                    });
                  },
                }}
              >
                <Popup closeButton={false} className={styles.content}>
                  <Staycation staycation={stay} />
                </Popup>
              </Marker>
            ))}

          {location && (
            <Marker position={[GPS.lat, GPS.lng]} icon={peopleIcon}>
              <Popup>Bạn đang ở đây!</Popup>
            </Marker>
          )}

          <SetViewOnPosition position={GPS} zoom={zoom} />
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
      map.setView(position, zoom, {
        animate: true,
        duration: 0.75,
        easeLinearity: 0.25
      });
    }, 150);
    return () => clearTimeout(timer);
  }, [position, map, zoom]);

  return null;
};

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
