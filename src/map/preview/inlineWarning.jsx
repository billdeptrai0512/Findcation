import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { AlertTriangle } from "lucide-react";
import styles from "./preview.module.css";

export default function InlineWarning({ staycation, onCancel, onContinue }) {

    return (
        <motion.div
            className={styles.inline_warning_container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
        >
            {/* Header */}
            <div className={styles.inline_warning_header}>
                <AlertTriangle size={22} strokeWidth={2.5} />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Lưu ý</span>
                    {/* <p style={{ fontSize: "0.9rem", color: "#666" }}>Đã xác minh</p> */}
                </div>
                <AlertTriangle size={22} strokeWidth={2.5} />
            </div>

            {/* Body */}
            <div className={styles.inline_warning_body}>
                <p>
                    {staycation.name} này chưa xác thực kênh liên lạc này với Findcation.
                    <br />
                    Vui lòng thận trọng khi liên hệ.
                </p>
            </div>

            {/* Buttons */}
            <div className={styles.inline_warning_buttons}>
                <motion.button
                    className={styles.inline_warning_cancel}
                    onClick={onCancel}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Hủy
                </motion.button>

                <motion.button
                    className={styles.inline_warning_continue}
                    onClick={onContinue}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Tiếp tục
                </motion.button>
            </div>
        </motion.div>
    );
}

InlineWarning.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onContinue: PropTypes.func.isRequired
};
