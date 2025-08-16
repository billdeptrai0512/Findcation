import { useState, useEffect } from "react";
import { useUserLocation } from "./userLocationContext";
import { useStaycation } from "./staycationContext";


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

  const handleRequestLocation = () => {
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("SUCCESS:", pos);
        saveLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude});
        //success
        console.log('start fetch all staycation on map')

        fetchStaycations()
      },
      (err) => {
        console.error("ERROR:", err);
        if (err.code === 1) {
          setError({
            message:
              "Chúng tôi cần quyền truy cập vị trí để cho bạn trải nghiệm tốt nhất ",
          });
        } else {
          setError(err);
        }
      },
      { enableHighAccuracy: true }
    );
  };



  return (
    <div style={{ padding: "2em", fontSize: "1.1075em" }}>
      <h1 style={{marginBottom: "8px"}}>Findcation</h1>
      <span>Bản đồ tất cả self-checking staycation ở Việt Nam</span>

      {error && (
        <div style={{ padding: "1em", fontSize: "0.75em", color: "red" }}>
          {error.message}
        </div>
      )}

    <div style={{ marginTop: "16px" }}>
      <button
        onClick={handleRequestLocation}
        style={{
          padding: "16px 32px",
          borderRadius: "8px",
          background: "linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "0.975rem",
          fontWeight: "500",
          fontFamily: "'Inter', sans-serif"
        }}
      >
        Bắt đầu
      </button>
    </div>
      

    </div>
  );
}
