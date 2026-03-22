import { useParams } from "react-router-dom";
import styles from "./verify.module.css";
import { useState } from "react";
import { useHost } from "../hostContext";

import ScoreCard from "./cards/scoreCard";
import ContactCard from "./cards/contactCard";
import AddressCard from "./cards/addressCard";
import ImagesCard from "./cards/imagesCard";
import BusinessCard from "./cards/businessCard";

export default function VerifyStaycation() {
    const { staycationId } = useParams();
    const { host } = useHost();
    const [openCard, setOpenCard] = useState(null);

    const staycation = host?.staycations.find(s => s.id === parseInt(staycationId));
    if (!staycation) return null;

    const contacts = host.contacts ?? {};

    const toggle = (card) => setOpenCard(prev => prev === card ? null : card);

    return (
        <div className={styles.pageContent}>
            <div className={styles.page_header}>
                <h1 className={styles.page_title}>Xác thực</h1>
                <p className={styles.page_subtitle}>Điểm uy tín cao giúp staycation được khách tin tưởng và liên hệ nhiều hơn.</p>
            </div>

            <ScoreCard staycation={staycation} openCard={openCard} toggle={toggle} />
            <ContactCard staycation={staycation} openCard={openCard} toggle={toggle} contacts={contacts} hostId={host.id} />
            <AddressCard staycation={staycation} openCard={openCard} toggle={toggle} />
            <ImagesCard staycation={staycation} openCard={openCard} toggle={toggle} />
            <BusinessCard staycation={staycation} openCard={openCard} toggle={toggle} />
        </div>
    );
}
