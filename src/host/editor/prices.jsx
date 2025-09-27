// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { MoveDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { useHost } from "../hostContext";
import styles from "../host.module.css";

export default function EditorPrices() {
  const { host, updateStaycation } = useHost();
  const { staycationId } = useParams();

  const staycation = host?.staycations.find(
    (s) => s.id === parseInt(staycationId, 10)
  );

  const [editing, setEditing] = useState(null);

  const handleMinChange = (e) => {
    const price = e.target.value.replace(/\D/g, "");
    updateStaycation(staycation.id, {
      prices: { ...staycation.prices, min: price === "" ? null : price },
    });
  };

  const handleMaxChange = (e) => {
    const price = e.target.value.replace(/\D/g, "");
    updateStaycation(staycation.id, {
      prices: { ...staycation.prices, max: price === "" ? null : price },
    });
  };

  const formatPrice = (price) => {
    if (!price) return "";
    return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
  };

  return (
    <motion.div
      className={styles.pageContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1 style={{ marginBottom: "4px", fontSize: "1.68rem" }}>Thay đổi bảng giá</h1>

      <div className={styles.price_setup}>
        {/* Min Price */}
        <input
          type="text"
          className={styles.price_input}
          value={
            editing === "min"
              ? staycation?.prices.min ?? ""
              : formatPrice(staycation?.prices.min)
          }
          onFocus={() => setEditing("min")}
          onBlur={() => setEditing(null)}
          onChange={handleMinChange}
          placeholder="240,000đ"
        />

        <MoveDown size={40} style={{ margin: "0 12px" }} />

        {/* Max Price */}
        <input
          type="text"
          className={styles.price_input}
          value={
            editing === "max"
              ? staycation?.prices.max ?? ""
              : formatPrice(staycation?.prices.max)
          }
          onFocus={() => setEditing("max")}
          onBlur={() => setEditing(null)}
          onChange={handleMaxChange}
          placeholder="680,000đ"
        />
      </div>
    </motion.div>
  );
}
