/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useHost } from "../hostContext";
import { motion } from "framer-motion";
import styles from "../host.module.css"

export default function EditorTitle() {

    const { host, updateStaycation } = useHost()
    const { staycationId } = useParams();
    
    const staycation = host?.staycations.find(
        (s) => s.id === parseInt(staycationId, 10)
    );

    return (
        <motion.div className={styles.pageContent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >   
            <h1 style={{marginBottom: "4px", fontSize: "1.68rem"}}>Thay đổi tiêu đề chổ ở</h1>
            <textarea className={styles.textarea} rows={5} value={staycation?.name}
                onChange={(e) => {
                    if (e.target.value.length > 32) return
                    updateStaycation(staycation.id, { name: e.target.value })
                }}
            />
            <div className={styles.words_limit} >
                {staycation?.name.length} / 32
            </div>

        </motion.div>
    )
}