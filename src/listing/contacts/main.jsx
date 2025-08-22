import styles from "../listing.module.css";
import Facebook from "./facebook";
import Zalo from "./zalo";
import Instagram from "./instagram";


export default function Contacts() {

    return (
        <div className={styles.pageContent}>
            <h1 style={{ marginBottom: "4px", fontSize: "1.68rem" }}>Bây giờ, hãy liên kết thông tin liên lạc.</h1>
            <div className={styles.intrustion} style={{ paddingBottom: "8px", color: "#6A6A6A" }}>
                Sau đó, đặt bảng giá cho thuê staycation
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "48px", marginTop: "16px" }}>
                <div className={styles.contact_information_container}style={{ width: "100%" }}>
                    <Facebook />
                    <Zalo />
                    {/* <Instagram /> */}
                    
                </div>
            </div>
        </div>
    );
}
