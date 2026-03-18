import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "../verify.module.css";
import HomeIcon from "../../../assets/home.webp";

const customIcon = new L.Icon({
    iconUrl: HomeIcon,
    iconSize: [41, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
});

export default function AddressCard({ staycation, openCard, toggle }) {
    const address = staycation.location?.details;
    const addressString = address
        ? `${address.street}, ${address.ward}, ${address.city}`
        : "Chưa có địa chỉ";

    return (
        <div className={styles.section_card}>
            <div className={styles.card_header} onClick={() => toggle("address")}>
                <div className={styles.card_header_left}>
                    <div className={styles.card_icon_box}><MapPin size={18} /></div>
                    <div>
                        <span className={styles.card_title}>Địa chỉ</span>
                        <div className={styles.card_badges}>
                            {staycation.addressVerified
                                ? <span className={styles.status_badge_verified}>Đã xác thực</span>
                                : <span className={styles.status_badge_unverified}>Chưa xác thực</span>}
                        </div>
                    </div>
                </div>
                <div className={styles.card_chevron}>
                    {openCard === "address" ? <ChevronUp size={18} color="#6A6A6A" /> : <ChevronDown size={18} color="#6A6A6A" />}
                </div>
            </div>

            <AnimatePresence>
                {openCard === "address" && (
                    <motion.div className={styles.card_body}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div className={styles.sub_divider} />
                        <div className={styles.sub_section} style={{ padding: 0, paddingBottom: 16 }}>
                            <div className={styles.sub_label_row} style={{ justifyContent: "center", paddingTop: 16, paddingBottom: 16 }}>
                                <span className={styles.email_address} style={{ textAlign: "center" }}>
                                    {addressString}
                                </span>
                            </div>
                            {staycation.location?.gps && (
                                <div style={{ height: "250px", overflow: "hidden", borderRadius: 16, margin: "0 16px" }}>
                                    <MapContainer center={staycation.location.gps} zoom={20} style={{ height: "100%", width: "100%", zIndex: 0 }}
                                        dragging={true} zoomControl={true} scrollWheelZoom={false}
                                        doubleClickZoom={false} touchZoom={true}
                                        keyboard={false} attributionControl={false}>
                                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
                                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
                                        <Marker position={staycation.location.gps} icon={customIcon}>
                                            <Popup closeButton={false} closeOnClick={false} autoClose={false}> Chỗ ở của bạn </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
