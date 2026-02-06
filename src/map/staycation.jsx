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

function VerifiedTick({ size = 30 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="32" cy="32" r="32" fill="#22C55E" />
            <path
                fill="white"
                d="M26.7 42.3L16.4 32l4.2-4.2 6.1 6.1 16.6-16.6 4.2 4.2z"
            />
        </svg>
    );
}

