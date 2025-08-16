import { useMediaQuery } from "react-responsive";
import { useListing } from "../listingContext";
import { MoveRight } from "lucide-react";
import styles from "../listing.module.css";

export default function DemoProfile() {

    const { listing } = useListing()


    const formatPrice = (price) => {
        if (!price) return "";
        return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
    };

    const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

    return (
        <div className={isMobile ? styles.mobile_demo_container : styles.demo_container}>
            <div>
                <img src={listing.images[0]?.url} alt="cover_photo"  style={{width: "100%", borderRadius:"8px"}} />
            </div>

            <div style={{display: "flex", justifyContent: "space-between", marginTop: "8px"}}>
                <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                    <div style={{fontSize: "1.1075rem", overflow: "hidden"}}>{listing.name}</div>
                    <span style={{fontSize: "0.9075rem", fontWeight: "600"}}>{formatPrice(listing.prices.min)} {<MoveRight size={10}/>} {formatPrice(listing.prices.max)}</span>
                </div>
                <p style={{fontSize: "0.9075rem"}}>Mới ★</p>
            </div>
        </div>
    );
}


