import { useNavigate } from "react-router-dom";
import styles from "./map.module.css";
import { MoveRight } from "lucide-react";

export default function Staycation({staycation}) {

    const navigate = useNavigate();

    const formatPrice = (price) => {
        if (!price) return "";
        return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
    };

    return (
        <div className={styles.listing} >
            <div style={{cursor: "pointer"}} onClick={() => {navigate(`/staycation/${staycation.id}`)}}>
                <img src={`${import.meta.env.VITE_BACKEND_URL}${staycation.images[0]}`} alt="cover_photo"  style={{width: "auto", height:"auto", maxWidth:"135px", maxHeight:"135px", borderRadius:"8px", objectFit: 'contain', objectPosition: "center"}} />
            </div>
            <div className={styles.information} style={{display: "flex", justifyContent: "space-between", margin: "0 auto", gap:"8px"}}>
                <div className={styles.listing_details} style={{display: "flex", flexDirection: "column", gap: "4px", padding: "0 4px"}}>
                    <h2 className={styles.staycation_name} style={{marginTop: "0"}} >{staycation.name}</h2>
                    <span className={styles.staycation_prices} >{formatPrice(staycation.prices.min)} {<MoveRight size={10}/>} {formatPrice(staycation.prices.max)}</span>
                </div>
                {/* <span className={styles.listing_status}>Mới ★</span> */}
            </div>
        </div>
    );
}


