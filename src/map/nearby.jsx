import { useState, useEffect } from "react";
import { useUserLocation } from "./userLocationContext";
import styles from "./map.module.css";

export default function NearByButton() {
  const { saveLocation } = useUserLocation();
  const [error, setError] = useState(null);
  const [permissionState, setPermissionState] = useState("prompt"); // prompt | granted | denied

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          setPermissionState(result.state);
          result.onchange = () => setPermissionState(result.state);
        });
    }
  }, []);

  const handleRequestLocation = () => {
    setError(null);

    if (!navigator.geolocation) {
      setError({ message: "Trình duyệt của bạn không hỗ trợ định vị." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("SUCCESS:", latitude, longitude);

        // save to context/store
        saveLocation({ lat: latitude, lng: longitude });

      },
      (err) => {
        console.error("ERROR:", err);
        if (err.code === 1) {
          setError({
            message:
              "Chúng tôi cần quyền truy cập vị trí để cho bạn trải nghiệm tốt nhất.",
          });
        } else {
          setError({ message: "Không thể lấy vị trí của bạn." });
        }
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div>
      {error && (
        <p style={{ color: "red", marginTop: "8px" }}>
          ⚠ {error.message}
        </p>
      )}

      {permissionState === "denied" && (
        <p style={{ color: "orange", marginTop: "8px" }}>
          Bạn đã chặn quyền truy cập vị trí. Hãy bật lại trong cài đặt trình
          duyệt để sử dụng tính năng này.
        </p>
      )}

      <button className={styles.nearby_button} onClick={handleRequestLocation}>
        <h2 style={{ margin: 0 }}>Staycation gần bạn</h2>
      </button>
    </div>
  );
}
