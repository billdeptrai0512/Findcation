import { useOutletContext } from "react-router-dom";
import { useHost } from "../hostContext";
import GoogleIcon from "../../assets/google.webp"

import styles from "../host.module.css"
import Facebook from "./facebook";
import Instagram from "./instagram";
import Zalo from "./zalo";

export default function Contacts() {
    const { host } = useHost()
    const { setOpenContactEditor } = useOutletContext()

    const handleOpen = (type, url) => {
        setOpenContactEditor({ type, url })
    }

    return (
        <div >
            {/* contacts is not in staycation but in user profile */}
            <h2 style={{ marginTop: "0", fontSize: "1.48em", marginBottom: "8px" }}>Thông tin liên lạc</h2>

            <div className={styles.contacts} >

                <div className={styles.contact} >

                    <img src={GoogleIcon} alt="" style={{ width: "33px" }} />
                    <span style={{ flex: "1", textAlign: "center" }}>{host.email}</span>

                </div>

                <Facebook host={host} handleOpen={handleOpen} />

                <Instagram host={host} handleOpen={handleOpen} />

                <Zalo host={host} handleOpen={handleOpen} />

            </div>

        </div>
    );
}

