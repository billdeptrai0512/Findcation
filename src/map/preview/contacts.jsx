import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import FacebookIcon from "../../assets/facebook.png";
import InstagramIcon from "../../assets/instagram.png";
import Zalo from "../../assets/zalo.png";

export default function Contacts({staycation}) {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const noContactVerified = (staycation.contacts.facebook.verified === false || !staycation.contacts.facebook.verified) &&
                            (staycation.contacts.instagram.verified === false || !staycation.contacts.instagram.verified) &&
                            (staycation.contacts.zalo.verified === false || !staycation.contacts.zalo.verified)

                            console.log(noContactVerified)

    if (noContactVerified) return null

    const facebookUrl = isMobile ? `fb://page/` : `https://www.facebook.com/`
    const instagramUrl = isMobile ? `instagram://user?username=` : `https://www.instagram.com/`
    const border = isMobile 
  ? { boxShadow: "0 0 0 1px transparent, 0 0 0 4px transparent, 0 2px 4px rgba(0, 0, 0, 0.18)" } 
  : { border: "2px solid rgba(0, 0, 0, 0.04)" }

    return (
        <div style={{display: "flex", flexDirection: "column", paddingTop: '16px', marginBottom: '16px', textAlign: "center", gap: "8px", borderRadius: "8px"
            , ...border
        }}>

            <h2 style={{fontSize: "1.1075rem", marginTop: "0",}}>Đặt phòng </h2>

            <div style={{display: "flex", justifyContent:"space-evenly" ,padding: '8px 0', borderRadius: "8px"}}>

                <span>
                    {staycation.contacts.facebook.verified === true  && 
                        <Link to={`${facebookUrl}${staycation.contacts.facebook.url}`} target="_blank" rel="noopener noreferrer">
                            <img src={FacebookIcon} alt="" style={{width:"37px"}} />
                        </Link>
                    }
                </span>
                <span>
                    {staycation.contacts.instagram.verified === true && 
                        <Link to={`${instagramUrl}${staycation.contacts.instagram.url}`} target="_blank" rel="noopener noreferrer">
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