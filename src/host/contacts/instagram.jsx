import InstagramIcon from "../../assets/instagram.webp";
import { PenLine } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import styles from "../host.module.css";
import { getContactUrl } from "../../utils/contactUtils";

export default function Instagram({ host, handleOpen }) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const baseUrl = isMobile ? `instagram://user?username=` : `https://www.instagram.com/`;
    const url = getContactUrl(host.contacts.instagram);

    // if (!url) return null;

    return (
        <div className={styles.contact} onClick={() => url && window.open(`${baseUrl}${url}`, "_blank")}>
            <img src={InstagramIcon} alt="" style={{ width: "33px" }} />
            <span style={{ flex: "1", textAlign: "center" }}>{url}</span>

            <PenLine size={20}
                style={{ zIndex: 2, cursor: "pointer" }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen("instagram", url);
                }}
            />
        </div>
    );
}