import { useOutletContext } from "react-router-dom";
import { useHost } from "../hostContext";
import FacebookIcon from "../../assets/facebook.webp"
import InstagramIcon from "../../assets/instagram.webp"
import ZaloIcon from "../../assets/zalo.webp"

import styles from "../host.module.css"

export default function Contacts({ }) {

    const { host } = useHost()

    const handleOpen = (type, url) => {
        if (type === 'facebook') {
            window.open(`https://www.facebook.com/${url}`, "_blank")
        } else if (type === 'instagram') {
            window.open(`https://www.instagram.com/${url}`, "_blank")
        } else if (type === 'zalo') {
            window.open(`https://www.zalo.me/${url}`, "_blank")
        }
    }

    return (
        <div >

            <div className={styles.contacts} >

                <div className={styles.contact} style={{ cursor: "pointer" }} onClick={() => handleOpen('facebook', host.contacts.facebook)}>
                    <img src={FacebookIcon} alt="" style={{ width: "33px" }} />
                    <span style={{ flex: "1", textAlign: "center", paddingLeft: "8px" }}>{host.contacts.facebook}</span>
                </div>

                <div className={styles.contact} style={{ cursor: "pointer" }} onClick={() => handleOpen('instagram', host.contacts.instagram)}>
                    <img src={InstagramIcon} alt="" style={{ width: "33px" }} />
                    <span style={{ flex: "1", textAlign: "center", paddingLeft: "8px" }}>{host.contacts.instagram}</span>
                </div>

                <div className={styles.contact} style={{ cursor: "pointer" }} onClick={() => handleOpen('zalo', host.contacts.zalo)}>
                    <img src={ZaloIcon} alt="" style={{ width: "33px" }} />
                    <span style={{ flex: "1", textAlign: "center", paddingLeft: "8px" }}>{host.contacts.zalo}</span>
                </div>

            </div>

        </div>
    );
}

