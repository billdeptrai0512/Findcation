
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from 'prop-types';
import Logo from "../../assets/logo.webp";
import styles from "./preview.module.css"
import Images from "./images";
import Details from "./details";
import Suggestion from "./suggestion";
import html2canvas from "html2canvas";
import Contacts from "./contacts";
import { ArrowLeft } from "lucide-react";
import { apiClient } from "../../config/api";
import InlineWarning from "./inlineWarning";

export default function Preview({ staycation }) {

    const [openSuggestions, setOpenSuggestions] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const [pendingContact, setPendingContact] = useState(null)

    const navigate = useNavigate()
    const [showContacts, setShowContacts] = useState(false)
    const staycationRef = useRef(null);

    const countAsTrafficContactClick = async () => {

        // if staycation isn't verify then it also trigger contact_warning_shown
        await apiClient.post(`/traffic/${staycation.id}`, {
            trafficType: "CONTACT_CLICK",
            platform: "NULL",
            sessionId: localStorage.getItem("traffic_session")
        });

        return setShowContacts(true)

    };

    const countAsTrafficWarningShown = async (platform, url) => {
        setPendingContact({ platform, url });

        await apiClient.post(`/traffic/${staycation.id}`, {
            trafficType: "CONTACT_WARNING_SHOWN",
            platform: platform,
            sessionId: localStorage.getItem("traffic_session")
        });

        setShowContacts(false);
        return setShowWarning(true);
    };

    const countAsTrafficContactCancel = async () => {
        await apiClient.post(`/traffic/${staycation.id}`, {
            trafficType: "CONTACT_WARNING_CANCEL",
            platform: pendingContact?.platform || "NULL",
            sessionId: localStorage.getItem("traffic_session")
        });

        setPendingContact(null);
        setShowWarning(false);
        return setShowContacts(true);
    };

    const countAsTrafficContactContinue = (platform) => {
        const payload = {
            trafficType: "CONTACT_CONTINUE",
            platform: platform || "NULL",
            sessionId: localStorage.getItem("traffic_session")
        };

        const endpoint = `${import.meta.env.VITE_BACKEND_URL}/traffic/${staycation.id}`;

        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
            navigator.sendBeacon(endpoint, blob);
        } else {
            apiClient.post(`/traffic/${staycation.id}`, payload);
        }
    };

    const handleWarningCancel = () => {
        countAsTrafficContactCancel();
    };

    const handleWarningContinue = () => {
        if (pendingContact) {
            countAsTrafficContactContinue(pendingContact.platform);
            window.open(pendingContact.url, "_blank", "noopener,noreferrer");
            setPendingContact(null);
            setShowWarning(false);
        }
    };

    return (
        <div className={styles.preview_container}>

            <div className={styles.preview_card} ref={staycationRef} onClick={(e) => e.stopPropagation()}>

                <div className={styles.preview_header}>

                    <motion.button className={styles.options_button}
                        onClick={() => navigate("/")}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                        <p style={{ fontSize: "1rem", marginTop: "0" }}><ArrowLeft size={18} />    </p>
                    </motion.button>

                    <img src={Logo} alt="logo" style={{ width: "68px" }} />


                </div>

                {openSuggestions && <Suggestion setOpenSuggestions={setOpenSuggestions} />}

                <div >

                    <Images staycation={staycation} />

                    <Details staycation={staycation} />

                </div>

                <div className={styles.preview_footer}>

                    {!showContacts && !showWarning && <motion.button className={styles.preview_contact_button}
                        onClick={countAsTrafficContactClick}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                        <h2 style={{ fontSize: "0.975rem", marginTop: "0", marginBottom: "0" }}>Kiểm tra phòng trống</h2>
                    </motion.button>}

                    {!showContacts && !showWarning && <motion.button className={styles.options_button}
                        onClick={() => setOpenSuggestions(true)}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                        <h2 style={{ fontSize: "0.975rem", marginTop: "0", marginBottom: "0" }}>Báo lỗi</h2>
                    </motion.button>
                    }

                    {/* Warning Panel & Contacts - Combined for smooth transition */}
                    <AnimatePresence mode="wait">
                        {showWarning && (
                            <InlineWarning
                                key="warning"
                                staycation={staycation}
                                onCancel={handleWarningCancel}
                                onContinue={handleWarningContinue}
                            />
                        )}

                        {showContacts && (
                            <motion.div
                                key="contacts"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.25 }}
                            >
                                <Contacts
                                    staycation={staycation}
                                    countAsTrafficWarningShown={countAsTrafficWarningShown}
                                    countAsTrafficContactCancel={countAsTrafficContactCancel}
                                    countAsTrafficContactContinue={countAsTrafficContactContinue}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>


            </div>

        </div>

    );


}

Preview.propTypes = {
    staycation: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        type: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
        location: PropTypes.shape({
            address: PropTypes.string,
            gps: PropTypes.shape({
                lat: PropTypes.number,
                lng: PropTypes.number
            })
        }),
        prices: PropTypes.shape({
            min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            max: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        }),
        features: PropTypes.arrayOf(PropTypes.string),
        contacts: PropTypes.shape({
            zalo: PropTypes.object,
            facebook: PropTypes.object,
            instagram: PropTypes.object
        })
    }).isRequired
};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15);
        const v = c === 'x' ? r : (r & 0x3) | 8;
        return v.toString(16);
    });
}


