import { useListing } from "../listingContext";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./image.module.css"
import Camera from "../../assets/camera.png"
import Area from "./area";

export default function ImageUpload() {

    const {listing, uploadImages} = useListing()

    const { setStepValidity, currentStep } = useOutletContext();

    useEffect(() => {
        setStepValidity((prev) => ({
          ...prev,
          [currentStep]: listing.images.length > 0
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing.images]);

    if (listing.images.length === 0) return (

        <motion.div className={styles.pageContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <h1 style={{marginBottom: "4px", fontSize: "1.68rem"}}>Bổ sung ảnh staycation của bạn</h1>
            <div className={styles.intrustion} style={{paddingBottom: "8px", color: "#6A6A6A"}}>
                Bạn cần ít nhất 1 tấm ảnh để bắt đầu.
            </div>
            <div className={styles.upload_area}>
                <div>
                    <img src={Camera} alt="" style={{height:"168px"}} />
                </div>
                <label>
                    <input type="file" name="image" accept="image/*"  multiple style={{ display: "none" }} onChange={(e) => uploadImages(e.target.files)}/>
                    Thêm ảnh
                </label>
            </div>
        </motion.div>
    )

    return <Area />
}
