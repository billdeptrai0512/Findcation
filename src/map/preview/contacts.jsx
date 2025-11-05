// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";


import FacebookIcon from "../../assets/facebook.png";
import InstagramIcon from "../../assets/instagram.png";
import Zalo from "../../assets/zalo.png";

export default function Contacts({staycation, takeScreenshot}) {

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

                <motion.span 
                    initial={{ scale: 1, y: -3 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}>
                        {contacts.facebook !== null  && 
                            <Link to={`${facebookUrl}${contacts.facebook}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await takeScreenshot();
                                    setTimeout(() => {
                                        window.open(`${facebookUrl}${contacts.facebook}`, "_blank");
                                    }, 800);
                                }}>
                                <img src={FacebookIcon} alt="" style={{width:"37px"}} />
                            </Link>
                        }
                </motion.span>

                <motion.span 
                    initial={{ scale: 1, y: -3 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}>
                        {contacts.instagram  !== null && 
                            <Link to={`${instagramUrl}${contacts.instagram}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await takeScreenshot();
                                    setTimeout(() => {
                                        window.open(`${instagramUrl}${contacts.instagram}`, "_blank");
                                    }, 800);
                                }}>
                                <img src={InstagramIcon} alt="" style={{width:"37px"}} />
                            </Link>
                        }
                </motion.span>

                <motion.span 
                    initial={{ scale: 1, y: -7 }}
                    whileHover={{ scale: 1.1, y: -7 }}
                    whileTap={{ scale: 0.9, y: -7 }}
                    transition={{ type: "spring", stiffness: 300 }}>
                        {contacts.zalo !== null && 
                            <Link to={`https://zalo.me/${contacts.zalo}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await takeScreenshot();
                                    setTimeout(() => {
                                        window.open(`https://zalo.me/${contacts.zalo}`, "_blank");
                                    }, 800);
                                }}>
                                    <img src={Zalo} alt="" style={{width:"46px"}} />
                            </Link>
                        }
                </motion.span>

                
            </div>


        </div>
    )
}