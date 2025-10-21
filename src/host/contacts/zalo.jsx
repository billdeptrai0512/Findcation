import ZaloIcon from "../../assets/zalo.png";
import { ExternalLink } from "lucide-react";
import styles from "../host.module.css"

export default function Zalo({host, handleOpen}) {    

    return (
        <div className={styles.contact}  onClick={() => handleOpen("zalo", host.contacts?.zalo)}>
            <img src={ZaloIcon} alt="" style={{width:"33px"}} />
            <span style={{flex: "1", textAlign: "center"}}>{host.contacts?.zalo}</span>
            <ExternalLink size={20} 
                style={{zIndex: 2, cursor: "pointer"}}
                onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://zalo.me/${host.contacts?.zalo}`, "_blank")
                }}
            />
        </div>
    )
}