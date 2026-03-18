import { Zap, ChevronDown, ChevronUp, CircleCheck, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { apiClient } from "../../../config/api";
import { useHost } from "../../hostContext";
import styles from "../verify.module.css";

export default function BusinessCard({ staycation, openCard, toggle }) {
    const { refreshHost } = useHost();
    const [subscribing, setSubscribing] = useState(false);
    const [showRenew, setShowRenew] = useState(false);

    const handleSubscribe = async () => {
        setSubscribing(true);
        try {
            await apiClient.post(`listing/staycation/${staycation.id}/subscribe`, {});
            alert("Thanh toán thành công! Gói cước đã được gia hạn.");
            if (refreshHost) refreshHost();
        } catch (err) {
            console.error("Lỗi khi mua gói:", err);
            alert(err.response?.data?.message || "Đã xảy ra lỗi khi thanh toán.");
        } finally {
            setSubscribing(false);
        }
    };

    // Tính % thời gian còn lại trong kỳ 30 ngày
    const getDaysRemaining = () => {
        if (!staycation.subscriptionValidUntil) return 0;
        const now = Date.now();
        const end = new Date(staycation.subscriptionValidUntil).getTime();
        const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    };

    const daysRemaining = getDaysRemaining();
    const progressPct = Math.min(100, Math.round((daysRemaining / 30) * 100));
    const isNearExpiry = daysRemaining <= 7 && daysRemaining > 0;

    return (
        <div className={styles.section_card}>
            <div className={styles.card_header} onClick={() => toggle("business")}>
                <div className={styles.card_header_left}>
                    <div className={styles.card_icon_box}><Zap size={18} /></div>
                    <div>
                        <span className={styles.card_title}>Phí duy trì hiển thị</span>
                        <div className={styles.card_badges}>
                            {staycation.active ? (
                                <span className={styles.status_badge_verified}>Đã thanh toán</span>
                            ) : (
                                <span className={styles.status_badge_unverified}>Chưa thanh toán</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.card_chevron}>
                    {openCard === "business" ? <ChevronUp size={18} color="#6A6A6A" /> : <ChevronDown size={18} color="#6A6A6A" />}
                </div>
            </div>

            <AnimatePresence>
                {openCard === "business" && (
                    <motion.div className={styles.card_body}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div className={styles.divider} />

                        {staycation.active ? (
                            /* ── ACTIVE STATE ── */
                            <div className={styles.active_subscription_box}>

                                {/* Progress bar */}
                                <div className={styles.progress_wrap}>
                                    <div className={styles.progress_label_row}>
                                        <span className={styles.progress_label}>Thời gian còn lại</span>
                                        <span className={styles.progress_val} style={{ color: isNearExpiry ? "#DC2626" : "#16a34a" }}>
                                            {daysRemaining} ngày
                                        </span>
                                    </div>
                                    <div className={styles.progress_track}>
                                        <motion.div
                                            className={styles.progress_fill}
                                            style={{ background: isNearExpiry ? "#DC2626" : "#16a34a" }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPct}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        />
                                    </div>
                                    <p className={styles.progress_expiry}>Hết hạn ngày {new Date(staycation.subscriptionValidUntil).toLocaleDateString('vi-VN')}</p>
                                </div>

                                {/* Nút gia hạn sớm – chỉ show khi gần hết hạn hoặc bấm */}
                                {(isNearExpiry || showRenew) ? (
                                    <div className={styles.payment_section} style={{ marginTop: 16 }}>
                                        <div className={styles.price_row}>
                                            <span className={styles.price_amount}>512.000đ</span>
                                            <span className={styles.price_period}> / tháng</span>
                                        </div>
                                        <div className={styles.premium_qr_wrap}>
                                            <div className={styles.premium_qr_inner}>
                                                <div className={styles.qr_scan_container}>
                                                    <img src={`https://qr.sepay.vn/img?acc=player2player&bank=MB&amount=${512000}&des=HOST${staycation.id}&template=compact`}
                                                        alt="QR gia hạn" className={styles.premium_qr_img} />
                                                    <div className={styles.qr_scan_line}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={styles.payment_note}>Quét mã để gia hạn thêm 1 tháng</p>
                                        <button className={styles.send_code_btn} onClick={handleSubscribe} disabled={subscribing} style={{ marginTop: 12 }}>
                                            {subscribing ? "Đang xử lý..." : "Test Gia hạn"}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowRenew(true)}
                                        className={styles.renew_early_btn}
                                    >
                                        <RefreshCw size={14} style={{ marginRight: 6, display: "inline" }} />
                                        Gia hạn sớm
                                    </button>
                                )}
                            </div>
                        ) : (
                            /* ── INACTIVE STATE ── */
                            <>
                                <p className={styles.card_description}>
                                    Xác thực trạng thái hoạt động giúp chỗ ở của bạn được ưu tiên hiển thị trên bản đồ.
                                </p>

                                {staycation.subscriptionValidUntil && (
                                    <p style={{ marginBottom: 12, fontSize: '0.9rem', color: '#B45309', fontWeight: 600, background: '#FEF3C7', padding: '8px 12px', borderRadius: '8px' }}>
                                        Đã hết hạn vào: {new Date(staycation.subscriptionValidUntil).toLocaleDateString('vi-VN')}
                                    </p>
                                )}

                                <div className={styles.payment_section}>
                                    <div className={styles.price_row}>
                                        <span className={styles.price_amount}>512.000đ</span>
                                        <span className={styles.price_period}> / tháng</span>
                                    </div>
                                    <div className={styles.premium_qr_wrap}>
                                        <div className={styles.premium_qr_inner}>
                                            <div className={styles.qr_scan_container}>
                                                <img src={`https://qr.sepay.vn/img?acc=player2player&bank=MB&amount=${512000}&des=HOST${staycation.id}&template=compact`}
                                                    alt="QR thanh toán" className={styles.premium_qr_img} />
                                                <div className={styles.qr_scan_line}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.payment_note}>Quét mã QR bằng ứng dụng ngân hàng hoặc Momo</p>

                                    <button
                                        className={styles.send_code_btn}
                                        onClick={handleSubscribe}
                                        disabled={subscribing}
                                        style={{ marginTop: 12 }}
                                    >
                                        {subscribing ? "Đang xử lý..." : "Test Mua Gói"}
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
