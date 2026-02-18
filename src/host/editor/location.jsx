// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useEditorDraft } from "../editorDraftContext";
import styles from "../host.module.css";
import ConfirmMap from "./map";
import DeleteButton from "../footer/delete";

export default function EditorLocation() {
  const { draft, setDraft } = useEditorDraft();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleChangeDetails = (e) => {
    const { name, value } = e.target;
    setDraft(prev => ({
      ...prev,
      location: {
        ...prev.location,
        details: {
          ...prev.location.details,
          [name]: value,
        },
      },
    }));
  };

  const handleChangeGPS = (center) => {
    setDraft(prev => ({
      ...prev,
      location: {
        ...prev.location,
        gps: center,
      },
    }));
  };

  return (
    <motion.div
      className={styles.pageContent}
      style={{ padding: "0px 4px", minWidth: isMobile ? "unset" : "630px", height: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h2 style={{ margin: "0", marginBottom: "4px", paddingLeft: "unset", fontWeight: "600" }} >
        Thay đổi địa chỉ và định vị
      </h2>

      <div style={{ minHeight: "420px" }}>
        <div className={styles.address_details}>
          <input
            type="text"
            name="street"
            placeholder="Địa chỉ"
            value={draft.location.details.street}
            onChange={handleChangeDetails}
          />
          <input
            type="text"
            name="ward"
            placeholder="Phường"
            value={draft.location.details.ward}
            onChange={handleChangeDetails}
          />
          <input
            type="text"
            name="city"
            placeholder="Thành phố"
            value={draft.location.details.city}
            onChange={handleChangeDetails}
          />
          <input
            type="text"
            name="building"
            placeholder="Tên tòa nhà, căn hộ (nếu có)"
            value={draft.location.details.building}
            onChange={handleChangeDetails}
          />
        </div>

        <div className={styles.details_map}>
          <ConfirmMap
            location={draft.location}
            handleChangeGPS={handleChangeGPS}
          />
        </div>

        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
          <DeleteButton />
        </div>
      </div>
    </motion.div>
  );
}
