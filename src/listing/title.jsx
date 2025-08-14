import { useListing } from "./listingContext";
import styles from "./listing.module.css"

export default function Title() {

    const {listing, uploadName} = useListing()

    return (
        <div className={styles.pageContent}>
            <h1 style={{marginBottom: "4px"}}>Đầu tiên, hãy đặt tên cho chổ ở của bạn</h1>
            <div className={styles.intrustion} style={{paddingBottom: "24px", color: "#6A6A6A"}}>
                Tên ngắn gọn có hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay đổi sau.
            </div>
            <textarea className={styles.textarea} rows={5} onChange={uploadName} value={listing.name}></textarea>
            <div className={styles.words_limit} >
                {listing.name.length} / 32
            </div>
        </div>
    )
}