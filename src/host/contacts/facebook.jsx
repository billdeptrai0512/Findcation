import FacebookIcon from "../../assets/facebook.png";
import { ExternalLink } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import styles from "../host.module.css"


export default function Facebook({host, handleOpen}) {    

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const facebookUrl = isMobile ? `fb://page/` : `https://www.facebook.com/`

    return (
        <div className={styles.contact}  onClick={() => handleOpen("facebook", host.contacts.facebook)}>
            <img src={FacebookIcon} alt="" style={{width:"33px"}} />
            <span style={{flex: "1", textAlign: "center"}}>{host.contacts.facebook}</span>
            <ExternalLink size={20} 
                style={{zIndex: 2, cursor: "pointer"}}
                onClick={(e) => {
                    e.stopPropagation();
                    window.open(`${facebookUrl}${host.contacts.facebook}`, "_blank")
                }}
            />
        </div>
    )
}