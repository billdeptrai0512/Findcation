import { Wifi, Monitor, Video, Sofa, Snowflake, Microwave, Refrigerator, Gamepad2, WashingMachine, Heater, LampDesk, Waves, Car, Vault, Cctv, FireExtinguisher, Icon } from "lucide-react";
import { bathBubble, chairsTableParasol, socketUsa } from '@lucide/lab';
import { IconSportBillard } from '@tabler/icons-react';
import styles from "../listing.module.css";
import List from "./list";

export default function Features() {
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
        <div className={styles.pageContent}>
            <h1 style={{ marginBottom: "4px" }}>Cho khách biết chỗ ở của bạn có những gì</h1>
            <div className={styles.intrustion} style={{ paddingBottom: "8px", color: "#6A6A6A" }}>
                Bạn có thể bổ sung thêm sau khi đăng mục cho thuê
            </div>

            <Section title="Còn những tiện nghi yêu thích của khách sau đây thì sao?" options={defaultOptions} />
            <Section title="Bạn có tiện nghi nào nổi bật không ?" options={premiumOptions} />
            <Section title="Thế còn những tiện nghi đảm bảo an toàn?" options={safetyOptions} />
        </div>
    );
}

function Section({ title, options }) {
    return (
        <div>
            <h3 style={{ fontSize: "1.25rem" }}>{title}</h3>
            <div className={styles.house_featues}>
                <List options={options} />
            </div>
        </div>
    );
}
