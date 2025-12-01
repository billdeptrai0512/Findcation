import InstagramIcon from "../../assets/instagram.webp";
import { ExternalLink } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import styles from "../host.module.css"


export default function Instagram({ host, handleOpen }) {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const instagramUrl = isMobile ? `instagram://user?username=` : `https://www.instagram.com/`

    return (
        <div className={styles.contact} onClick={() => handleOpen("instagram", host.contacts.instagram)}>
            <img src={InstagramIcon} alt="" style={{ width: "33px" }} />
            <span style={{ flex: "1", textAlign: "center" }}>{host.contacts.instagram}</span>
            {host.contacts.instagram &&
                <ExternalLink size={20}
                    style={{ zIndex: 2, cursor: "pointer" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(`${instagramUrl}${host.contacts.instagram}`, "_blank")
                    }}
                />
            }
        </div>
    )
}