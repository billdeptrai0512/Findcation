
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

    const navigate = useNavigate()
    const [canvas, setCanvas] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showContacts, setShowContacts] = useState(false)
    const staycationRef = useRef(null);

    const [screenshotTaken, setScreenshotTaken] = useState(false);

    useEffect(() => {
        setScreenshotTaken(false);
        setLoading(true);

        setTimeout(() => {
            captureImage().then(setCanvas);
            setLoading(false);
        }, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staycation.id]);

    const countAsTrafficContactClick = async () => {

        // if staycation isn't verify then it also trigger contact_warning_shown
        await apiClient.post(`/traffic/${staycation.id}`, {
            trafficType: "CONTACT_CLICK",
            platform: "NULL",
            sessionId: localStorage.getItem("traffic_session")
        });

        return setShowContacts(true)

    };

    const countAsTrafficWarningShown = async () => {

        await apiClient.post(`/traffic/${staycation.id}`, {
            trafficType: "CONTACT_CLICK",
            platform: "NULL",
            sessionId: localStorage.getItem("traffic_session")
        });

        await apiClient.post(`/traffic/${staycation.id}`, {
            trafficType: "CONTACT_WARNING_SHOWN",
            platform: "NULL",
            sessionId: localStorage.getItem("traffic_session")
        });

        return setShowWarning(true)

    };

    const countAsTrafficContactCancel = async () => {

        await apiClient.post(`/traffic/${staycation.id}`, {
            trafficType: "CONTACT_WARNING_CANCEL",
            platform: "NULL",
            sessionId: localStorage.getItem("traffic_session")
        });

    };

    const countAsTrafficContactContinue = async () => {

        await apiClient.post(`/traffic/${staycation.id}`, {
            trafficType: "CONTACT_CONTINUE",
            platform: "NULL",
            sessionId: localStorage.getItem("traffic_session")
        });

        return setShowContacts(true)

    };

    const handleContactClick = () => {
        if (!staycation.verify) {
            countAsTrafficWarningShown()
        } else {
            countAsTrafficContactClick();
        }
    };

    const handleWarningCancel = () => {
        setShowWarning(false);
        countAsTrafficContactCancel()
    };

    const handleWarningContinue = () => {
        setShowWarning(false);
        countAsTrafficContactContinue();
    };

    // 👇 Function to take a screenshot

    const captureImage = async () => {
        if (!staycationRef.current || screenshotTaken) return;
        setScreenshotTaken(true);

        const ref = staycationRef.current;

        ref.style.overflow = "visible";

        const activeImages = [...ref.querySelectorAll("img[class*='active']")];

        await Promise.all(
            activeImages.map(img => {
                img.crossOrigin = "anonymous";
                return img.complete
                    ? Promise.resolve()
                    : new Promise(res => (img.onload = img.onerror = res));
            })
        );

        await new Promise(r => setTimeout(r, 50));

        const canvas = await html2canvas(ref, {
            useCORS: true,
            backgroundColor: "#fff",
            scale: devicePixelRatio,
        });

        ref.style.overflow = "";

        return canvas;
    };

    const downloadImage = (canvas) => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        const fileName = uuidv4();
        a.download = `${fileName}.png`;
        a.click();
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

                    <Details staycation={staycation} downloadImage={downloadImage} canvas={canvas} loading={loading} />

                </div>

                <div className={styles.preview_footer}>

                    {!showContacts && !showWarning && <motion.button className={styles.options_button}
                        onClick={() => setOpenSuggestions(true)}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                        <h2 style={{ fontSize: "0.975rem", marginTop: "0", marginBottom: "0" }}>Báo lỗi</h2>
                    </motion.button>
                    }


                    {/* render button contact on top of the img - meaning both render at the start.  */}

                    {!showContacts && !showWarning && <motion.button className={styles.preview_contact_button}
                        onClick={handleContactClick}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                        <h2 style={{ fontSize: "0.975rem", marginTop: "0", marginBottom: "0" }}>Nhắn cho chủ nhà</h2>
                    </motion.button>}

                    {/* Warning Panel & Contacts - Combined for smooth transition */}
                    <AnimatePresence mode="wait">
                        {showWarning && (
                            <InlineWarning
                                key="warning"
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


