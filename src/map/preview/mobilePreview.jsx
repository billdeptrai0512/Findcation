
import { ChevronLeft } from "lucide-react";
import { featureIconMap  } from "../../assets/featureIcons";
import { useNavigate } from "react-router-dom";
import styles from "../map.module.css";
import Contacts from "./contacts";
import Images from "./images";

export default function MobilePreview({ staycation }) {

    const navigate = useNavigate()

    const houseType = staycation.type === "house" ? "Cho thuê toàn bộ căn nhà" : "Cho thuê phòng trong căn nhà"

    return (
        <div className={styles.preview_container}>

            <div className={styles.preview_card}>

                <div className={styles.preview_header}>

                    <button onClick={() => navigate("/")}>
                        <ChevronLeft  size={20}/>
                    </button>

                    <h1>{staycation.name}</h1> 

                </div>

                {/* preview_information_desktop */}

                <div className={styles.preview_details} style={{display: "flex", flexDirection:"column" , margin: "0 auto"}}>
                    
                    <Images listing={staycation} />

                    <div style={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                        
                        {/* type of hose */}
                        <div style={{display: "flex", flexDirection: "column", gap: "4px", borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}> 
                            <h2 style={{fontSize: "1.1075rem", overflow: "hidden", marginTop: "0"}}>{houseType}</h2>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "4px", padding: '16px 0'}}>
                            <h2 style={{fontSize: "1.1075rem", marginTop: "0",}}>Địa chỉ: </h2>
                            <span style={{fontSize: "0.975rem", padding:"12px 0"}}>{staycation.location.address}</span>
                        </div>
                        
                        {/* features */}
                        <div style={{display: "flex", flexDirection: "column", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0 0'}}>
                            <h2 style={{fontSize: "1.1075rem", marginTop: "0", marginBottom:"16px"}}>Tiện nghi</h2>
                            {staycation.features.map((feature, index) => (
                                <div key={index} 
                                    style={{fontSize: "0.975rem", padding:"12px 0", borderBottom: '1px solid rgba(0,0,0,0.04)', display: "flex", justifyContent: "space-between", alignItems: "center"}}> 
                                    <span>{feature}</span>
                                    <span>{featureIconMap[feature] || "❓"}</span>
                                </div>
                                ))}
                        </div>

                        <Contacts staycation={staycation} />
                    
                    </div>

                </div>


            </div>

        </div>
        
    );


}



