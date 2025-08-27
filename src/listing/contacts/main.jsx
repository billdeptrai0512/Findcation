import styles from "../listing.module.css";
import Facebook from "./facebook";
import Zalo from "./zalo";
import Instagram from "./instagram";
import { useEffect } from "react";
import { useListing } from "../listingContext";
import { useOutletContext } from "react-router-dom";

export default function Contacts() {
    const { listing } = useListing();
    const { setStepValidity, currentStep } = useOutletContext();

    useEffect(() => {

        setStepValidity((prev) => ({
            ...prev,
            [currentStep]:  listing.contacts.facebook?.url &&
                            listing.contacts.instagram?.url &&
                            listing.contacts.zalo?.url
        }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing.contacts]);

    return (
        <div className={styles.pageContent}>
            <h1 style={{ marginBottom: "4px", fontSize: "1.68rem" }}>Bây giờ, hãy liên kết thông tin liên lạc.</h1>
            <div className={styles.intrustion} style={{ paddingBottom: "8px", color: "#6A6A6A" }}>
                Bấm vào icon để kiểm tra liên kết.
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "48px", marginTop: "16px" }}>
                <div className={styles.contact_information_container}style={{ width: "100%" }}>
                    <Zalo filter={simpleLastSegment}/>
                    <Facebook filter={simpleLastSegment}/>
                    <Instagram filter={simpleLastSegment}/>
                </div>
            </div>
        </div>
    );
}

function simpleLastSegment(input) {
    if (!input) return null;
    const s = String(input).trim().replace(/[#?].*$/, "").replace(/\/+$/, "");
    const parts = s.split("/");
    return parts[parts.length - 1] || null;
  }
