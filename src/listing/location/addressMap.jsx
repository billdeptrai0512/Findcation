import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useListing } from '../listingContext';
import { useUserLocation } from '../../map/userLocationContext';
import "leaflet/dist/leaflet.css";
import L from "leaflet";


import styles from './location.module.css';

export default function AddressMap({ icon }) {

  const {GPS} = useUserLocation()
  const {listing} = useListing()
  const [text, setText] = useState("");

  useEffect(() => {

    if (listing.location.address === "" || listing.location.public === false) return setText("Bạn đang ở đây!");
    
    return setText(listing.location.address);
    
  }, [listing]);

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [40, 60], // adjust size
    iconAnchor: [20, 50], // point of the icon that corresponds to marker's location
    popupAnchor: [0, -60], // position of popup relative to icon
  });

  const SetViewOnPosition = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      const timer = setTimeout(() => {
        map.setView(position, 20);
      }, 150);
      return () => clearTimeout(timer);
    }, [position, map]);
  
    return null;
  };


  //if we not have the location.address. what default address we use ? other with user.gps ? what if user gps not have ?
  const gps = listing.location.address === "" ? GPS : listing.location.gps

  return (
    <div className={styles.map_wrap}>
        <MapContainer center={gps} zoom={20} className={styles.map}
          dragging={false} zoomControl={false}
          doubleClickZoom={false} touchZoom={false}
          keyboard={false} scrollWheelZoom={false}  attributionControl={false}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
  
          <Marker position={gps} icon={customIcon} eventHandlers={{add: (e) => e.target.openPopup()}}>
              <Popup autoOpen={true} > {text} </Popup>
          </Marker>
  
          <SetViewOnPosition position={gps} />

        </MapContainer>
      
    </div>
  );
}







