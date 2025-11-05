import { ArrowDown } from 'lucide-react';
import styles from "../map.module.css";
import Contacts from "./contacts";
import Features from "./features";

export default function Details({ staycation, takeScreenshot }) {

    const houseType = staycation.type === "house" ? "Toàn bộ căn nhà" : `${staycation.rooms?.length} phòng riêng`

    return (

        <div className={styles.preview_details} style={{ justifyContent: "space-between"}}>
            
            <div style={{display: "flex", justifyContent: "space-between", borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '18px 0'}}> 
                <h2 style={{fontSize: "1.1075rem", overflow: "hidden", marginTop: "0"}}>Tiêu đề</h2>
                <span>{staycation.name}</span>
            </div>

            <div style={{display: "flex", justifyContent: "space-between", borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '18px 0'}}> 
                <h2 style={{fontSize: "1.1075rem", overflow: "hidden", marginTop: "0"}}>Cho thuê</h2>
                <span>{houseType}</span>
            </div>

            <div style={{display: "flex", justifyContent:"space-between", alignItems: "center", borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '8px 0', flex: "1", width: "100%" }}>
                <h2 style={{fontSize: "1.1075rem", marginTop: "0"}}>Chi phí</h2>
                <div style={{fontSize: "0.975rem", padding:"12px 0", flex: "1", alignItems: "end", display: "flex", flexDirection: "column", gap: "4px"}}>
                    <span >{Number(staycation.prices.min).toLocaleString("vi-VN")}đ</span>
                    <span  style={{transform: "translateX(-200%)"}} > <ArrowDown strokeWidth={1.5} size={15} /> </span>
                    <span >{Number(staycation.prices.max).toLocaleString("vi-VN")}đ</span>
                </div>
            </div>

            <Features staycation={staycation} />

            <div style={{display: "flex", fjustifyContent:"space-between", alignItems: "center", borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '8px 0', flex: "1", width: "100%" }}>
                <h2 style={{fontSize: "1.1075rem", marginTop: "0"}}>Địa chỉ </h2>
                <div style={{fontSize: "0.975rem", padding:"12px 0", flex: "1", textAlign: "end", display: "flex", flexDirection: "column", gap: "4px"}}>
                    <span >{staycation.location.details.street}</span>
                    <span >{staycation.location.details.ward}</span>
                    <span >{staycation.location.details.city}</span>
                </div>
            </div>

            <Contacts staycation={staycation} takeScreenshot={takeScreenshot}/>
        
        </div>
        
    );


}



