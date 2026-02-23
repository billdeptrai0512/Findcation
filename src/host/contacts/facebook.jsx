import FacebookIcon from "../../assets/facebook.webp";
import { PenLine } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import styles from "../host.module.css";
import { getContactUrl } from "../../utils/contactUtils";

export default function Facebook({ host, handleOpen }) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const baseUrl = isMobile ? `fb://page/` : `https://www.facebook.com/`;
    const url = getContactUrl(host.contacts.facebook);

    // if (!url) return null;

    return (
        <div className={styles.contact} onClick={() => url && window.open(`${baseUrl}${url}`, "_blank")}>
            <img src={FacebookIcon} alt="" style={{ width: "33px" }} />
            <span style={{ flex: "1", textAlign: "center" }}>{url}</span>

            <PenLine size={20}
                style={{ zIndex: 2, cursor: "pointer" }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen("facebook", url);
                }}
            />
        </div>
    );
}