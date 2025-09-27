// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Plus } from "lucide-react"
import { useParams } from "react-router-dom";
import { useHost } from "../../hostContext";
import React from "react";
import Photo from "./photo";
import styles from "../../host.module.css"
import heic2any from "heic2any";

export default function EditorCoverImages() {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

    const { host, updateStaycation } = useHost()
    const { staycationId } = useParams();
    
    const staycation = host?.staycations.find(
        (s) => s.id === parseInt(staycationId, 10)
    );

    if (!staycation) return null;

    const removeImage = (index) => {
        updateStaycation(staycation.id, {
            images: staycation.images.filter((_, i) => i !== index),
        });
    };

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

        updateStaycation(staycation.id, {
        images: [...staycation.images, ...newImages],
        });
    };

    const arrangeImage = (index) => {
        if (!staycation.images || index < 0 || index >= staycation.images.length) {
            return;
        }

        const newImages = [...staycation.images];
        const [selectedImage] = newImages.splice(index, 1);
        newImages.unshift(selectedImage);

        updateStaycation(staycation.id, { images: newImages });
    };

    const getEmptySlotIndex = (length) => {

        if (isMobile) return staycation.images.length

        if (length < 3) return 2
        if (length < 5) return 4
        if (length < 7) return 6
        
        return null
    }

    const renderPhoto = (index) => {

        const img = staycation.images[index]

        const emptySlotIndex = getEmptySlotIndex(staycation.images.length)

        // Cover photo
        if (index === 0) return <Photo image={img} cover={true} index={index} addImage={addImage} removeImage={removeImage} arrangeImage={arrangeImage}/> 
        
        // Empty slots
        if (index === emptySlotIndex && img === undefined) return renderEmptyLastImage(addImage) // empty with lasst

        return <Photo image={img} cover={false} index={index} addImage={addImage} removeImage={removeImage} arrangeImage={arrangeImage}/>
    }
    
    const renderEmptyLastImage = (addImage) => {

        return (
            <div className={styles.empty}>
                <div className={`${styles.empty} ${styles.last_photo}`}>
                <label style={{ display: "block", width: "100%", height: "100%", cursor: "pointer" }}>
                    <input type="file" name="image" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => addImage(e.target.files)}/>
                    <div>
                        <Plus size={35} />
                        <span>Thêm ảnh</span>
                    </div>
                </label>
                </div>
            </div>
        )
    }

    if (isMobile) return (

        <motion.div className={styles.pageContent} style={{justifyContent: "unset"}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >

            <div className={styles.mobile_images_area}>
                    
                {[...Array(Math.min(staycation.images.length + 1, 5))].map((_, i) => (
                  <React.Fragment key={i}>{renderPhoto(i)}</React.Fragment>
                ))}

            </div>

        </motion.div>

    )
    
    return (
      <motion.div className={styles.pageContent} style={{justifyContent: "unset"}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
      >
    
        <div className={styles.images_area}>
          {renderPhoto(0)} {/* cover */}
    
        {staycation.images.length >= 0 && (
              <div className={styles.group} >
                {renderPhoto(1)}
                {renderPhoto(2)}
              </div>
          )}

          {staycation.images.length >= 3 && (
              <div className={styles.group} >
                {renderPhoto(3)}
                {renderPhoto(4)}
              </div>
          )}

          {/* {staycation.images.length >= 5 && (
            <div className={styles.group} >
              {renderPhoto(5)}
              {renderPhoto(6)}
            </div>
          )} */}

        </div>

      </motion.div>
    );
}
