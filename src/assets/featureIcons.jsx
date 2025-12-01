// src/utils/featureIcons.js
import {
    Wifi, Monitor, Video, Sofa, Snowflake, Microwave, Refrigerator,
    Gamepad2, WashingMachine, Heater, LampDesk, Waves, Car, Vault,
    Cctv, FireExtinguisher, Icon, HousePlus
} from "lucide-react";

import { bathBubble, chairsTableParasol, socketUsa } from "@lucide/lab";

import styles from "../listing/listing.module.css"; // same css classes

export const defaultOptions = [
    { name: 'Wifi', icon: <Wifi size={32} className={styles.house_type_icon} /> },
    { name: 'TV', icon: <Monitor size={32} className={styles.house_type_icon} /> },
    { name: 'Máy Chiếu', icon: <Video size={32} className={styles.house_type_icon} /> },
    { name: 'Sofa', icon: <Sofa size={32} className={styles.house_type_icon} /> },
    { name: 'Máy lạnh', icon: <Snowflake size={32} className={styles.house_type_icon} /> },
    { name: 'Bếp', icon: <Microwave size={32} className={styles.house_type_icon} /> },
    { name: 'Tủ Lạnh', icon: <Refrigerator size={32} className={styles.house_type_icon} /> },
];

export const premiumOptions = [
    { name: 'PS4', icon: <Gamepad2 size={32} className={styles.house_type_icon} /> },
    { name: 'Hồ bơi', icon: <Waves size={32} className={styles.house_type_icon} /> },
    { name: 'Bồn tắm', icon: <Icon iconNode={bathBubble} size={32} className={styles.house_type_icon} /> },
    { name: 'Phòng xông hơi', icon: <HousePlus size={32} className={styles.house_type_icon} /> },
    { name: 'Máy giặt', icon: <WashingMachine size={32} className={styles.house_type_icon} /> },
    { name: 'Bàn làm việc', icon: <LampDesk size={32} className={styles.house_type_icon} /> },
    { name: 'Chổ đậu xe hơi', icon: <Car size={32} className={styles.house_type_icon} /> },
    { name: 'Lò sưởi trong nhà', icon: <Heater size={32} className={styles.house_type_icon} /> },
    { name: 'Bàn ăn ngoài trời', icon: <Icon iconNode={chairsTableParasol} size={32} className={styles.house_type_icon} /> },

];

export const safetyOptions = [
    { name: 'Két an toàn', icon: <Vault size={32} className={styles.house_type_icon} /> },
    { name: 'Camera an ninh', icon: <Cctv size={32} className={styles.house_type_icon} /> },
    { name: 'Bình chữa cháy', icon: <FireExtinguisher size={32} className={styles.house_type_icon} /> },
    { name: 'Máy báo khói', icon: <Icon iconNode={socketUsa} size={32} className={styles.house_type_icon} /> },
];

export const allOptions = [
    ...defaultOptions,
    ...premiumOptions,
    ...safetyOptions,
];

// Map for quick lookup by feature name
export const featureIconMap = allOptions.reduce((acc, item) => {
    acc[item.name] = item.icon;
    return acc;
}, {});
