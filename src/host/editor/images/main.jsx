// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Plus } from "lucide-react"
import { useEditorDraft } from "../../editorDraftContext";
import { convertHEIC } from "../../../utils/convertHeic";
import React from "react";
import Photo from "./photo";
import styles from "../../host.module.css"

export default function EditorImages() {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const { draft, setDraft } = useEditorDraft();

    const removeImage = (index) => {

        setDraft(prev => ({
            ...prev,
            images: draft.images.filter((_, i) => i !== index),
        }));

    };

    const addImage = async (files) => {

        console.log(files)

        const convertFile = async (file) => {
            const isHeic =
                file.type === "image/heic" ||
                file.name.toLowerCase().endsWith(".heic") ||
                file.name.toLowerCase().endsWith(".heif");

            if (isHeic) {
                try {
                    const blob = await convertHEIC(file);
                    return { file, url: URL.createObjectURL(blob) };
                } catch (err) {
                    console.warn("HEIC conversion failed, fallback to raw", err);
                }
            }
            return { file, url: URL.createObjectURL(file) };
        };


        //Prevent if there is file bigger than 5MB
        let newImages = [];
        if (files.length > 1) {
            newImages = await Promise.all(Array.from(files).map(convertFile));
        } else {
            newImages = [await convertFile(files[0])];
        }

        setDraft(prev => ({
            ...prev,
            images: [...draft.images, ...newImages],
        }));

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

        <motion.div className={styles.pageContent} style={{ justifyContent: "unset" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >

            <h1 style={{ margin: "0px", fontSize: "1.68em", }}>Thay đổi ảnh</h1>

            <div className={styles.mobile_images_area}>

                {[...Array(draft.images.length + 1)].map((_, i) => (
                    <React.Fragment key={i}>{renderPhoto(i)}</React.Fragment>
                ))}

            </div>

        </motion.div>

    )

    return (
        <motion.div className={styles.pageContent} style={{ justifyContent: "unset" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >

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
