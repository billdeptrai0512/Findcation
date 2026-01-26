// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEditorDraft } from "../editorDraftContext";
import { useHost } from "../hostContext";
import { useState } from "react";
import axios from "axios";
import styles from "./footer.module.css"

export default function CompleteButton() {

  const navigate = useNavigate();
  const { draft, hasChanged } = useEditorDraft();
  const { host, refreshHost } = useHost();
  const { staycationId } = useParams();

  // const roomIdNum = parseInt(roomId, 10);
  // const room = draft?.rooms.find(r => r.id === roomIdNum);

  const [loading, setLoading] = useState(false);

  const location = useLocation()
  const path = location.pathname.split("/").filter(Boolean);

  const handleSaveDetails = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${staycationId}/editor`,
        draft
      );

      console.log("Saved:", response.data);

      refreshHost()

      navigate(`/host/${host.id}/editor/${staycationId}`);

    } catch (error) {
      console.error("Error saving title:", error);
    } finally {
      setLoading(false)
    }
  };

  const handleSaveImages = async () => {
    try {
      const formData = new FormData();

      // keep only already-uploaded URLs
      const existing = draft.images.filter((img) => typeof img === "string");
      formData.append("existingImages", JSON.stringify(existing));

      // append new files
      if (draft.images.length > 10) return alert('Tối đa 10 hình')
      draft.images.forEach((img) => {
        if (img.file && img.file.size < 5 * 1024 * 1024)
          formData.append("images", img.file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${staycationId}/editor/cover-images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Images updated:", response.data);

      // keep context in sync
      refreshHost()

      navigate(`/host/${host.id}/editor/${staycationId}`);

    } catch (err) {
      console.error("Image save failed", err);
    }
  };

  // const handleSaveRoomImages = async () => {
  //   try {
  //     const formData = new FormData();

  //     // room name
  //     formData.append("name", room.name);

  //     // keep only already-uploaded URLs (strings)
  //     const existing = room.images.filter((img) => typeof img === "string");
  //     formData.append("existingImages", JSON.stringify(existing));

  //     // append new files
  //     room.images.forEach((img) => {
  //       if (img.file) formData.append("images", img.file);
  //     });

  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${staycationId}/editor/rooms/${room.id}`,
  //       formData, // ✅ use formData here!
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     console.log("Room images updated:", response.data);

  //     refreshHost()

  //     navigate(`/host/${host.id}/editor/${staycationId}/rooms`);
  //   } catch (err) {
  //     console.error("Upload failed", err);
  //   }
  // };

  const handleClick = () => {

    const lastSegment = path[path.length - 1];

    console.log(lastSegment)
    if (lastSegment === "images") {
      handleSaveImages();
    } else {
      handleSaveDetails();
    }

  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={!hasChanged || loading}
      className={styles.upload_button}
      whileHover={hasChanged && !loading ? { scale: 1.05 } : {}}
      whileTap={hasChanged && !loading ? { scale: 0.95 } : {}}
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
