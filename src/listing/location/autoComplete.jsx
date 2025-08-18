import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { MapPin } from "lucide-react";
import { useListing } from "../listingContext";
import styles from './location.module.css'; 

export default function AutoComplete({ predictions, setPredictions }) {

    const {uploadLocation} = useListing()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

  // User clicks suggestion
    const handleSelectSuggestion = async (place) => {

        try {
            const res = await axios.get(`https://rsapi.goong.io/v2/geocode?address=${place.description}&api_key=${import.meta.env.VITE_GOONG_API_KEY}`).then(res => res.data);

            if (res.status !== "OK") throw new Error("Res status !== OK");

            const result = res.results[0]

            const {address_components, formatted_address, geometry } = result

            const details = {
                apartment: "",
                building: "",
                street: address_components[0].long_name || "",
                ward: address_components[1].long_name || "",
                city: address_components[2].long_name || "",
            }

            uploadLocation(formatted_address, geometry, details)

        } catch (error) {

            console.error("Get geocode lat-lng from Goong failed:", error);

        } finally {

            setPredictions([]);

        }

    };

    if (!predictions || predictions.length === 0) return null;

    return (
        <ul className={styles.autocomplete}>
            {predictions.map((place, idx) => (
                <div key={idx} style={{display: "flex", flex: "1"}}>
                    <MapPin size={isMobile ? 20 : 30} color="#222222" style={{ marginRight: "8px", marginLeft: "24px", flexShrink: "0" }} />
                    <li onClick={() => handleSelectSuggestion(place)}>
                        {place.description}
                    </li>
                </div>
  
            ))}
        </ul>
    )
}
