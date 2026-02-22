import ZaloIcon from "../../assets/zalo.webp";
import { PenLine } from "lucide-react";
import styles from "../host.module.css";
import { getContactUrl } from "../../utils/contactUtils";

export default function Zalo({ host, handleOpen }) {
    const url = getContactUrl(host.contacts.zalo);

    if (!url) return null;

    return (
        <div className={styles.contact} onClick={() => window.open(`https://zalo.me/${url}`, "_blank")}>
            <img src={ZaloIcon} alt="" style={{ width: "33px" }} />
            <span style={{ flex: "1", textAlign: "center" }}>{url}</span>

            <PenLine size={20}
                style={{ zIndex: 2, cursor: "pointer" }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen("zalo", url);
                }}
            />
        </div>
    );
}