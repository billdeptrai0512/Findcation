// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useListing } from "../listingContext";
import { useStaycation } from "../../map/staycationContext";
import { useAuth } from "../../auth/authContext";
import { useState } from "react";
import styles from "../listing.module.css";

export default function CompleteButton({ page, steps, stepValidity }) {
  const { uploadListingOnDatabase, resetListing } = useListing();
  const { fetchStaycations, setNewStaycation } = useStaycation();
  const { user } = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUploadListing = async () => {
    if (!user) return console.log("no user");

    setLoading(true); // show spinner
    try {
      const created = await uploadListingOnDatabase(user);
      setNewStaycation(created);
      resetListing();
      await fetchStaycations();
      navigate("/");
    } catch (err) {
      console.error("Error uploading listing:", err);
    } finally {
      setLoading(false); // reset spinner if needed
    }
  };

  return (
    <motion.button
      onClick={handleUploadListing}
      className={styles.upload_button}
      disabled={!stepValidity[steps[page]] || loading}
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
            Hoàn tất
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
