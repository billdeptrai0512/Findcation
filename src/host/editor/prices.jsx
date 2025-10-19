// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { MoveDown } from "lucide-react";
import { useEditorDraft } from "../editorDraftContext";
import styles from "../host.module.css";

export default function EditorPrices() {
  
  const { draft, setDraft } = useEditorDraft();
  const [editing, setEditing] = useState(null);

  const handleMinChange = (e) => {
    const price = e.target.value.replace(/\D/g, "");

    setDraft(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        min: price === "" ? null : price,
      },
    }));

  };

  const handleMaxChange = (e) => {
    const price = e.target.value.replace(/\D/g, "");
    setDraft(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        max: price === "" ? null : price,
      },
    }));
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
              ? draft?.prices.min ?? ""
              : formatPrice(draft?.prices.min)
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
              ? draft?.prices.max ?? ""
              : formatPrice(draft?.prices.max)
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
