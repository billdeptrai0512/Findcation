import { Wifi, Monitor, Video, Sofa, Snowflake, Microwave, Refrigerator, Gamepad2, WashingMachine, Heater, LampDesk, Waves, Car, Vault, Cctv, FireExtinguisher, Icon } from "lucide-react";
import { bathBubble, chairsTableParasol, socketUsa } from '@lucide/lab';
import { IconSportBillard } from '@tabler/icons-react';
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

    const defaultOptions = [
        { name: 'Wifi', icon: <Wifi size={32} className={styles.house_type_icon} /> },
        { name: 'TV', icon: <Monitor size={32} className={styles.house_type_icon} /> },
        { name: 'Máy Chiếu', icon: <Video size={32} className={styles.house_type_icon} /> },
        { name: 'Sofa', icon: <Sofa size={32} className={styles.house_type_icon} /> },
        { name: 'Máy lạnh', icon: <Snowflake size={32} className={styles.house_type_icon} /> },
        { name: 'Bếp', icon: <Microwave size={32} className={styles.house_type_icon} /> },
        { name: 'Tủ Lạnh', icon: <Refrigerator size={32} className={styles.house_type_icon} /> },
    ];

    const premiumOptions = [
        { name: 'PS4', icon: <Gamepad2 size={32} className={styles.house_type_icon} /> },
        { name: 'Hồ bơi', icon: <Waves size={32} className={styles.house_type_icon} /> },
        { name: 'Bàn bida', icon: <IconSportBillard size={32} className={styles.house_type_icon} /> },
        { name: 'Bồn tắm', icon: <Icon iconNode={bathBubble} size={32} className={styles.house_type_icon} /> },
        { name: 'Máy giặt', icon: <WashingMachine size={32} className={styles.house_type_icon} /> },
        { name: 'Bàn làm việc', icon: <LampDesk size={32} className={styles.house_type_icon} /> },
        { name: 'Chổ đậu xe hơi', icon: <Car size={32} className={styles.house_type_icon} /> },
        { name: 'Lò sưởi trong nhà', icon: <Heater size={32} className={styles.house_type_icon} /> },
        { name: 'Bàn ăn ngoài trời', icon: <Icon iconNode={chairsTableParasol} size={32} className={styles.house_type_icon} /> },
    ];

    const safetyOptions = [
        { name: 'Két an toàn', icon: <Vault size={32} className={styles.house_type_icon} /> },
        { name: 'Camera an ninh', icon: <Cctv size={32} className={styles.house_type_icon} /> },
        { name: 'Bình chữa cháy', icon: <FireExtinguisher size={32} className={styles.house_type_icon} /> },
        { name: 'Máy báo khói', icon: <Icon iconNode={socketUsa} size={32} className={styles.house_type_icon} /> },
    ];

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
