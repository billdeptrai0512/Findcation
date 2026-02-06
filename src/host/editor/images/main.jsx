// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Plus, Loader2 } from "lucide-react"
import { useEditorDraft } from "../../editorDraftContext";
import { processImage } from "../../../utils/imageProcessor";
import React, { useState } from "react";
import Photo from "./photo";
import styles from "../../host.module.css"

export default function EditorImages() {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const { draft, setDraft } = useEditorDraft();
    const [isCompressing, setIsCompressing] = useState(false);

    const removeImage = (index) => {

        setDraft(prev => ({
            ...prev,
            images: (prev.images || []).filter((_, i) => i !== index),
        }));

    };

    const addImage = async (files) => {

        if (!files || files.length === 0) {
            console.warn("No files provided to addImage");
            return;
        }

        setIsCompressing(true);

        try {
            console.log(`Processing ${files.length} image(s)...`);

            // Process all files (HEIC conversion + compression)
            const newImages = await Promise.all(
                Array.from(files).map(processImage)
            );

            console.log("Processed images:", newImages.map(img => ({
                name: img.file.name,
                size: (img.file.size / 1024 / 1024).toFixed(2) + 'MB'
            })));

            setDraft(prev => ({
                ...prev,
                images: [...(prev.images || []), ...newImages],
            }));
        } finally {
            setIsCompressing(false);
        }

    };

    const arrangeImage = (index) => {
        if (!draft.images || index < 0 || index >= draft.images.length) {
            return;
        }

        const newImages = [...draft.images];
        const [selectedImage] = newImages.splice(index, 1);
        newImages.unshift(selectedImage);

        setDraft(prev => ({
            ...prev,
            images: newImages,
        }));

    };

    const getEmptySlotIndex = (length) => {

        if (isMobile) return draft.images.length

        if (length < 3) return 2
        if (length < 5) return 4
        if (length < 7) return 6

        return null
    }

    const renderPhoto = (index) => {

        const img = draft.images[index]

        const emptySlotIndex = getEmptySlotIndex(draft.images.length)

        // Cover photo
        if (index === 0) return <Photo image={img} cover={true} index={index} addImage={addImage} removeImage={removeImage} arrangeImage={arrangeImage} />

        // Empty slots
        if (index === emptySlotIndex && img === undefined) return renderEmptyLastImage(addImage) // empty with lasst

        return <Photo image={img} cover={false} index={index} addImage={addImage} removeImage={removeImage} arrangeImage={arrangeImage} />
    }

    const renderEmptyLastImage = (addImage) => {

        return (
            <div className={styles.empty}>
                <div className={`${styles.empty} ${styles.last_photo}`}>
                    <label style={{ display: "block", width: "100%", height: "100%", cursor: "pointer" }}>
                        <input type="file" name="image" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => addImage(e.target.files)} />
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

        <motion.div className={styles.pageContent} style={{ justifyContent: "unset", position: "relative" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >

            {/* Loading Overlay */}
            {isCompressing && (
                <div className={styles.compression_overlay}>
                    <div className={styles.compression_modal}>
                        <Loader2 size={32} className={styles.compression_spinner} />
                        <span>Đang nén ảnh...</span>
                    </div>
                </div>
            )}

            <h1 style={{ margin: "0px", fontSize: "1.68em", }}>Thay đổi ảnh</h1>

            <div className={styles.mobile_images_area}>

                {[...Array(draft.images.length + 1)].map((_, i) => (
                    <React.Fragment key={i}>{renderPhoto(i)}</React.Fragment>
                ))}

            </div>

        </motion.div>

    )

    return (
        <motion.div className={styles.pageContent} style={{ justifyContent: "unset", position: "relative" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >

            {/* Loading Overlay */}
            {isCompressing && (
                <div className={styles.compression_overlay}>
                    <div className={styles.compression_modal}>
                        <Loader2 size={32} className={styles.compression_spinner} />
                        <span>Đang nén ảnh...</span>
                    </div>
                </div>
            )}

            <h1 style={{ margin: "0px", fontSize: "1.68em" }}>Thay đổi ảnh</h1>

            <div className={styles.images_area}>
                {renderPhoto(0)} {/* cover */}

                {draft.images.length >= 0 && (
                    <div className={styles.group} >
                        {renderPhoto(1)}
                        {renderPhoto(2)}
                    </div>
                )}

                {draft.images.length >= 3 && (
                    <div className={styles.group} >
                        {renderPhoto(3)}
                        {renderPhoto(4)}
                    </div>
                )}

                {draft.images.length >= 5 && (
                    <div className={styles.group} >
                        {renderPhoto(5)}
                        {renderPhoto(6)}
                    </div>
                )}

                {draft.images.length >= 7 && (
                    <div className={styles.group} >
                        {renderPhoto(7)}
                        {renderPhoto(8)}
                    </div>
                )}

                {draft.images.length >= 9 && (
                    <div className={styles.group} >
                        {renderPhoto(9)}
                        {renderPhoto(10)}
                    </div>
                )}

                {draft.images.length >= 11 && (
                    <div className={styles.group} >
                        {renderPhoto(11)}
                        {renderPhoto(12)}
                    </div>
                )}

                {draft.images.length >= 13 && (
                    <div className={styles.group} >
                        {renderPhoto(13)}
                        {renderPhoto(14)}
                    </div>
                )}

                {draft.images.length >= 15 && (
                    <div className={styles.group} >
                        {renderPhoto(15)}
                        {renderPhoto(16)}
                    </div>
                )}

                {/* main reason it stop at 5 because if user upload more than 5 picture one time it will crash */}

            </div>

        </motion.div>
    );
}
