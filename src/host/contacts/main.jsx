import { useOutletContext } from "react-router-dom";
import { useHost } from "../hostContext";
import GoogleIcon from "../../assets/google.webp"
import { Mail } from "lucide-react";

import styles from "../host.module.css"
import Facebook from "./facebook";
import Instagram from "./instagram";
import Zalo from "./zalo";

export default function Contacts({ setOpenContactEditor: setOpenContactEditorProp }) {
    const { host } = useHost()

    // Try to get from outlet context, fallback to prop
    let outletContext = null;
    try {
        outletContext = useOutletContext();
    } catch (e) {
        // Not in an outlet context, that's okay
    }

    const setOpenContactEditor = setOpenContactEditorProp || outletContext?.setOpenContactEditor;

    const handleOpen = (type, url) => {
        setOpenContactEditor({ type, url })
    }

    console.log(host.contacts)

    return (
        <div >

            <div className={styles.contacts} >

                <div className={styles.contact} >
                    <img src={GoogleIcon} alt="" style={{ width: "33px" }} />
                    <span style={{ flex: "1", textAlign: "left", paddingLeft: "8px" }}>{host.email}</span>
                </div>

                <Facebook host={host} handleOpen={handleOpen} />

                <Instagram host={host} handleOpen={handleOpen} />

                <Zalo host={host} handleOpen={handleOpen} />

            </div>

        </div>
    );
}

