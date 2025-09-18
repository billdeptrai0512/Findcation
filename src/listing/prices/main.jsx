import { useEffect } from "react";
import { useListing } from "../listingContext";
import { useOutletContext } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
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
        <motion.div className={styles.pageContent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <h1 style={{ marginBottom: "4px", fontSize: "1.68rem" }}>Cuối cùng, nhập khoảng giá cho thuê</h1>

            <div className={styles.intrustion} style={{ paddingBottom: "8px", color: "#6A6A6A" }}>
                Từ combo thuê thấp nhất đến giá thuê cả ngày
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                <RangePrice />

            </div>
            
        </motion.div>
    );
}
