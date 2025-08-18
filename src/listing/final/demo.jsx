import { useListing } from "../listingContext";
import { MoveRight } from "lucide-react";
import styles from "../listing.module.css";

export default function Staycation({setRenderPreview}) {

    const {listing} = useListing();

    console.log(listing.images[0]);

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
                    <div className={styles.listing_name} >{listing.name}</div>
                    <span className={styles.listing_prices} >{formatPrice(listing.prices.min)} {<MoveRight size={10}/>} {formatPrice(listing.prices.max)}</span>
                </div>
            </div>
        </div>
    );
}





