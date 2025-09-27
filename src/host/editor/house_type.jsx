// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { CircleMinus, CirclePlus, House, DoorOpen } from "lucide-react";
import { useHost } from "../hostContext";
import styles from "../host.module.css";

export default function EditorHouseType() {
  const { host, updateStaycation } = useHost();
  const { staycationId } = useParams();

  const staycation = host?.staycations.find(
    (s) => s.id === parseInt(staycationId, 10)
  );

  if (!staycation) return null;

  const changeType = (type) => {
    if (type === "house") {
      updateStaycation(staycation.id, {
        type,
        numberOfRoom: null,
      });
    } else {
      updateStaycation(staycation.id, {
        type,
        numberOfRoom: staycation.numberOfRoom || 1,
      });
    }
  };

  const decreaseNumberOfRoom = () => {
    if (staycation.numberOfRoom === 1) return;
    updateStaycation(staycation.id, {
      numberOfRoom: staycation.numberOfRoom - 1,
    });
  };

  return (
    <motion.div
      className={styles.pageContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1 style={{ marginBottom: "4px", fontSize: "1.68rem" }}>
        Thay đổi loại chỗ ở
      </h1>

      <div className={styles.house_type_box}>
        <div
          className={styles.house_type_option}
          onClick={() => changeType("house")}
          style={{  boxShadow:  staycation.type === "house" && "rgb(34, 34, 34) 0px 0px 0px 2px" }}
        >
          <div>
            <h2>Toàn bộ căn nhà</h2>
            <div>Khách được sử dụng riêng toàn bộ chỗ ở này</div>
          </div>
          <House size={32} className={styles.house_type_icon} />
        </div>

        <div
          className={styles.house_type_option}
          onClick={() => changeType("room")}
          style={{ boxShadow: staycation.type === "room" && "rgb(34, 34, 34) 0px 0px 0px 2px" }}
        >
          <div>
            <h2>Phòng riêng</h2>
            <div>
              Khách sẽ có phòng riêng trong một ngôi nhà và được sử dụng những
              khu vực chung
            </div>
          </div>
          <DoorOpen size={32} className={styles.house_type_icon} />
        </div>

        {staycation.type === "room" && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "12px",
              padding: "12px",
              borderRadius: "8px",
              alignItems: "center",
              boxShadow: "rgb(34, 34, 34) 0px 0px 0px 2px",
            }}
          >
            <h2
              style={{
                margin: "4px 0",
                fontSize: "1.125rem",
                color: "#000000",
              }}
            >
              Số lượng:
            </h2>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }} >

                <CircleMinus onClick={decreaseNumberOfRoom} color={staycation.numberOfRoom === 1 ? "#B0B0B0" : "#6A6A6A"}
                    size={35} strokeWidth={1}   
                    style={{ cursor: "pointer" }} 
                />

                <p style={{ color: "#000000" }}>{staycation.numberOfRoom}</p>

                <CirclePlus onClick={() => updateStaycation(staycation.id, { numberOfRoom: (staycation.numberOfRoom || 0) + 1 })}
                    size={35} color="#6A6A6A" 
                    strokeWidth={1} style={{ cursor: "pointer" }} 
                />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
