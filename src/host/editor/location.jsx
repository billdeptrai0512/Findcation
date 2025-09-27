// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useHost } from "../hostContext";
import styles from "../host.module.css";
import ConfirmMap from "./map";

export default function EditorLocation() {
  const { host, updateStaycation } = useHost();
  const { staycationId } = useParams();

  const staycation = host?.staycations.find(
    (s) => s.id === parseInt(staycationId, 10)
  );

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleChangeDetails = (e) => {
    const { name, value } = e.target;
    updateStaycation(staycation.id, {
      location: {
        ...staycation.location,
        details: {
          ...staycation.location.details,
          [name]: value,
        },
      },
    });
  };

  const handleChangeGPS = (center) => {
    updateStaycation(staycation.id, {
      location: {
        ...staycation.location,
        gps: center,
      },
    });
  };

  return (
    <motion.div
      className={styles.pageContent}
      style={{ padding: "0px 4px",  minWidth: isMobile ? "unset" : "630px",  height: "100%"}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
    <h2 style={{  margin: "0",  marginBottom: "4px", paddingLeft: "unset", fontWeight: "600" }} >
        Thay đổi địa chỉ và định vị
      </h2>

      <div style={{ minHeight: "420px" }}>
        <div className={styles.address_details}>
          <input
            type="text"
            name="street"
            placeholder="Địa chỉ"
            value={staycation.location.details.street}
            onChange={handleChangeDetails}
          />
          <input
            type="text"
            name="ward"
            placeholder="Phường"
            value={staycation.location.details.ward}
            onChange={handleChangeDetails}
          />
          <input
            type="text"
            name="city"
            placeholder="Thành phố"
            value={staycation.location.details.city}
            onChange={handleChangeDetails}
          />
          <input
            type="text"
            name="building"
            placeholder="Tên tòa nhà, căn hộ (nếu có)"
            value={staycation.location.details.building}
            onChange={handleChangeDetails}
          />
        </div>

        <div className={styles.details_map}>
          <ConfirmMap
            location={staycation.location}
            handleChangeGPS={handleChangeGPS}
          />
        </div>
      </div>
    </motion.div>
  );
}
