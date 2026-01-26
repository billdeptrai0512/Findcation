import { MapContainer, TileLayer, useMap, ZoomControl } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { useUserLocation } from "./userLocationContext";
import { useStaycation } from "./staycationContext";
import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";
import L from "leaflet";
import axios from "axios";
import Home from "../assets/home_41x50.webp"
import People from "../assets/people_41x50.webp"
import PeopleMarker from "./peopleMarker";
import HouseMarker from "./houseMarker";

export default function Map() {
  const { location } = useUserLocation();
  const { staycations, newStaycation, setNewStaycation } = useStaycation();
  const [GPS, setGPS] = useState({ lat: 16, lng: 109 });
  const [zoom, setZoom] = useState(6);

  const mapRef = useRef(null);
  const markerRefs = useRef({});

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

    // Effect 2: GPS → nearest staycation
    if (location) {
      const userLatLng = L.latLng(location.lat, location.lng);
      const map = markerRefs.current[staycations[0].id]?._map; // grab map from any marker

      // ✅ Step 1: immediately fly to user location
      if (map) {
        map.flyTo(userLatLng, 15, {
          animate: true,
          duration: 0.75,
        });
      }

      // ✅ Step 2: after 2s, popup nearest staycation
      const timeout = setTimeout(() => {
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
          const stayLatLng = L.latLng(
            (nearestStay.location.gps.lat + 0.0042), // 0.0042 to make the marker stay middle low in mobile screen
            (nearestStay.location.gps.lng)
          );

          // Open popup
          markerRefs.current[nearestStay.id].openPopup();

          // Fly to marker position
          map.flyTo(stayLatLng, 15, {
            animate: true,
            duration: 0.75,
          });
        }

      }, 860);

      return () => clearTimeout(timeout);
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
        <MapContainer center={GPS} zoom={zoom} zoomControl={false} whenCreated={(map) => (mapRef.current = map)} className={styles.map}
          preferCanvas={true} scrollWheelZoom={true} attributionControl={false} >

          {/* <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" /> */}
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          {/* <ZoomControl position="bottomright" style={{ zIndex: 1000 }} /> */}

          <VietnamBoundaries />

          {staycations && staycations.map((stay) => (
            <HouseMarker key={stay.id} stay={stay} styles={styles}
              iconUrl={Home} markerRefs={markerRefs}
              ref={(ref) => (markerRefs.current[stay.id] = ref)}
            />
          ))}

          {location && <PeopleMarker position={[GPS.lat, GPS.lng]} iconUrl={People} />}

        </MapContainer>
      </div>
    </div>
  );
}

function VietnamBoundaries() {
  const map = useMap();  // <-- always ready after MapContainer mounts
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/assets/geo/vn_islands.geojson`)
      .then(res => setGeoData(res.data.features));
  }, []);

  useEffect(() => {
    if (!geoData) return;

    const layer = L.geoJSON(geoData, {
      style: { color: "black", weight: 0.5, fillOpacity: 0.01 },
      onEachFeature: (feature, layer) => {
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
      }
    }).addTo(map);

    return () => map.removeLayer(layer);
  }, [geoData, map]);

  return null;
}
