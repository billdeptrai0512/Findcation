import { useState, useEffect } from "react";
import { useUserLocation } from "./userLocationContext";
import styles from "./map.module.css";

export default function NearByButton() {
  const { saveLocation } = useUserLocation();
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

    if (permissionState === "denied") {
      return alert("Bạn đã từ chối quyền truy cập vị trí trước đó vì vậy vui lòng bật lại trong cài đặt trình duyệt.")
    }
  
    if (!navigator.geolocation) {
      return alert("Trình duyệt của bạn không hỗ trợ định vị.")
    }
  
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        saveLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        if (err.code === 1) {
          alert("Tính năng này cần thông tin vị trí của bạn để hoạt động.")
        } else {;
          alert("Không thể lấy vị trí của bạn.")
        }
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <button className={styles.nearby_button} onClick={handleRequestLocation}>
      <h2 style={{ margin: 0 }}>Staycation gần tôi</h2>
    </button>
  );
}
