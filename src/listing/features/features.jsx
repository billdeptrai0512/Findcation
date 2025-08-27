import { defaultOptions, premiumOptions, safetyOptions } from "../../assets/featureIcons";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useListing } from "../listingContext";
import styles from "../listing.module.css";
import List from "./list";

export default function Features() {

    const { setStepValidity, currentStep } = useOutletContext();
    const { listing } = useListing();

    useEffect(() => {
        setStepValidity((prev) => ({
          ...prev,
          [currentStep]: listing.features.length > 0
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing.features]);

    return (
        <div className={styles.pageContent} style={{justifyContent: "unset"}}>
            <h1 style={{ marginBottom: "4px", fontSize: "1.68rem"}}>Staycation của bạn có gì đặc biệt ?</h1>

            <div clasname={styles.house_features_area}>
                <Section title="tiện nghi cơ bản:" options={defaultOptions} />
                <Section title="đặc biệt hơn thì sao" options={premiumOptions} />
                <Section title="có đảm bảo an toàn không ?" options={safetyOptions} />
            </div>
        </div>
    );
}

function Section({ title, options }) {
    return (
        <div>
            <h2 style={{ fontSize: "0.975rem" }}>{title}</h2>
            <div className={styles.house_featues}>
                <List options={options} />
            </div>
        </div>
    );
}
