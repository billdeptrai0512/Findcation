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
                        onFocus={() => setEditing("min")}
                        onBlur={() => setEditing(null)}
                        onChange={handleMinChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              console.log('yea')
                              e.currentTarget
                                .closest(".price_setup") // parent container
                                .querySelector(".input:nth-of-type(2)") // the next input
                                ?.focus();
                            }
                        }}
                        autoFocus={listing.prices.min !== null ? false : true} // Autofocus if min price is null and not editing max
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
                        onFocus={() => setEditing("max")}
                        onBlur={() => setEditing(null)}
                        onChange={handleMaxChange}
                    />
                </div>
            </div>

        </div>
    );
}
