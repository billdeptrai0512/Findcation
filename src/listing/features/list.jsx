import { useListing } from "../listingContext";
import styles from "../listing.module.css";

export default function List({ options }) {
    const { listing, uploadFeatures } = useListing();

    return (
        <>
            {options.map((opt) => {
                const isSelected = listing?.features?.includes(opt.name);
                return (
                    <div key={opt.name} className={`${styles.house_type_option} ${isSelected ? styles.selected : ""}`}
                        style={{ boxShadow: isSelected ? "rgb(34, 34, 34) 0px 0px 0px 2px" : "none", minWidth: "86px" }}
                        onClick={() => uploadFeatures(opt.name)}>
                        {opt.icon}
                        <span>{opt.name}</span>
                        
                    </div>
                );
            })}
        </>
    );
}
