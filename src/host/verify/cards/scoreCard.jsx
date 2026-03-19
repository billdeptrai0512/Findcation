import { differenceInMonths } from 'date-fns';
import { ShieldCheck, CircleCheck, Ban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../verify.module.css";

const getTrustColor = (score) => {
    if (score < 50) return "#4b5563";
    if (score < 75) return "#2563eb";
    if (score < 90) return "#059669";
    return "#d97706";
};

export default function ScoreCard({ staycation, openCard, toggle }) {

    console.log(staycation)

    return (
        <div className={styles.section_card}>
            <div className={styles.card_header} onClick={() => toggle("score")}>
                <div className={styles.card_header_left}>
                    <div className={styles.card_icon_box}><ShieldCheck size={18} /></div>
                    <div>
                        <span className={styles.card_title}>Điểm uy tín</span>
                    </div>
                </div>
                <div style={{
                    fontSize: "12px", fontWeight: 700,
                    background: getTrustColor(staycation.trustScore),
                    color: "white",
                    borderRadius: "4px",
                    padding: "2px 6px",
                    lineHeight: "1.6",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.25)"
                }}>
                    {staycation.trustScore}
                </div>
            </div>

            <AnimatePresence>
                {openCard === "score" && (
                    <motion.div className={styles.card_body}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div className={styles.card_body_scroll}>
                            <ul style={{ listStyle: "none", padding: "0 2px", margin: 0 }}>
                                {[
                                    { text: "Xác thực thông tin liên hệ", verified: staycation.contactsVerified },
                                    { text: "Xác thực địa chỉ", verified: staycation.addressVerified },
                                    { text: "Sử dụng ảnh thật", verified: staycation.imagesVerified },
                                    { text: "Đã kích hoạt điểm uy tín", verified: staycation.active && !!staycation.subscriptionStartedAt },
                                    { text: "Hoạt động được 1 tháng", verified: !!staycation.subscriptionStartedAt && differenceInMonths(new Date(), new Date(staycation.subscriptionStartedAt)) >= 1 },
                                    { text: "Hoạt động được 3 tháng", verified: !!staycation.subscriptionStartedAt && differenceInMonths(new Date(), new Date(staycation.subscriptionStartedAt)) >= 3 },
                                    { text: "Hoạt động được 6 tháng", verified: !!staycation.subscriptionStartedAt && differenceInMonths(new Date(), new Date(staycation.subscriptionStartedAt)) >= 6 },
                                    { text: "Hoạt động được 12 tháng", verified: !!staycation.subscriptionStartedAt && differenceInMonths(new Date(), new Date(staycation.subscriptionStartedAt)) >= 12 },
                                ].map((item, index, arr) => (
                                    <li key={index} style={{
                                        fontSize: "0.975rem",
                                        padding: "12px 0",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        color: "var(--text-secondary)",
                                        borderBottom: index < arr.length - 1 ? "1px solid var(--border-light)" : "none"
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px", opacity: item.verified ? 1 : 0.6 }}>
                                            {item.verified ? (
                                                <CircleCheck size={16} strokeWidth={2.5} color={"#059669"} />
                                            ) : (
                                                <Ban size={16} strokeWidth={2.5} color={"#dc2626"} />
                                            )}
                                            <span style={{ textDecoration: item.verified ? "none" : "line-through" }}>
                                                {item.text}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
