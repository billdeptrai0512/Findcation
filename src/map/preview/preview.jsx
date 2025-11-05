
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft  } from "lucide-react";
import styles from "../map.module.css";
import Images from "./images";
import Details from "./details";
import html2canvas from "html2canvas";

export default function Preview({ staycation }) {

    const navigate = useNavigate()
    const staycationRef = useRef(null);

    const [screenshotTaken, setScreenshotTaken] = useState(false);

    useEffect(() => {
        setScreenshotTaken(false);
    }, [staycation.id]);

    // 👇 Function to take a screenshot
    const takeScreenshot = async () => {
        if (!staycationRef.current || screenshotTaken) return; // ⛔ prevent repeat
        setScreenshotTaken(true); // mark as taken

        const ref = staycationRef.current;
        const originalOverflow = ref.style.overflow;
        const originalHeight = ref.style.height;

        // 🔹 Expand container to full content height
        ref.style.overflow = "visible";
        ref.style.height = "auto";

        // Wait for animations / layout updates
        await new Promise(r => setTimeout(r, 800));

        // 🔹 Wait until all images inside are loaded
        const images = ref.querySelectorAll("img");
        await Promise.all(
            Array.from(images).map(img => {
            img.setAttribute("crossOrigin", "anonymous");
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = img.onerror = resolve;
            });
            })
        );

        // 🔹 Capture the screenshot
        const canvas = await html2canvas(ref, {
            useCORS: true,
            backgroundColor: "#ffffff",
            scale: window.devicePixelRatio,
        });

        // 🔹 Restore original styles
        ref.style.overflow = originalOverflow;
        ref.style.height = originalHeight;

        // 🔹 Apply rounded corner mask
        const { width, height } = canvas;
        const roundedCanvas = document.createElement("canvas");
        roundedCanvas.width = width;
        roundedCanvas.height = height;
        const rctx = roundedCanvas.getContext("2d");

        const radius = 16;
        rctx.beginPath();
        rctx.moveTo(radius, 0);
        rctx.lineTo(width - radius, 0);
        rctx.quadraticCurveTo(width, 0, width, radius);
        rctx.lineTo(width, height - radius);
        rctx.quadraticCurveTo(width, height, width - radius, height);
        rctx.lineTo(radius, height);
        rctx.quadraticCurveTo(0, height, 0, height - radius);
        rctx.lineTo(0, radius);
        rctx.quadraticCurveTo(0, 0, radius, 0);
        rctx.closePath();
        rctx.clip();
        rctx.drawImage(canvas, 0, 0, width, height);

        // 🔹 Save the image
        const dataUrl = roundedCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${staycation.name}.png`;
        link.click();
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

                    <Details staycation={staycation} takeScreenshot={takeScreenshot} />
                    
                </div >
            </div>

        </div>
        
    );


}


