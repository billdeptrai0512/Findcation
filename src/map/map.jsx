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

  // Default GPS: mobile uses different center than desktop for better initial view
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [GPS, setGPS] = useState(
    isMobile
      ? { lat: 17.1, lng: 105.7 }  // Mobile: shifted north for better view
      : { lat: 16.0, lng: 108.0 }  // Desktop: center of Vietnam
  );

  const [ipLocationLoaded, setIpLocationLoaded] = useState(false);
  const [zoom, setZoom] = useState(6);

  const mapRef = useRef(null);
  const markerRefs = useRef({});

  // Effect: Fetch IP-based location on mount, then popup nearest staycation
  // Priority: userLocation > IPLocation > defaultLocation
  useEffect(() => {
    // Skip IP location if user already granted geolocation permission
    if (location) return;
    if (!staycations?.length) return;

    const timeoutId = setTimeout(() => {
      const fetchIPLocation = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/geojson/location`, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.data?.location) {
            console.log("IP Location fetched:", res.data);
            const ipLat = res.data.location[0];
            const ipLng = res.data.location[1];

            setGPS({ lat: ipLat, lng: ipLng });
            setIpLocationLoaded(true);
            setZoom(13);

            // After map flies to IP location, find and popup nearest staycation
            setTimeout(() => {
              const ipLatLng = L.latLng(ipLat, ipLng);
              const map = markerRefs.current[staycations[0]?.id]?._map;

              if (!map) return;

              let nearestStay = null;
              let nearestDist = Infinity;

              staycations.forEach((stay) => {
                const stayLatLng = L.latLng(stay.location.gps.lat, stay.location.gps.lng);
                const dist = ipLatLng.distanceTo(stayLatLng);
                if (dist < nearestDist) {
                  nearestDist = dist;
                  nearestStay = stay;
                }
              }); // we could priority verify staycation in this case

              if (nearestStay && markerRefs.current[nearestStay.id]) {
                markerRefs.current[nearestStay.id].openPopup();
              }
            }, 888); // Wait for initial fly to complete
          }

        } catch (err) {
          console.error("IP location failed:", err);
        }
      };

      fetchIPLocation();
    }, 888); // Initial delay

    return () => clearTimeout(timeoutId);
  }, [location, staycations]); // Re-run if location changes (to cancel if user grants permission)

  // Effect: Handle newStaycation focus
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

      }, 888);

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

          <VietnamBoundaries />

          {/* Update map center when IP location is fetched */}
          <MapCenterUpdater
            gps={GPS}
            zoom={zoom}
            shouldFly={ipLocationLoaded}
            onFlown={() => setIpLocationLoaded(false)}
          />

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

// Component to update map center dynamically (MapContainer's center prop only works on mount)
function MapCenterUpdater({ gps, zoom, shouldFly, onFlown }) {
  const map = useMap();

  useEffect(() => {
    if (shouldFly && gps) {
      map.flyTo([gps.lat, gps.lng], zoom, {
        animate: true,
        duration: 0.75,
      });
      onFlown?.(); // Reset the flag after flying
    }
  }, [shouldFly, gps, zoom, map, onFlown]);

  return null;
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
