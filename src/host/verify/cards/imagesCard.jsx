import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../verify.module.css";
import Images from "../../../map/preview/images";

export default function ImagesCard({ staycation, openCard, toggle }) {
    return (
        <div className={styles.section_card}>
            <div className={styles.card_header} onClick={() => toggle("picture")}>
                <div className={styles.card_header_left}>
                    <div className={styles.card_icon_box}><MapPin size={18} /></div>
                    <div>
                        <span className={styles.card_title}>Hình ảnh</span>
                        <div className={styles.card_badges}>
                            {staycation.imagesVerified
                                ? <span className={styles.status_badge_verified}>Đã xác thực</span>
                                : <span className={styles.status_badge_unverified}>Chưa xác thực</span>}
                        </div>
                    </div>
                </div>
                <div className={styles.card_chevron}>
                    {openCard === "picture" ? <ChevronUp size={18} color="#6A6A6A" /> : <ChevronDown size={18} color="#6A6A6A" />}
                </div>
            </div>

            <AnimatePresence>
                {openCard === "picture" && (
                    <motion.div className={styles.card_body}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div className={styles.sub_divider} />
                        <div className={styles.sub_section} style={{ padding: 0, paddingBottom: 16 }}>
                            <Images staycation={staycation} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
