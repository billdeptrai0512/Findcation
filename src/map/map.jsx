import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
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
  const { location } = useUserLocation();
  const { staycations, fetchStaycations, newStaycation, setNewStaycation } = useStaycation();
  const [GPS, setGPS] = useState({ lat: 16, lng: 109 });
  const [zoom, setZoom] = useState(6);

  const markerRefs = useRef({});

  // fetch staycations once
  useEffect(() => {
    fetchStaycations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!staycations?.length) return;

    const mapFocus = (marker, zoomLevel, fly = true) => {
      const map = marker._map;
      if (!map) return;
      marker.openPopup();
      if (fly) {
        map.flyTo(marker.getLatLng(), zoomLevel ?? map.getZoom(), {
          animate: true,
          duration: 0.75,
        });
      }
    };

    // Effect 1: handle new staycation priority
    if (newStaycation) {
      const marker = markerRefs.current[newStaycation.id];
      if (marker) {
        mapFocus(marker, 15, true);
      }
    }

  }, [newStaycation, setNewStaycation, staycations]);  // ✅ only depends on newStaycation + staycations


  useEffect(() => {
    if (!staycations?.length) return;
    if (newStaycation) return; // 🚫 don't run GPS if newStaycation is active

    const mapFocus = (marker, zoomLevel, fly = true) => {
      const map = marker._map;
      if (!map) return;
      marker.openPopup();
      if (fly) {
        map.flyTo(marker.getLatLng(), zoomLevel ?? map.getZoom(), {
          animate: true,
          duration: 0.75,
        });
      }
    };

    // Effect 2: GPS → nearest staycation
    if (location) {
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
        mapFocus(markerRefs.current[nearestStay.id], 15, true);
      }
      return;
    }

    // Effect 3: fallback → last staycation
    if (!location) {
      const lastStay = staycations[staycations.length - 1];
      if (lastStay && markerRefs.current[lastStay.id]) {
        markerRefs.current[lastStay.id].openPopup(); // only popup, no fly
      }
    }
  }, [location, staycations, newStaycation]);  // ✅ depends on location & staycations, but skips if newStaycation


  useEffect(() => {
    if (location) {
      setGPS(location);
      setZoom(15);
    }
  }, [location]);

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
                    marker.openPopup();
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

function VietnamBoundaries() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    const fetchGeoJSOn = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/assets/geo/vn_islands.geojson`,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        ).then((res) => res.data);

        setGeoData(response.features);
      } catch (err) {
        console.error("Fetch staycations failed", err);
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
