import { useState, useEffect } from "react";
import { useUserLocation } from "./userLocationContext";
import { useStaycation } from "./staycationContext";
import styles from "./loading.module.css";
import Map from "./main";


export default function LoadingScreen() {
  const { saveLocation } = useUserLocation();
  const { fetchStaycations } = useStaycation()
  const [error, setError] = useState(null);
  const [, setPermissionState] = useState("prompt"); // prompt | granted | denied

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          setPermissionState(result.state);
          result.onchange = () => setPermissionState(result.state); // auto-update if user changes
        });
    }
  }, []);

  // const handleRequestLocation = () => {
  //   setError(null);

  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       console.log("SUCCESS:", pos);
  //       saveLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude});
  //       //success
  //       console.log('start fetch all staycation on map')

  //       fetchStaycations()
  //     },
  //     (err) => {
  //       console.error("ERROR:", err);
  //       if (err.code === 1) {
  //         setError({
  //           message:
  //             "Chúng tôi cần quyền truy cập vị trí để cho bạn trải nghiệm tốt nhất ",
  //         });
  //       } else {
  //         setError(err);
  //       }
  //     },
  //     { enableHighAccuracy: true }
  //   );
  // };

  return (
    <div className={styles.title} >
      <h1>Findcation</h1>
      <span>Bản đồ tất cả self-checking staycation ở Việt Nam</span>

      {error && (
        <div style={{ padding: "1em", fontSize: "0.75em", color: "red" }}>
          {error.message}
        </div>
      )}
    </div>
    
  );
}
