import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { useHost } from "../hostContext";

import styles from "../host.module.css";
import Facebook from "./facebook";
import Instagram from "./instagram";
import Zalo from "./zalo";

export default function EditorContacts() {
    const { host } = useHost();
    const context = useOutletContext() || {};
    const setOpenContactEditor = context.setOpenContactEditor;

    const handleOpen = (type, url) => {
        if (typeof setOpenContactEditor === 'function') {
            setOpenContactEditor({ type, url });
        } else {
            console.error("setOpenContactEditor is not a function or is missing. Context:", context);
        }
    };

    return (
        <motion.div
            className={styles.pageContent}
            style={{ height: "100%", flex: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div style={{ marginBottom: "24px", padding: "0 4px" }}>
                <h1 style={{ marginBottom: "8px", fontSize: "1.68rem" }}>Thông tin liên hệ</h1>
            </div>

            <div className={styles.contacts}>
                <Facebook host={host} handleOpen={handleOpen} />
                <Instagram host={host} handleOpen={handleOpen} />
                <Zalo host={host} handleOpen={handleOpen} />
            </div>
        </motion.div>
    );
}
