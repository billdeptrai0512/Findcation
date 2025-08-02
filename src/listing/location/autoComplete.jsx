import axios from "axios";
import styles from './location.module.css'; 
const GOONG_API_KEY = "VITQ4kXvApjrvIOTO2QVzEpxWUDahXZmyanx8aNE"; // Replace with your actual key

export default function AutoComplete({predictions , setPredictions, setLocation}) {

  // User clicks suggestion
  const handleSelectSuggestion = async (place) => {

    try {
        const res = await axios.get(`https://rsapi.goong.io/v2/geocode?address=${place.description}&api_key=${import.meta.env.VITE_GOONG_API_KEY}`).then(res => res.data);

        if (res.status !== "OK") {
          throw new Error("Res status !== OK");
        }

        const result = res.results[0]

        const {lat, lng} = result.geometry.location

        setLocation({lat, lng})

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
