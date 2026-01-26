import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { AlertTriangle } from "lucide-react";
import styles from "./preview.module.css";

export default function InlineWarning({ onCancel, onContinue }) {

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
                <AlertTriangle size={20} strokeWidth={2.5} />
                <h3>Lưu ý</h3>
            </div>

            {/* Body */}
            <div className={styles.inline_warning_body}>
                <p>
                    Staycation này chưa được xác minh bởi Findcation.
                    <br />
                    Vui lòng thận trọng khi liên hệ với chủ nhà.
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
