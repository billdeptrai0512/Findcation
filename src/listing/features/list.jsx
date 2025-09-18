import { useListing } from "../listingContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "../listing.module.css";

export default function List({ options }) {
    const { listing, uploadFeatures } = useListing();

    return (
        <>
            {options.map((opt) => {
                const isSelected = listing?.features?.includes(opt.name);
                return (
                    <motion.div key={opt.name} className={`${styles.house_type_option} ${isSelected ? styles.selected : ""}`}
                        style={{ boxShadow: isSelected ? "rgb(34, 34, 34) 0px 0px 0px 2px" : "none", minWidth: "86px" }}
                        onClick={() => uploadFeatures(opt.name)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                            {opt.icon}
                        <span>{opt.name}</span>
                    </motion.div>
                );
            })}
        </>
    );
}
