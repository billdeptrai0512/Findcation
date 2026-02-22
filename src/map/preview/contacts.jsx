// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { apiClient } from "../../config/api";
import styles from "./contacts.module.css";
import { getContactUrl, isContactVerified } from "../../utils/contactUtils";

import FacebookIcon from "../../assets/facebook.webp";
import InstagramIcon from "../../assets/instagram.webp";
import Zalo from "../../assets/zalo.webp";

export default function Contacts({ staycation, countAsTrafficWarningShown, countAsTrafficContactCancel, countAsTrafficContactContinue }) {

    const countAsTrafficContactClick = (platform, url) => {
        const payload = {
            trafficType: "CONTACT_SUCCESS",
            platform: platform,
            sessionId: localStorage.getItem("traffic_session")
        }

        const endpoint = `${import.meta.env.VITE_BACKEND_URL}/traffic/${staycation.id}`;

        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
            navigator.sendBeacon(endpoint, blob);
        } else {
            apiClient.post(`/traffic/${staycation.id}`, payload);
        }

        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleContactClick = (platform, contactData, baseUrl) => {
        const handle = getContactUrl(contactData);
        if (!handle) return;

        const url = `${baseUrl}${handle}`;

        if (isContactVerified(contactData)) {
            countAsTrafficContactClick(platform, url);
        } else {
            countAsTrafficWarningShown(platform, url);
        }
    };

    const { contacts } = staycation.host;
    const fbUrl = getContactUrl(contacts.facebook);
    const igUrl = getContactUrl(contacts.instagram);
    const zaUrl = getContactUrl(contacts.zalo);

    console.log(contacts)

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
                    {/* IF STAYCATION.LOCATION.VERIFY IS TRUE THEN SHOW SHIELD CHECK */}
                    {staycation.verify && <ShieldCheck size={26} strokeWidth={2} />}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ fontSize: "1.1rem" }}>Thông tin liên hệ</span>
                        {/* <p style={{ fontSize: "0.9rem", color: "#666" }}>Đã xác minh</p> */}
                    </div>
                    {staycation.verify && <ShieldCheck size={26} strokeWidth={2} />}
                </div>
                {/* <p className={styles.contacts_subtitle}>
                    Liên hệ trực tiếp với chủ nhà qua các kênh sau
                </p> */}
            </div>

            <div className={styles.contacts_icons}>

                {fbUrl && (
                    <motion.div
                        className={styles.contact_item}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleContactClick("FACEBOOK", contacts.facebook, "https://www.facebook.com/")}
                    >
                        <div className={styles.contact_link}>
                            <div className={styles.icon_wrapper}>
                                <img src={FacebookIcon} alt="Facebook" />
                            </div>
                            <span className={styles.contact_label}>Facebook</span>
                        </div>
                    </motion.div>
                )}

                {igUrl && (
                    <motion.div
                        className={styles.contact_item}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleContactClick("INSTAGRAM", contacts.instagram, "https://www.instagram.com/")}
                    >
                        <div className={styles.contact_link}>
                            <div className={styles.icon_wrapper}>
                                <img src={InstagramIcon} alt="Instagram" />
                            </div>
                            <span className={styles.contact_label}>Instagram</span>
                        </div>
                    </motion.div>
                )}

                {zaUrl && (
                    <motion.div
                        className={styles.contact_item}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleContactClick("ZALO", contacts.zalo, "https://zalo.me/")}
                    >
                        <div className={styles.contact_link}>
                            <div className={styles.icon_wrapper}>
                                <img src={Zalo} alt="Zalo" />
                            </div>
                            <span className={styles.contact_label}>Zalo</span>
                        </div>
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