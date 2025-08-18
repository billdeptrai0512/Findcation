import { useEffect } from "react";

import { useListing } from "../listingContext";
import { useOutletContext } from "react-router-dom";
import Contact from "./contact";
import styles from "../listing.module.css";
import RangePrice from "./price";

export default function ContactsPrices() {

    const { listing } = useListing()
    const { setStepValidity, currentStep } = useOutletContext();

    useEffect(() => {

        setStepValidity((prev) => ({
          ...prev,
          [currentStep]: listing.prices.min !== null && listing.prices.max !== null
        }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing.prices]);


    return (
        <div className={styles.pageContent}>
            <h1 style={{ marginBottom: "4px", fontSize: "1.68rem" }}>Bây giờ, hãy liên kết thông tin liên lạc.</h1>
            <div className={styles.intrustion} style={{ paddingBottom: "8px", color: "#6A6A6A" }}>
                Sau đó, đặt bảng giá cho thuê staycation
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "48px", marginTop: "16px" }}>

                <Contact />

                <RangePrice />

            </div>

        </div>
    );
}
