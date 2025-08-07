import { useState } from "react";
import { useLayout } from "../../map/layoutContext";
import ConfirmAddress from "./confirm-address";
import SearchAddress from "./search-address";
import ConfirmGPS from "./confirm-gps";

export default function LocationListing() {

  const { GPS } = useLayout();

  const [location, setLocation] = useState({
    address: "",
    gps: { lat: GPS.lat, lng: GPS.lng }, 
    public: false, //default is private
    details: {
      apartment: "",
      building: "",
      street: "",
      ward: "",
      city: ""
    }
  });

  //without address
  //have address - confirm details information 
  //adjust the location on the map to get final gps store to database
  if (location.address === "") return <SearchAddress location={location} setLocation={setLocation} />

  return (
    //  renderSearchAddress({address , setAddress, location, setLocation, predictions, setPredictions})
    <ConfirmGPS location={location} setLocation={setLocation} />
  );
}
