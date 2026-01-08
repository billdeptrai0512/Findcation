import { ArrowRight } from 'lucide-react';
import styles from "./preview.module.css"
import Features from "./features";

export default function Details({ staycation, downloadImage, canvas, loading }) {

    const houseType = staycation.type === "house" ? "Toàn bộ căn nhà" : `${staycation.rooms?.length} phòng riêng`

    return (

        <div className={styles.preview_details} style={{ justifyContent: "space-between", gap: "8px", padding: "0 8px" }}>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: '8px', boxShadow: '0 5px 10px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                <h2 style={{ fontSize: "1.1075rem", overflow: "hidden", marginTop: "0" }}>Tiêu đề</h2>
                <span style={{ fontSize: "0.975rem", overflow: "hidden" }}>{staycation.name}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: '8px', boxShadow: '0 5px 10px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                <h2 style={{ fontSize: "1.1075rem", overflow: "hidden", marginTop: "0" }}>Cho thuê</h2>
                <span style={{ fontSize: "0.975rem", overflow: "hidden" }}>{houseType}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: '8px', boxShadow: '0 5px 10px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                <h2 style={{ fontSize: "1.1075rem", overflow: "hidden", marginTop: "0" }}>Chi phí</h2>
                <div style={{ fontSize: "0.975rem", flex: "1", display: "flex", gap: "4px", alignItems: "center" }}>
                    <span >{Number(staycation.prices.min).toLocaleString("vi-VN")}đ</span>
                    <ArrowRight strokeWidth={1.5} size={15} />
                    <span >{Number(staycation.prices.max).toLocaleString("vi-VN")}đ</span>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: '8px', boxShadow: '0 5px 10px rgba(0,0,0,0.1)', borderRadius: '4px', }}>
                <h2 style={{ fontSize: "1.1075rem", overflow: "hidden", marginTop: "0" }}>Địa chỉ </h2>
                <div style={{ fontSize: "0.975rem", padding: "4px 0", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span >{staycation.location.details.street}</span>
                    <span >{staycation.location.details.ward} - {staycation.location.details.city}</span>
                    <span ></span>
                </div>
            </div>

            <Features staycation={staycation} />

            {/* <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2em", flex: "1", width: "100%" }}>

                <motion.button className={styles.nearby_button}
                    onClick={() => navigate("/")}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <h2 style={{ fontSize: "0.875rem", marginTop: "0" }}>Quay lại</h2>
                </motion.button>

                <motion.button className={styles.cta_button}
                    onClick={() => navigate("/")}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <h2 style={{ fontSize: "0.875rem", marginTop: "0" }}>Liên hệ</h2>
                </motion.button>

            </div> */}

            {/* <Contacts staycation={staycation} downloadImage={downloadImage} canvas={canvas} loading={loading}/> */}

        </div>

    );


}



