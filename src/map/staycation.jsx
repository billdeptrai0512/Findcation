import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import styles from "./map.module.css";

export default function Staycation({ staycation }) {

    const navigate = useNavigate();

    const formatPrice = (price) => {
        if (!price) return "";
        return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
    };

    console.log(staycation)

    return (
        <div className={styles.listing} style={{ cursor: "pointer" }} onClick={() => { navigate(`/staycation/${staycation.id}`) }}>
            <div style={{ position: "relative" }}>
                <img src={`${import.meta.env.VITE_IMAGEKIT_URL}${staycation.images[0]}`} alt="cover_photo"
                    style={{
                        width: "100%", height: "100%", maxHeight: "135px",
                        borderTopLeftRadius: "8px", borderTopRightRadius: "8px",
                        objectFit: 'cover', objectPosition: "center"
                    }} />
                {staycation.verify && (
                    <div
                        style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            borderRadius: "999px",
                            padding: "4px",
                        }}
                    >
                        <VerifiedTick size={26} />
                    </div>
                )}
            </div>
            <div className={styles.listing_details} style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "0 8px 8px 8px" }}>
                <h2 className={styles.staycation_name} style={{ marginTop: "0" }} >{staycation.name}</h2>
                <div className={styles.staycation_prices}>
                    {formatPrice(staycation.prices.min)}
                    {<MoveRight size={16} />}
                    {formatPrice(staycation.prices.max)}
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

