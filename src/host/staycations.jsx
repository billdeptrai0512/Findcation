import { useNavigate, useOutletContext } from "react-router-dom";
import { CirclePlus, ChevronRight } from 'lucide-react';
import styles from "./host.module.css"
import Contacts from "./contacts/main";

export default function Staycations() {
    const { staycations } = useOutletContext()
    const navigate = useNavigate();

    return (
        <div className={styles.pageContent}>

            {/* Header */}
            <div className={styles.staycations_header}>
                <h1 className={styles.staycations_title}>Staycation của tôi</h1>
                <CirclePlus
                    size={28}
                    fill="#E31C5F"
                    color="#FFFFFF"
                    onClick={() => navigate(`/list-staycation`)}
                    style={{ cursor: "pointer" }}
                />
            </div>

            {/* Staycation Cards */}
            <div className={styles.staycations_grid}>
                {staycations.map((staycation) => (
                    <div
                        key={staycation.id}
                        className={styles.staycation_card}
                        onClick={() => navigate(`editor/${staycation.id}`, { state: { staycation } })}
                    >
                        {console.log(staycation.images?.[0])}
                        <div className={styles.staycation_cover}>
                            <img
                                src={`${import.meta.env.VITE_IMAGEKIT_URL}${staycation.images?.[0]}`}
                                alt="cover_photo"
                                className={styles.staycation_cover_img}
                            />
                        </div>

                        <div className={styles.staycation_card_details}>
                            <h2 className={styles.staycation_card_name}>
                                {staycation.name || staycation.location.details.street}
                            </h2>
                            <div className={styles.staycation_card_info}>
                                <span>{staycation.location.details.ward}, {staycation.location.details.city}</span>
                                <ChevronRight size={18} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Contacts />

        </div>
    );
}
