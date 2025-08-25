import { Link } from "react-router-dom";
import FacebookIcon from "../../assets/facebook.png";
import InstagramIcon from "../../assets/instagram.png";
import Zalo from "../../assets/zalo.png";

export default function Contacts({staycation}) {

    return (
        <div style={{display: "flex", flexDirection: "column", padding: '16px 0'}}>

            <div style={{display: "flex", justifyContent:"space-evenly" ,padding: '8px 0'}}>
                <span>

                    <Link to={`https://www.facebook.com/${staycation.contacts.facebook}`} target="_blank" rel="noopener noreferrer">
                        <img src={FacebookIcon} alt="" style={{width:"37px"}} />
                    </Link>

                </span>
                <span>

                    <Link to={`https://www.instagram.com/${staycation.contacts.instagram}`} target="_blank" rel="noopener noreferrer">
                        <img src={InstagramIcon} alt="" style={{width:"37px"}} />
                    </Link>

                </span>
                <span>

                    <Link to={`https://zalo.me/${staycation.contacts.zalo}`} target="_blank" rel="noopener noreferrer">
                        <img src={Zalo} alt="" style={{width:"37px"}} />
                    </Link>

                </span>
            </div>
        </div>
    )
}