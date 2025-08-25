import { useListing } from "../listingContext";
import { MoveRight } from "lucide-react";
import styles from "../listing.module.css";

export default function Staycation({setRenderPreview}) {

    const {listing} = useListing();

    const formatPrice = (price) => {
        if (!price) return "";
        return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
    };

    const url = listing.images[0]?.url

    return (
        <div className={styles.listing}>
            <div onClick={() => setRenderPreview(true)} style={{cursor: "pointer"}}>
                <img src={url} alt="cover_photo"  style={{width: "100%", borderRadius:"8px"}} />
            </div>

            <div className={styles.information} style={{display: "flex", justifyContent: "space-between", marginTop: "8px", gap:"8px"}}>
                <div className={styles.listing_details} style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                    <h2 style={{margin: "0" , marginBottom:"4px", fontSize: "18px"}} >{listing.name}</h2>
                    <span className={styles.listing_prices} >{formatPrice(listing.prices.min)} {<MoveRight size={10}/>} {formatPrice(listing.prices.max)}</span>
                </div>
            </div>
        </div>
    );
}





