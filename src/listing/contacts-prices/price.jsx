import { useState, useEffect } from "react";
import { MoveDown, MoveRight } from "lucide-react";
import { useListing } from "../listingContext";
import { useOutletContext } from "react-router-dom";
import styles from "../listing.module.css";

export default function RangePrice() {

    const { listing, uploadMinPrice, uploadMaxPrice} = useListing()
    const [editing, setEditing] = useState(null);
    const { setStepValidity, currentStep } = useOutletContext();

    useEffect(() => {

        setStepValidity((prev) => ({
          ...prev,
          [currentStep]: listing.prices.min !== null && listing.prices.max !== null
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing.prices]);

    const handleMinChange = (e) => {
        const price = e.target.value.replace(/\D/g, "")
        if (price === '') return uploadMinPrice(null)
        uploadMinPrice(price)
    }

    const handleMaxChange = (e) => {
        const price = e.target.value.replace(/\D/g, "")
        if (price === '') return uploadMaxPrice(null)
        uploadMaxPrice(price)
    }

    const formatPrice = (price) => {
        if (!price) return "";
        return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
    };

    return (
        <div>
            <div className={styles.price_setup}>
                <div>
                    <input type="text"
                        className={styles.price_input}
                        value={editing === "min" ? listing.prices.min : formatPrice(listing.prices.min)}
                        placeholder="gói thuê thấp nhất"
                        onFocus={() => setEditing("min")}
                        onBlur={() => setEditing(null)}
                        onChange={handleMinChange}
                    />
                </div>

                <div>
                    <MoveDown size={50} /> 
                </div>

                <div>
                    <input
                        type="text"
                        className={styles.price_input}
                        value={editing === "max" ? listing.prices.max : formatPrice(listing.prices.max)}
                        placeholder="thuê cả ngày cao nhất"
                        onFocus={() => setEditing("max")}
                        onBlur={() => setEditing(null)}
                        onChange={handleMaxChange}
                    />
                </div>
            </div>

        </div>
    );
}
