import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useListing } from '../listingContext';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Home from "../../assets/home.webp"
import styles from './location.module.css';

export default function AddressMap() {
  const { listing } = useListing()
  const [text, setText] = useState("");
  const markerRef = useRef();

  useEffect(() => {

    if (listing.location.address === "" || listing.location.public === false) return setText(`${listing.name} đang ở đây!`);

    return setText(listing.location.address);

  }, [listing]);


  const SetViewOnPosition = ({ position }) => {

    const map = useMap();

    const zoom = listing.location.address === "" ? 6 : 17

    useEffect(() => {

      const timer = setTimeout(() => {
        map.setView(position, zoom);
      }, 150);

      return () => clearTimeout(timer);
    }, [position, map, zoom]);

    return null;
  };

  //if we not have the location.address. what default address we use ? other with user.gps ? what if user gps not have ?
  const gps = listing.location.address === "" ? defaultPosition : listing.location.gps

  return (
    <div className={styles.map_wrap}>
      <MapContainer center={gps} zoom={20} className={styles.map}
        dragging={false} zoomControl={false}
        doubleClickZoom={false} touchZoom={false}
        keyboard={false} scrollWheelZoom={false} attributionControl={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />

        {listing.location.address !== "" &&
          <Marker position={gps} icon={customIcon} ref={markerRef} eventHandlers={{ add: (e) => e.target.openPopup() }}>
            <Popup closeButton={false} closeOnClick={false} autoClose={false}> {text} </Popup>
          </Marker>
        }

        <SetViewOnPosition position={gps} />

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

const defaultPosition = {
  lat: 16.076096988000074,
  lng: 106.58883965100006
}






