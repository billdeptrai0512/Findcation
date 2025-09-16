import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "../listing.module.css";
import Map from "./map";
import MobileReview from "./mobilePreview";
import DesktopReview from "./desktopPreview";

export default function Final() {

    const [renderPreview, setRenderPreview] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

    return (
        <>
            <div className={styles.pageContent}>

                <h1 style={{marginBottom: "4px", fontSize: "1.68rem"}}>Mọi thứ đã sẵn sàng!</h1>

                {/* <Map setRenderPreview={setRenderPreview}/> */}
                
            </div>

            {/* <div className={styles.preview_overlay} style={{display: renderPreview ? "flex" : "none"}}>
                

                {renderPreview && (
                    isMobile ? (
                        <MobileReview renderPreview={renderPreview} setRenderPreview={setRenderPreview} />
                    ) : (
                        <DesktopReview renderPreview={renderPreview} setRenderPreview={setRenderPreview} />
                    )
                )}


            </div> */}


        </>

    );
}

