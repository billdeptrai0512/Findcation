import styles from "./map.module.css";
import { MoveRight } from "lucide-react";

export default function Staycation({staycation}) {

    const formatPrice = (price) => {
        if (!price) return "";
        return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
    };

    return (
        <div className={styles.listing}>
            <div>
                <img src={`${import.meta.env.VITE_BACKEND_URL}${staycation.images[0]}`} alt="cover_photo"  style={{width: "100%", borderRadius:"8px"}} />
            </div>

            <div className={styles.information} style={{display: "flex", justifyContent: "space-between", marginTop: "8px", gap:"8px"}}>
                <div className={styles.listing_details} style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                    <div className={styles.listing_name} >{staycation.name}</div>
                    <span className={styles.listing_prices} >{formatPrice(staycation.prices.min)} {<MoveRight size={10}/>} {formatPrice(staycation.prices.max)}</span>
                </div>
                <span className={styles.listing_status}>Mới ★</span>
            </div>
        </div>
    );
}


