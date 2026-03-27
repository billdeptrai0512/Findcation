import { Zap, ChevronDown, ChevronUp, CircleCheck, RefreshCw, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { apiClient } from "../../../config/api";
import { useHost } from "../../hostContext";
import styles from "../verify.module.css";

export default function BusinessCard({ staycation, openCard, toggle }) {
    const { refreshHost } = useHost();
    const [subscribing, setSubscribing] = useState(false);
    const [showRenew, setShowRenew] = useState(false);
    const [waitingForPayment, setWaitingForPayment] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const retryRef = useRef(null);
    const retryDelay = useRef(1000);

    // Buisness Logic variables
    const isFirstTimeUnlock = !staycation.active && !staycation.subscriptionStartedAt && !staycation.subscriptionValidUntil;
    const paymentAmount = isFirstTimeUnlock ? 51200 : 512000;
    const paymentLabelAmount = isFirstTimeUnlock ? "51.200đ" : "512.000đ";
    const paymentLabelPeriod = isFirstTimeUnlock ? "/ mở khóa" : " / tháng";

    useEffect(() => {
        let eventSource;
        let cancelled = false;

        const connect = () => {
            if (cancelled) return;

            eventSource = new EventSource(
                `${apiClient.defaults.baseURL}/listing/staycation/${staycation.id}/payment-stream`,
                { withCredentials: true }
            );

            eventSource.onopen = () => {
                retryDelay.current = 1000;
                setWaitingForPayment(true);
            };

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'ping' || data.status === 'connected') return;

                    if (data.status === 'paid_success') {
                        setWaitingForPayment(false);
                        setPaymentSuccess(true);
                        eventSource.close();
                        setTimeout(() => {
                            if (refreshHost) refreshHost();
                        }, 1200);
                    }
                } catch (e) {
                    console.warn("SSE parse error", e);
                }
            };

            eventSource.onerror = (err) => {
                console.warn("SSE connection lost, reconnecting…", err);
                eventSource.close();
                if (!cancelled) {
                    retryRef.current = setTimeout(() => {
                        retryDelay.current = Math.min(retryDelay.current * 2, 30000);
                        connect();
                    }, retryDelay.current);
                }
            };
        };

        if (openCard === "business") connect();
        else {
            setWaitingForPayment(false);
            setPaymentSuccess(false);
        }

        return () => {
            cancelled = true;
            clearTimeout(retryRef.current);
            if (eventSource) eventSource.close();
        };
    }, [openCard, staycation.id, refreshHost]);

    const handleSubscribe = async () => {
        setSubscribing(true);
        try {
            await apiClient.post(`listing/staycation/subscribe`, {
                code: `HOST${staycation.id}`,
            });
            alert("Thanh toán thành công! Giao dịch đã được ghi nhận.");
            if (refreshHost) refreshHost();
        } catch (err) {
            console.error("Lỗi khi mua gói:", err);
            alert(err.response?.data?.message || "Đã xảy ra lỗi khi thanh toán.");
        } finally {
            setSubscribing(false);
        }
    };

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
    const shouldShowPayment = !staycation.active || isNearExpiry || showRenew;

    const renderPaymentSection = () => (
        <div className={styles.payment_section} style={{ marginTop: staycation.active ? 16 : 0 }}>
            <div className={styles.price_row}>
                <span className={styles.price_amount}>{paymentLabelAmount}</span>
                <span className={styles.price_period}>{paymentLabelPeriod}</span>
            </div>
            <div className={styles.premium_qr_wrap}>
                <div className={styles.premium_qr_inner}>
                    <div className={styles.qr_scan_container}>
                        <img src={`https://qr.sepay.vn/img?acc=0902822192&bank=MB&amount=${paymentAmount}&des=HOST${staycation.id}&template=compact`}
                            alt="QR thanh toán" className={styles.premium_qr_img} />
                        <div className={styles.qr_scan_line}></div>
                    </div>
                </div>
            </div>

            {import.meta.env.DEV && (
                <button className={styles.send_code_btn} onClick={handleSubscribe} disabled={subscribing} style={{ marginTop: 12 }}>
                    {subscribing ? "Đang xử lý..." : "Test Thanh toán"}
                </button>
            )}
        </div>
    );

    const renderActiveContent = () => (
        <div className={styles.active_subscription_box}>
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

            {shouldShowPayment ? (
                renderPaymentSection()
            ) : (
                <button onClick={() => setShowRenew(true)} className={styles.renew_early_btn}>
                    <RefreshCw size={14} style={{ marginRight: 6, display: "inline" }} />
                    Gia hạn sớm
                </button>
            )}
        </div>
    );

    const renderInactiveContent = () => (
        <>
            {staycation.subscriptionValidUntil && (
                <p style={{ marginBottom: 12, fontSize: '0.9rem', color: '#B45309', fontWeight: 600, background: '#FEF3C7', padding: '8px 12px', borderRadius: '8px' }}>
                    Đã hết hạn vào: {new Date(staycation.subscriptionValidUntil).toLocaleDateString('vi-VN')}
                </p>
            )}
            {renderPaymentSection()}
        </>
    );

    return (
        <div className={styles.section_card}>
            <div className={styles.card_header} onClick={() => toggle("business")}>
                <div className={styles.card_header_left}>
                    <div className={styles.card_icon_box}><Zap size={18} /></div>
                    <div>
                        <span className={styles.card_title}>Điểm uy tín</span>
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

                        {staycation.active ? renderActiveContent() : renderInactiveContent()}

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
