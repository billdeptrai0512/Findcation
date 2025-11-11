// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useHost } from "./hostContext";
import { useState } from "react";
import axios from "axios";
import styles from "./footer/footer.module.css"

export default function DeleteButton() {

  const navigate = useNavigate();
  const { host, refreshHost } = useHost();
  const { staycationId } = useParams();

  const staycation = host?.staycations.find(
    (s) => s.id === parseInt(staycationId, 10)
  );

  const [loading, setLoading] = useState(false);


  const handleDelete = async () => {
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${staycationId}`, staycation );

        console.log("Deleted:", response.data);

        refreshHost();

        alert("Xóa thành công!");

        navigate(`/host/${host.id}`);

    } catch (error) {
        console.error("Error saving title:", error);
    } finally {
        setLoading(true)
    }
  };


  return (
    <motion.button
      onClick={handleDelete}
      style={{padding: "12px 12px", color: "#FFF", background:"#000"}}
      className={styles.upload_button}
      whileHover={!loading ? { scale: 1.05 } : {}}
      whileTap={!loading ? { scale: 0.95 } : {}}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.div
            key="spinner"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={styles.spinner}
          />
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            Xóa staycation
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
