
import { featureIconMap  } from "../../assets/featureIcons";
import styles from "../map.module.css";
import Contacts from "./contacts";

export default function Details({ staycation }) {

    const houseType = staycation.type === "house" ? "Cho thuê toàn bộ căn nhà" : "Cho thuê phòng trong căn nhà"

    return (

        <div className={styles.preview_details} style={{ justifyContent: "space-between"}}>
            
            {/* type of hose */}
            <div style={{display: "flex", flexDirection: "column", gap: "4px", borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}> 
                <h2 style={{fontSize: "1.1075rem", overflow: "hidden", marginTop: "0"}}>{houseType}</h2>
            </div>
            
            {/* features */}
            <div style={{display: "flex", flexDirection: "column", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0 0'}}>
                <h2 style={{fontSize: "1.1075rem", marginTop: "0", marginBottom:"16px"}}>Tiện nghi</h2>
                {staycation.features.map((feature, index) => (
                    <div
                        key={index}
                        style={{
                        fontSize: "0.975rem",
                        padding: "12px 0",
                        borderBottom: "1px solid rgba(0,0,0,0.04)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        }}
                    >
                        <span>{feature}</span>
                        <span>{featureIconMap[feature]}</span>
                    </div>
                    ))}
            </div>

            {console.log(staycation.location)}

            <div style={{display: "flex", fjustifyContent:"space-between", alignItems: "center", gap: "4px", padding: '16px 0', flex: "1", width: "100%" }}>
                <h2 style={{fontSize: "1.1075rem", marginTop: "0"}}>Địa chỉ </h2>
                <div style={{fontSize: "0.975rem", padding:"12px 0", flex: "1", textAlign: "end", display: "flex", flexDirection: "column"}}>
                    <span >{staycation.location.details.street}</span>
                    <span >{staycation.location.details.ward}</span>
                    <span >{staycation.location.details.city}</span>
                </div>
            </div>

            <Contacts staycation={staycation} />
        
        </div>
        
    );


}



