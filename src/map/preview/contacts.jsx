import { Link } from "react-router-dom";
import FacebookIcon from "../../assets/facebook.png";
import InstagramIcon from "../../assets/instagram.png";
import Zalo from "../../assets/zalo.png";

export default function Contacts({staycation}) {

    const noContactVerified = (staycation.contacts.facebook.verified === false || !staycation.contacts.facebook.verified) &&
                            (staycation.contacts.instagram.verified === false || !staycation.contacts.instagram.verified) &&
                            (staycation.contacts.zalo.verified === false || !staycation.contacts.zalo.verified)

                            console.log(noContactVerified)

    if (noContactVerified) return null

    return (
        <div style={{display: "flex", flexDirection: "column", padding: '16px 0'}}>


            <div style={{display: "flex", justifyContent:"space-evenly" ,padding: '8px 0', borderRadius: "8px"
            , boxShadow:`0 0 0 1px transparent, 0 0 0 4px transparent, 0 2px 4px rgba(0, 0, 0, 0.18)`}}>

                <span>
                    {staycation.contacts.facebook.verified === true  && 
                        <Link to={`https://www.facebook.com/${staycation.contacts.facebook.url}`} target="_blank" rel="noopener noreferrer">
                            <img src={FacebookIcon} alt="" style={{width:"37px"}} />
                        </Link>
                    }
                </span>
                <span>
                    {staycation.contacts.instagram.verified === true && 
                        <Link to={`https://www.instagram.com/${staycation.contacts.instagram.url}`} target="_blank" rel="noopener noreferrer">
                            <img src={InstagramIcon} alt="" style={{width:"37px"}} />
                        </Link>
                    }
                </span>
                <span>
                    {staycation.contacts.zalo.verified === true && 
                        <Link to={`https://zalo.me/${staycation.contacts.zalo.url}`} target="_blank" rel="noopener noreferrer">
                            <img src={Zalo} alt="" style={{width:"37px"}} />
                        </Link>
                    }
                </span>
                
            </div>


        </div>
    )
}