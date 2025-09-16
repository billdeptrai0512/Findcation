import { useListing } from "../listingContext";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import ConfirmAddress from "./confirm-address";
import SearchAddress from "./search-address";

export default function LocationListing() {

  const { listing } = useListing()
  const { setStepValidity, currentStep } = useOutletContext();

  useEffect(() => {
      setStepValidity((prev) => ({
        ...prev,
        [currentStep]: listing.location.address !== ""
      }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing.location]);

  return listing.location.address === "" ? <SearchAddress  /> : <ConfirmAddress  />
  
}

//forgot to confirm GPS
