import { useEffect } from "react";
import { useListing } from "./listingContext";
import { useOutletContext } from "react-router-dom";
import styles from "./listing.module.css"

export default function Title() {

    const { setStepValidity, currentStep, goNext } = useOutletContext();
    const {listing, uploadName} = useListing()

    useEffect(() => {
        setStepValidity((prev) => ({
          ...prev,
          [currentStep]: listing.name.trim().length > 0
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing.name]);

    return (
        <div className={styles.pageContent}>   
            <h1 style={{marginBottom: "4px", fontSize: "1.68rem"}}>Đầu tiên, đặt tên cho chổ ở của bạn</h1>
            <span className={styles.intrustion} style={{paddingBottom: "24px", color: "#6A6A6A", fontSize: "0.925rem"}}>
                Tên ngắn gọn sẽ dễ nhớ nhất. Đừng lo lắng, bạn luôn có thể thay đổi sau.
            </span>
            <textarea className={styles.textarea} rows={5} onChange={uploadName} value={listing.name} onKeyDown={(e) => {e.key === "Enter" && goNext()}}></textarea>
            <div className={styles.words_limit} >
                {listing.name.length} / 32
            </div>
        </div>
    )
}