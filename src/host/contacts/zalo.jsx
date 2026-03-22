import ZaloIcon from "../../assets/zalo.webp";
import { PenLine } from "lucide-react";
import styles from "../host.module.css";
import { getContactUrl } from "../../utils/contactUtils";

export default function Zalo({ host, handleOpen }) {
    const url = getContactUrl(host.contacts.zalo);

    // if (!url) return null;

    return (
        <div className={styles.contact} onClick={() => url && window.open(`https://zalo.me/${url}`, "_blank")}>
            <img src={ZaloIcon} alt="" style={{ width: "33px" }} />
            <span style={{ flex: "1", textAlign: "center", color: url ? "inherit" : "#6A6A6A" }}>
                {url || "Chưa thiết lập"}
            </span>

            <PenLine size={20}
                style={{ zIndex: 2, cursor: "pointer", color: "#6A6A6A" }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen("zalo", url);
                }}
            />
        </div>
    );
}