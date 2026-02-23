
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import styles from './location.module.css'; 
import AutoComplete from "./autoComplete";

function useAddressPredictions(address) {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {

      if (address.length < 5) return

      try {

        const res = await axios.get(`https://rsapi.goong.io/v2/place/autocomplete?input=${address}&api_key=${import.meta.env.VITE_GOONG_API_KEY}&has_deprecated_administrative_unit=true`);
        const data = res.data;
        const predictions = data.predictions || [];

        if (res.data.status === "OK" && predictions.length > 0) return setPredictions(predictions);

      } catch (error) {
        console.error("Get autocomplete from Goong failed:", error);
      }

    }, 400);
  
    return () => clearTimeout(delayDebounce);
  }, [address]);

  return [predictions, setPredictions];
}

export default function SearchBar() {

  const [address, setAddress] = useState("");
  const [predictions, setPredictions] = useAddressPredictions(address);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

  return (
    <div className={styles.searchBar}>
      <div className={styles.search_input}>
        <MapPin size={isMobile ? 20 : 30} color="#222222" style={{ marginRight: "8px", marginLeft: "24px" }} />
        <input type="text" placeholder="nhập địa chỉ "
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <AutoComplete predictions={predictions} setPredictions={setPredictions} />
    </div>
  );
}
