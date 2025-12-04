import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import styles from "./map.module.css";

export default function Staycation({ staycation }) {

    const navigate = useNavigate();

    const formatPrice = (price) => {
        if (!price) return "";
        return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
    };

    return (
        <div className={styles.listing} style={{ cursor: "pointer" }} onClick={() => { navigate(`/staycation/${staycation.id}`) }}>
            <div>
                <img src={`${import.meta.env.VITE_IMAGEKIT_URL}${staycation.images[0]}`} alt="cover_photo"
                    style={{
                        width: "100%", height: "100%", maxHeight: "135px",
                        borderTopLeftRadius: "8px", borderTopRightRadius: "8px",
                        objectFit: 'cover', objectPosition: "center"
                    }} />
            </div>
            <div className={styles.listing_details} style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "0 8px 8px 8px" }}>
                <h2 className={styles.staycation_name} style={{ marginTop: "0" }} >{staycation.name}</h2>
                <div className={styles.staycation_prices}>
                    {formatPrice(staycation.prices.min)}
                    {<MoveRight size={16} />}
                    {formatPrice(staycation.prices.max)}
                </div>
            </div>
            {/* <span className={styles.listing_status}>Mới ★</span> */}
        </div>
    );
}


