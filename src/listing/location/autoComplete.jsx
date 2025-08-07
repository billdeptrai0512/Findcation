import axios from "axios";
import styles from './location.module.css'; 

export default function AutoComplete({ setLocation, predictions, setPredictions }) {

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

            setLocation(prev => ({
                ...prev,
                address: formatted_address,
                gps: geometry.location,
                details,
            }))

            setPredictions([]);
    
        } catch (error) {
            console.error("Get geocode lat-lng from Goong failed:", error);
        }

    };

    if (!predictions || predictions.length === 0) return null;

    return (
        <ul className={styles.autocomplete}>
            {predictions.map((place, idx) => (
                <li key={idx} onClick={() => handleSelectSuggestion(place)}>
                    {place.description}
                </li>
            ))}
        </ul>
    )
}
