import { useListing } from "../listingContext";
import ConfirmAddress from "./confirm-address";
import SearchAddress from "./search-address";
import ConfirmGPS from "./confirm-gps";

export default function LocationListing() {

  const { listing } = useListing()

  return listing.location.address === "" ? <SearchAddress  /> : <ConfirmAddress  />
  
}

//forgot to confirm GPS
