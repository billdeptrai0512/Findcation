import { useEffect } from "react";
import { useListing } from "../listingContext";
import { useOutletContext } from "react-router-dom";
import styles from "../listing.module.css";
import RangePrice from "../prices/price";

export default function Prices() {

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
            <h1 style={{ marginBottom: "4px", fontSize: "1.68rem" }}>Nhập khoảng giá cho thuê</h1>
            <div className={styles.intrustion} style={{ paddingBottom: "8px", color: "#6A6A6A" }}>
                Từ combo thuê thấp nhất đến giá thuê cả ngày
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                <RangePrice />

            </div>
        </div>
    );
}
