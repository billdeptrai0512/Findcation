// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ShieldCheck } from "lucide-react";
import { apiClient } from "../../config/api";
import styles from "./contacts.module.css";

import FacebookIcon from "../../assets/facebook.webp";
import InstagramIcon from "../../assets/instagram.webp";
import Zalo from "../../assets/zalo.webp";

export default function Contacts({ staycation }) {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleClick = (platform, url) => async (e) => {
        e.preventDefault(); // prevent default navigation

        await apiClient.post(`/traffic/${staycation.id}`, {
            trafficType: "CONTACT_SUCCESS",
            platform: platform,
            sessionId: localStorage.getItem("traffic_session")
        });

        window.open(url, "_blank");
    };

    const { contacts } = staycation.host;
    const facebookUrl = isMobile ? `fb://page/` : `https://www.facebook.com/`
    const instagramUrl = isMobile ? `instagram://user?username=` : `https://www.instagram.com/`

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
                    {staycation.verify && <ShieldCheck size={22} strokeWidth={2.5} />}
                    <span style={{ fontSize: "1.1rem" }}>Thông tin liên hệ</span>
                    {staycation.verify && <ShieldCheck size={22} strokeWidth={2.5} />}
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
                        <Link
                            to={`${facebookUrl}${contacts.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick("FACEBOOK", `${facebookUrl}${contacts.facebook}`)}
                            className={styles.contact_link}
                        >
                            <div className={styles.icon_wrapper}>
                                <img src={FacebookIcon} alt="Facebook" />
                            </div>
                            <span className={styles.contact_label}>Facebook</span>
                        </Link>
                    </motion.div>
                )}

                {contacts.instagram !== "" && (
                    <motion.div
                        className={styles.contact_item}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to={`${instagramUrl}${contacts.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick("INSTAGRAM", `${instagramUrl}${contacts.instagram}`)}
                            className={styles.contact_link}
                        >
                            <div className={styles.icon_wrapper}>
                                <img src={InstagramIcon} alt="Instagram" />
                            </div>
                            <span className={styles.contact_label}>Instagram</span>
                        </Link>
                    </motion.div>
                )}

                {contacts.zalo !== "" && (
                    <motion.div
                        className={styles.contact_item}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to={`https://zalo.me/${contacts.zalo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick("ZALO", `https://zalo.me/${contacts.zalo}`)}
                            className={styles.contact_link}
                        >
                            <div className={styles.icon_wrapper}>
                                <img src={Zalo} alt="Zalo" />
                            </div>
                            <span className={styles.contact_label}>Zalo</span>
                        </Link>
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