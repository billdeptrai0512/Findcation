
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft  } from "lucide-react";
import styles from "../map.module.css";
import Images from "./images";
import Details from "./details";
import html2canvas from "html2canvas";

export default function Preview({ staycation }) {

    const navigate = useNavigate()
    const [canvas, setCanvas] = useState(null)
    const [loading, setLoading] = useState(true)
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
        ref.style.height = "auto";

        const activeImages = [...ref.querySelectorAll("img[class*='active']")];

        await Promise.all(
            activeImages.map(img => {
                img.crossOrigin = "anonymous";
                return img.complete
                    ? Promise.resolve()
                    : new Promise(res => (img.onload = img.onerror = res));
            })
        );

        const canvas = await html2canvas(ref, {
            useCORS: true,
            backgroundColor: "#fff",
            scale: devicePixelRatio,
        });


        return canvas;
    };

    const downloadImage = (canvas) => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `${staycation.name}.png`;
        a.click();
    };


    return (
        <div className={styles.preview_container}>

            <div className={styles.preview_card} ref={staycationRef} onClick={(e) => e.stopPropagation()}>

                <div className={styles.preview_header}>

                    <h1>Findcation</h1> 

                    <button onClick={() => navigate("/")}>
                        <ChevronLeft size={20}/>
                    </button>

                </div>

                <div >

                    <Images listing={staycation} />

                    <Details staycation={staycation} downloadImage={downloadImage} canvas={canvas} loading={loading}/>
                    
                </div >
            </div>

        </div>
        
    );


}


