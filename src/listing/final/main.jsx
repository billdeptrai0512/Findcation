import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "../listing.module.css";
import Map from "./map";
import MobileReview from "./mobilePreview";
import DesktopReview from "./desktopPreview";

export default function Final() {

    const [renderPreview, setRenderPreview] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

    console.log(isMobile)

    return (
        <>
            <div className={styles.pageContent}>
                <h1 style={{marginBottom: "4px", fontSize: "1.68rem"}}>Chúc mừng! Mọi thứ đã được chuẩn bị xong.</h1>

                <div className={styles.intrustion} style={{paddingBottom: "8px", color: "#6A6A6A", fontSize: "0.875rem"}}>
                    Bên dưới là góc nhìn của user với staycation của bạn. Bấm vào hình để xem phiên bản đầy đủ.
                </div>

                <Map setRenderPreview={setRenderPreview}/>
                
            </div>

            <div className={styles.preview_overlay} style={{display: renderPreview ? "flex" : "none"}}>
                

                {renderPreview && (
                    isMobile ? (
                        <MobileReview renderPreview={renderPreview} setRenderPreview={setRenderPreview} />
                    ) : (
                        <DesktopReview renderPreview={renderPreview} setRenderPreview={setRenderPreview} />
                    )
                )}


            </div>


        </>

    );
}

