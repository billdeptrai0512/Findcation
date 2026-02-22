import { useHost } from "../hostContext";
import FacebookIcon from "../../assets/facebook.webp";
import InstagramIcon from "../../assets/instagram.webp";
import ZaloIcon from "../../assets/zalo.webp";
import styles from "../host.module.css";
import { getContactUrl } from "../../utils/contactUtils";

export default function Contacts() {
    const { host } = useHost();

    const handleOpen = (type, url) => {
        if (type === "facebook") window.open(`https://www.facebook.com/${url}`, "_blank");
        if (type === "instagram") window.open(`https://www.instagram.com/${url}`, "_blank");
        if (type === "zalo") window.open(`https://zalo.me/${url}`, "_blank");
    };

    const fb = getContactUrl(host.contacts.facebook);
    const ig = getContactUrl(host.contacts.instagram);
    const za = getContactUrl(host.contacts.zalo);

    return (
        <div>
            <div className={styles.contacts}>

                {fb && (
                    <div className={styles.contact} style={{ cursor: "pointer" }}
                        onClick={() => handleOpen("facebook", fb)}>
                        <img src={FacebookIcon} alt="" style={{ width: "33px" }} />
                        <span style={{ flex: "1", textAlign: "center", paddingLeft: "8px" }}>{fb}</span>
                    </div>
                )}

                {ig && (
                    <div className={styles.contact} style={{ cursor: "pointer" }}
                        onClick={() => handleOpen("instagram", ig)}>
                        <img src={InstagramIcon} alt="" style={{ width: "33px" }} />
                        <span style={{ flex: "1", textAlign: "center", paddingLeft: "8px" }}>{ig}</span>
                    </div>
                )}

                {za && (
                    <div className={styles.contact} style={{ cursor: "pointer" }}
                        onClick={() => handleOpen("zalo", za)}>
                        <img src={ZaloIcon} alt="" style={{ width: "33px" }} />
                        <span style={{ flex: "1", textAlign: "center", paddingLeft: "8px" }}>{za}</span>
                    </div>
                )}

            </div>
        </div>
    );
}
