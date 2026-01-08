// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

import FacebookIcon from "../../assets/facebook.webp";
import InstagramIcon from "../../assets/instagram.webp";
import Zalo from "../../assets/zalo.webp";

export default function Contacts({ staycation }) {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleClick = (platform, url) => async (e) => {
        e.preventDefault(); // prevent default navigation

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/traffic/${staycation.id}`, {
            trafficType: "CONTACT_SUCCESS",
            platform: platform,
            sessionId: localStorage.getItem("traffic_session")
        });

        window.open(url, "_blank");
    };

    const { contacts } = staycation.host;
    const facebookUrl = isMobile ? `fb://page/` : `https://www.facebook.com/`
    const instagramUrl = isMobile ? `instagram://user?username=` : `https://www.instagram.com/`

    return (
        <motion.div transition={{ type: "spring", stiffness: 300 }}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: '8px', boxShadow: '0 5px 10px rgba(0,0,0,0.2)', border: "2px solid rgba(0,0,0,0.1)", borderRadius: '16px' }}>

            {/* <h2 style={{ fontSize: "1.1075rem", marginTop: "0" }}> Liên lạc </h2> */}

            <div style={{ display: "flex", borderRadius: "8px", gap: "1em", padding: "0 12px", justifyContent: "space-between" }}>

                <motion.span
                    initial={{ scale: 1, y: 3 }}
                    whileHover={{ scale: 1.1, y: 3 }}
                    whileTap={{ scale: 0.9, y: 3 }}
                    transition={{ type: "easeOut", stiffness: 300 }}>
                    {contacts.facebook !== "" &&
                        <Link to={`${facebookUrl}${contacts.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick("FACEBOOK", `${facebookUrl}${contacts.facebook}`)}
                        >
                            <img src={FacebookIcon} alt="" style={{ width: "34px" }} />
                        </Link>
                    }
                </motion.span>

                <motion.span
                    initial={{ scale: 1, y: 3 }}
                    whileHover={{ scale: 1.1, y: 3 }}
                    whileTap={{ scale: 0.9, y: 3 }}
                    transition={{ type: "easeOut", stiffness: 100 }}>
                    {contacts.instagram !== "" &&
                        <Link to={`${instagramUrl}${contacts.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick("INSTAGRAM", `${instagramUrl}${contacts.instagram}`)}
                        >
                            <img src={InstagramIcon} alt="" style={{ width: "34px" }} />
                        </Link>
                    }
                </motion.span>

                <motion.span
                    initial={{ scale: 1, y: -1, x: -1 }}
                    whileHover={{ scale: 1.1, y: -1, x: -1 }}
                    whileTap={{ scale: 0.9, y: -1, x: -1 }}
                    transition={{ type: "easeOut", stiffness: 100 }}>
                    {contacts.zalo !== "" &&
                        <Link to={`https://zalo.me/${contacts.zalo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick("ZALO", `https://zalo.me/${contacts.zalo}`)}
                        >
                            <img src={Zalo} alt="" style={{ width: "42px" }} />
                        </Link>
                    }
                </motion.span>


            </div>


        </motion.div>
    )
}