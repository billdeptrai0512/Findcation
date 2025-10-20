import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import FacebookIcon from "../../assets/facebook.png";
import InstagramIcon from "../../assets/instagram.png";
import Zalo from "../../assets/zalo.png";

export default function Contacts({staycation}) {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    // const noContactVerified = (staycation.contacts.facebook.verified === false || !staycation.contacts.facebook.verified) &&
    //                         (staycation.contacts.instagram.verified === false || !staycation.contacts.instagram.verified) &&
    //                         (staycation.contacts.zalo.verified === false || !staycation.contacts.zalo.verified)

    //                         console.log(noContactVerified)

    // if (noContactVerified) return null
    const { contacts } = staycation.host;
    const facebookUrl = isMobile ? `fb://page/` : `https://www.facebook.com/`
    const instagramUrl = isMobile ? `instagram://user?username=` : `https://www.instagram.com/`

    return (
        <div style={{display: "flex", justifyContent:"space-between", alignItems: "center", padding: '8px 0', gap: "8px"}}>

            <h2 style={{fontSize: "1.1075rem", marginTop: "0"}}> Liên lạc </h2>

            <div style={{display: "flex",  padding: '8px 0', borderRadius: "8px", gap: "1em"}}>

                <span style={{transform:"translateX(20%)"}}>
                    {contacts.facebook.url  && 
                        <Link to={`${facebookUrl}${contacts.facebook.url}`} target="_blank" rel="noopener noreferrer">
                            <img src={FacebookIcon} alt="" style={{width:"37px"}} />
                        </Link>
                    }
                </span>

                <span style={{transform:"translateX(15%)"}}>
                    {contacts.instagram.url && 
                        <Link to={`${instagramUrl}${contacts.instagram.url}`} target="_blank" rel="noopener noreferrer">
                            <img src={InstagramIcon} alt="" style={{width:"37px"}} />
                        </Link>
                    }
                </span>

                <span style={{transform:"translateY(-7%)"}}>
                    {contacts.zalo.url && 
                        <Link to={`https://zalo.me/${contacts.zalo.url}`} target="_blank" rel="noopener noreferrer">
                            <img src={Zalo} alt="" style={{width:"46px"}} />
                        </Link>
                    }
                </span>

                
            </div>


        </div>
    )
}