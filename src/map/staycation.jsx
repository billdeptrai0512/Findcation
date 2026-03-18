import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, ShieldCheck, Maximize } from "lucide-react";
import { useState } from "react";
import styles from "./map.module.css";
import { apiClient } from "../config/api";

export default function Staycation({ staycation }) {

    const navigate = useNavigate();
    // const [isHovered, setIsHovered] = useState(false);

    const formatPrice = (price) => {
        if (!price) return "";
        return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
    };

    const getTrustColor = (score) => {
        if (score < 50) return "#4b5563";
        if (score < 75) return "#2563eb";
        if (score < 90) return "#059669";
        return "#d97706";
    };

    //save traffic
    const countAsTraffic = async () => {

        await apiClient.post(`/traffic/${staycation.id}`, {
            trafficType: "VIEW",
            platform: "NULL",
            sessionId: localStorage.getItem("traffic_session")
        });

        navigate(`/staycation/${staycation.id}`)

    };

    return (
        <div
            className={styles.listing}
            onClick={countAsTraffic}
        >
            <div style={{ position: "relative" }}>
                <img src={`${import.meta.env.VITE_IMAGEKIT_URL}${staycation.images[0]}`} alt="cover_photo"
                    style={{
                        width: "100%", height: "100%", maxHeight: "135px",
                        borderTopLeftRadius: "8px", borderTopRightRadius: "8px",
                        objectFit: 'contain', objectPosition: "center", backgroundColor: "rgba(0, 0, 0, 1)"
                    }} />
                {staycation.trustScore > 0 && (
                    <span style={{
                        position: "absolute", top: "6px", right: "6px",
                        fontSize: "12px", fontWeight: 700,
                        background: getTrustColor(staycation.trustScore),
                        color: "white",
                        borderRadius: "4px",
                        padding: "2px 6px",
                        lineHeight: "1.6",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.25)"
                    }}>
                        {staycation.trustScore}
                    </span>
                )}
            </div>
            <div className={styles.listing_details}>
                <h2 className={styles.staycation_name}>{staycation.name}</h2>

                {/* Click indicator */}
                <div className={styles.click_indicator}>
                    <span className={styles.staycation_prices}>từ {formatPrice(staycation.prices.min)}</span>
                    <Maximize size={16} strokeWidth={3} />
                </div>
            </div>
        </div>
    );
}


