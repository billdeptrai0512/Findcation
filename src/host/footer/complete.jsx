// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useHost } from "../hostContext";
import { useState } from "react";
import axios from "axios";
import styles from "./footer.module.css"

export default function CompleteButton() {

  const navigate = useNavigate();

  const { host, updateStaycation } = useHost();

  const { staycationId, roomId } = useParams();

  const staycation = host?.staycations.find(
    (s) => s.id === parseInt(staycationId, 10)
  );

  const room = staycation?.rooms.find(
    (r) => r.id === parseInt(roomId, 10)
  );

  const [loading, setLoading] = useState(false);

  const location = useLocation()
  const path = location.pathname.split("/").filter(Boolean);

  const handleSaveDetails = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${staycationId}/editor`
          , staycation ,
          { headers: { "ngrok-skip-browser-warning": "true" } }
      );

      console.log("Saved:", response.data);

      updateStaycation(staycation.id, response.data.staycation);

      navigate(`/host/${host.id}/editor/${staycationId}`);

    } catch (error) {
      console.error("Error saving title:", error);
    } finally {
      setLoading(true)
    }
  };

  const handleSaveImages = async () => {
    try {
      const formData = new FormData();

      // keep only already-uploaded URLs
      const existing = staycation.images.filter((img) => typeof img === "string");
      formData.append("existingImages", JSON.stringify(existing));

      // append new files
      staycation.images.forEach((img) => {
        if (img.file) formData.append("images", img.file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${staycationId}/editor/cover-images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Images updated:", response.data);

      // keep context in sync
      updateStaycation(staycation.id, response.data.staycation);

      navigate(`/host/${host.id}/editor/${staycationId}/rooms`);

    } catch (err) {
      console.error("Image save failed", err);
    }
  };

  const handleSaveRoomImages = async () => {
    try {

      const formData = new FormData();

      // keep the room name if editable
      formData.append("name", room.name);

      // keep only already-uploaded URLs (strings)
      const existing = room.images.filter((img) => typeof img === "string");
      formData.append("existingImages", JSON.stringify(existing));

      // append new files
      room.images.forEach((img) => {
        if (img.file) formData.append("images", img.file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${staycationId}/editor/rooms/${room.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Room images updated:", response.data);

      // update context so host state stays in sync
      updateStaycation(staycation.id, {
        rooms: staycation.rooms.map((r) =>
          r.id === room.id ? response.data.room : r
        ),
      });

      // optionally navigate back to rooms list
      navigate(`/host/${host.id}/editor/${staycationId}/rooms`);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };


  const handleClick = () => {
    if (path.includes("rooms")) {
      const lastSegment = path[path.length - 1];

      if (lastSegment === "cover-images") {
        handleSaveImages();  
      } else {
        handleSaveRoomImages(); 
      }
    } else {
      handleSaveDetails();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
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
            Lưu
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
