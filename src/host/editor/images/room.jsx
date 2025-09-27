// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { useHost } from "../../hostContext";
import React from "react";
import Photo from "./photo";
import styles from "../../host.module.css";
import heic2any from "heic2any";

export default function EditorRoomImages() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { staycationId, roomId } = useParams();
  const { host, updateStaycation } = useHost();

  const staycation = host?.staycations.find(
    (s) => s.id === parseInt(staycationId, 10)
  );

  const room = staycation?.rooms.find(
    (r) => r.id === parseInt(roomId, 10)
  );

  if (!room) return null;

  // update room name
  const handleNameChange = (e) => {
    const newRooms = staycation.rooms.map((r) =>
      r.id === room.id ? { ...r, name: e.target.value } : r
    );
    updateStaycation(staycation.id, { rooms: newRooms });
  };

  // remove image from room
  const removeImage = (index) => {
    const newRooms = staycation.rooms.map((r) =>
      r.id === room.id
        ? { ...r, images: r.images.filter((_, i) => i !== index) }
        : r
    );
    updateStaycation(staycation.id, { rooms: newRooms });
  };

  // add image to room
  const addImage = async (files) => {
    const convertFile = async (file) => {
      const isHeic =
        file.type === "image/heic" ||
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif");

      if (isHeic) {
        try {
          const blob = await heic2any({ blob: file, toType: "image/jpeg" });
          return { file, url: URL.createObjectURL(blob) };
        } catch (err) {
          console.warn("HEIC conversion failed, fallback to raw", err);
        }
      }
      return { file, url: URL.createObjectURL(file) };
    };

    let newImages = [];
    if (files.length > 1) {
      newImages = await Promise.all(Array.from(files).map(convertFile));
    } else {
      newImages = [await convertFile(files[0])];
    }

    const newRooms = staycation.rooms.map((r) =>
      r.id === room.id ? { ...r, images: [...r.images, ...newImages] } : r
    );
    updateStaycation(staycation.id, { rooms: newRooms });
  };

  // move an image to first position
  const arrangeImage = (index) => {
    if (!room.images || index < 0 || index >= room.images.length) {
      return;
    }

    const newImages = [...room.images];
    const [selectedImage] = newImages.splice(index, 1);
    newImages.unshift(selectedImage);

    const newRooms = staycation.rooms.map((r) =>
      r.id === room.id ? { ...r, images: newImages } : r
    );
    updateStaycation(staycation.id, { rooms: newRooms });
  };

  const getEmptySlotIndex = (length) => {

    if (isMobile) return room.images.length

    if (length < 3) return 2;
    if (length < 5) return 4;
    if (length < 7) return 6;

    return null;
  };

  const renderPhoto = (index) => {
    const img = room.images[index];
    const emptySlotIndex = room.images.length; // simpler than getEmptySlotIndex

    // Cover photo (slot 0)
    if (index === 0) {
      if (room.images[0] === undefined) {
        return renderEmptyLastImage(addImage);
      }
      return (
        <Photo
          image={img}
          cover={true}
          index={index}
          addImage={addImage}
          removeImage={removeImage}
          arrangeImage={arrangeImage}
        />
      );
    }

    // Empty slot
    if (index === emptySlotIndex && img === undefined) {
      return renderEmptyLastImage(addImage);
    }

    // Normal photo
    return (
      <Photo
        image={img}
        cover={false}
        index={index}
        addImage={addImage}
        removeImage={removeImage}
        arrangeImage={arrangeImage}
      />
    );
  };


  const renderEmptyLastImage = (addImage) => {
    return (
      <div className={styles.empty}>
        <div className={`${styles.empty} ${styles.last_photo}`}>
          <label  style={{ display: "block", width: "100%",  height: "100%", cursor: "pointer" }}  >
            <input type="file" name="image" accept="image/*" multiple  style={{ display: "none" }}  onChange={(e) => addImage(e.target.files)} />
            <div>
              <Plus size={35} />
              <span>Thêm ảnh</span>
            </div>
          </label>
        </div>
      </div>
    );
  };

  if (isMobile)
    return (
      <motion.div
        className={styles.pageContent} style={{justifyContent: "unset"}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <input
          style={{ marginBottom: "8px", fontSize: "1rem", padding: "6px" }}
          value={room.name}
          onChange={handleNameChange}
          placeholder="Tên phòng"
        />

        <div className={styles.mobile_images_area}>
            {[...Array(Math.min(room.images.length + 1, 5))].map((_, i) => (
              <React.Fragment key={i}>{renderPhoto(i)}</React.Fragment>
            ))}
        </div>
      </motion.div>
    );

  return (
    <motion.div
      className={styles.pageContent} style={{justifyContent: "unset"}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <input
        style={{ marginBottom: "8px", fontSize: "1rem", padding: "6px" }}
        value={room.name}
        onChange={handleNameChange}
        placeholder="Tên phòng"
      />

      <div className={styles.images_area}>
        {renderPhoto(0)} {/* cover */}

          {room.images.length > 0 && (
              <div className={styles.group} >
                {renderPhoto(1)}
                {renderPhoto(2)}
              </div>
          )}

        {room.images.length >= 3 && (
          <div className={styles.group}>
            {renderPhoto(3)}
            {renderPhoto(4)}
          </div>
        )}

      </div>
    </motion.div>
  );
}

