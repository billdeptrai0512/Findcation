import { ArrowRight, Home, DollarSign, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import styles from "./preview.module.css"
import Features from "./features";

export default function Details({ staycation, downloadImage, canvas, loading }) {

    const houseType = staycation.type === "house" ? "Toàn bộ căn nhà" : `${staycation.rooms?.length} phòng riêng`
    const isVerified = staycation.verify === true;

    return (

        <div className={styles.preview_details} style={{ gap: "16px", padding: "0 12px" }}>

            {/* Verification Badge */}
            {isVerified && (
                <div className={styles.verification_badge}>
                    <ShieldCheck size={16} strokeWidth={2.5} />
                    <span>Đã xác minh</span>
                </div>
            )}

            {/* Title Card */}
            <div className={styles.detail_card}>
                <div className={styles.detail_card_header}>
                    <Sparkles size={20} strokeWidth={2} />
                    <h2 className={styles.detail_card_title}>Tiêu đề</h2>
                </div>
                <div className={styles.detail_card_content}>
                    <span>{staycation.name}</span>
                </div>
            </div>

            {/* Type Card */}
            <div className={styles.detail_card}>
                <div className={styles.detail_card_header}>
                    <Home size={20} strokeWidth={2} />
                    <h2 className={styles.detail_card_title}>Cho thuê</h2>
                </div>
                <div className={styles.detail_card_content}>
                    <span>{houseType}</span>
                </div>
            </div>

            {/* Price Card */}
            <div className={styles.detail_card}>
                <div className={styles.detail_card_header}>
                    <DollarSign size={20} strokeWidth={2} />
                    <h2 className={styles.detail_card_title}>Chi phí</h2>
                </div>
                <div className={styles.price_range}>
                    <span>{Number(staycation.prices.min).toLocaleString("vi-VN")}đ</span>
                    <ArrowRight strokeWidth={1.5} size={16} />
                    <span>{Number(staycation.prices.max).toLocaleString("vi-VN")}đ</span>
                </div>
            </div>

            {/* Location Card */}
            <div className={styles.detail_card}>
                <div className={styles.detail_card_header}>
                    <MapPin size={20} strokeWidth={2} />
                    <h2 className={styles.detail_card_title}>Địa chỉ</h2>
                </div>
                <div className={styles.detail_card_content}>
                    <span>{staycation.location.details.street} - {staycation.location.details.ward} - {staycation.location.details.city}</span>
                </div>
            </div>

            {/* Features */}
            <Features staycation={staycation} />

        </div>

    );


}
