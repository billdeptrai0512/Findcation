
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../../assets/logo.webp";
import styles from "./preview.module.css"
import Images from "./images";
import Details from "./details";
import Suggestion from "./suggestion";
import html2canvas from "html2canvas";
import Contacts from "./contacts";

export default function Preview({ staycation }) {

    const [openSuggestions, setOpenSuggestions] = useState(false)

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

                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img src={Logo} alt="logo" style={{ width: "64px" }} />
                        <h1>Findcation</h1>
                    </span>

                    <motion.button className={styles.options_button}
                        onClick={() => setOpenSuggestions(true)}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                        <p style={{ fontSize: "0.875rem", marginTop: "0" }}>góp ý</p>
                    </motion.button>

                </div>

                {openSuggestions && <Suggestion setOpenSuggestions={setOpenSuggestions} />}

                <div >

                    <Images staycation={staycation} />

                    <Details staycation={staycation} downloadImage={downloadImage} canvas={canvas} loading={loading} />

                </div>

                <div className={styles.preview_footer}>

                    <motion.button className={styles.preview_back_button}
                        onClick={() => navigate("/")}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                        <h2 style={{ fontSize: "0.975rem", marginTop: "0", marginBottom: "0" }}>Quay lại</h2>
                    </motion.button>

                    {/* render button contact on top of the img - meaning both render at the start.  */}

                    {!showContacts && <motion.button className={styles.preview_contact_button}
                        onClick={() => setShowContacts(true)}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                        <h2 style={{ fontSize: "0.975rem", marginTop: "0", marginBottom: "0" }}>Liên hệ</h2>
                    </motion.button>}


                    <AnimatePresence mode="wait">
                        {showContacts && (
                            <motion.div
                                key="contacts"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.25 }}
                            >
                                <Contacts
                                    staycation={staycation}
                                    downloadImage={downloadImage}
                                    canvas={canvas}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>


            </div>

        </div>

    );


}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15);
        const v = c === 'x' ? r : (r & 0x3) | 8;
        return v.toString(16);
    });
}


