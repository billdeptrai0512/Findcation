
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, X  } from "lucide-react";
import Logo from "../../assets/logo.png";
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

                    <span style={{display: "flex", alignItems: "center", gap: "8px"}}>
                        <img src={Logo} alt="logo" style={{width: "64px"}} />
                        <h1>Findcation</h1> 
                    </span>

                    <button onClick={() => navigate("/")}>
                        <X size={20}/>
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

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15);
    const v = c === 'x' ? r : (r & 0x3) | 8;
    return v.toString(16);
  });
}


