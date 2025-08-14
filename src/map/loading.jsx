import { useState, useEffect } from "react";
import { useLayout } from "./layoutContext";

export default function LoadingScreen() {
  const { saveLocation } = useLayout();
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
    console.log('work here')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("SUCCESS:", pos);
        saveLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
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
    <div style={{ padding: "2em", fontSize: "1.2em", textAlign: "center" }}>
      <h1>Findcation</h1>
      <p>Bản đồ tất cả self-checking staycation ở Việt Nam</p>

      {/* {permissionState === "denied" ? (
        <div style={{ color: "red", marginTop: "1em" }}>
          <p>
            ⚠️ Bạn đã từ chối quyền truy cập vị trí. Ứng dụng cần định vị để hoạt
            động.
          </p>
          <p>
            👉 Vui lòng mở lại quyền định vị trong cài đặt trình duyệt để tiếp tục.
          </p>
          <p>
            Ví dụ: Nhấn vào biểu tượng 🔒 trên thanh địa chỉ → Quyền → Cho phép vị
            trí.
          </p>
        </div>
      ) : (
        
      )} */}

      {error && (
        <div style={{ padding: "1em", fontSize: "0.75em", color: "red" }}>
          {error.message}
        </div>
      )}

      <button onClick={handleRequestLocation}>Bắt đầu</button>

    </div>
  );
}
