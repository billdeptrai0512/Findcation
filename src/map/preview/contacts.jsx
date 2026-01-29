// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { apiClient } from "../../config/api";
import styles from "./contacts.module.css";

import FacebookIcon from "../../assets/facebook.webp";
import InstagramIcon from "../../assets/instagram.webp";
import Zalo from "../../assets/zalo.webp";

export default function Contacts({ staycation }) {

    const countAsTrafficContactClick = (platform) => {

        const payload = {
            trafficType: "CONTACT_SUCCESS",
            platform: platform,
            sessionId: localStorage.getItem("traffic_session")
        }

        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
            navigator.sendBeacon(`/traffic/${staycation.id}`, blob);
        } else {
            apiClient.post(`/traffic/${staycation.id}`, payload);
        }
    };

    const { contacts } = staycation.host;

    return (
        <motion.div
            className={styles.contacts_container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header with security badge */}
            <div className={styles.contacts_header}>
                <div className={styles.security_badge} style={{ justifyContent: `${staycation.verify ? "space-between" : "center"}` }}>
                    {!staycation.verify && <ShieldCheck size={26} strokeWidth={2.5} />}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ fontSize: "1.1rem" }}>Thông tin liên hệ</span>
                        <p style={{ fontSize: "0.9rem", color: "#666" }}>Đã xác minh</p>
                    </div>
                    {!staycation.verify && <ShieldCheck size={26} strokeWidth={2.5} />}
                </div>
                {/* <p className={styles.contacts_subtitle}>
                    Liên hệ trực tiếp với chủ nhà qua các kênh sau
                </p> */}
            </div>

            {/* Contact icons */}
            <div className={styles.contacts_icons}>

                {contacts.facebook !== "" && (
                    <motion.div
                        className={styles.contact_item}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href={`https://www.facebook.com/${contacts.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => countAsTrafficContactClick("FACEBOOK")}
                            className={styles.contact_link}
                        >
                            <div className={styles.icon_wrapper}>
                                <img src={FacebookIcon} alt="Facebook" />
                            </div>
                            <span className={styles.contact_label}>Facebook</span>
                        </a>
                    </motion.div>
                )}

                {contacts.instagram !== "" && (
                    <motion.div
                        className={styles.contact_item}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href={`https://www.instagram.com/${contacts.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => countAsTrafficContactClick("INSTAGRAM")}
                            className={styles.contact_link}
                        >
                            <div className={styles.icon_wrapper}>
                                <img src={InstagramIcon} alt="Instagram" />
                            </div>
                            <span className={styles.contact_label}>Instagram</span>
                        </a>
                    </motion.div>
                )}

                {contacts.zalo !== "" && (
                    <motion.div
                        className={styles.contact_item}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href={`https://zalo.me/${contacts.zalo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => countAsTrafficContactClick("ZALO")}
                            className={styles.contact_link}
                        >
                            <div className={styles.icon_wrapper}>
                                <img src={Zalo} alt="Zalo" />
                            </div>
                            <span className={styles.contact_label}>Zalo</span>
                        </a>
                    </motion.div>
                )}

            </div>

            {/* Trust footer */}
            {/* <div className={styles.contacts_footer}>
                <p>💡 Mẹo: Hỏi về giá, vị trí và tiện nghi trước khi đặt phòng</p>
            </div> */}

        </motion.div>
    )
}