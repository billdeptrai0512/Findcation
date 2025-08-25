
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { featureIconMap  } from "../../assets/featureIcons";
import styles from "../map.module.css";
import Contacts from "./contacts";

export default function DesktopPreview({ staycation }) {

    const navigate = useNavigate()

    const houseType = staycation.type === "house" ? "Toàn bộ ngôi nhà" : "Phòng trong căn nhà"

    return (
        <div className={styles.preview_container}>

            <div className={styles.preview_card}>

                <div className={styles.preview_header}>

                    <button onClick={() => navigate("/")}>
                        <ChevronLeft  size={30}/>
                    </button>

                    <h1>Bản xem trước đầy đủ</h1> 

                </div>

                <div style={{display: "flex", maxHeight:"60vh", overflowY: "hidden", justifyContent: "space-around"}}>
                        
                    <div className={styles.preview_image} >
                        <img src={`${import.meta.env.VITE_BACKEND_URL}${staycation.images[0]}`} alt="cover_photo"  style={{width: "100%", borderRadius:"8px"}} />
                        <Contacts staycation={staycation} />
                    </div>

                    <div className={styles.preview_details} style={{display: "flex", flexDirection: "column", margin: "2em", overflowY: "scroll"}}>
                        
                        <h1 style={{marginTop: "0"}}>{staycation.name}</h1>
                        
                        {/* type of hose */}
                        <div style={{display: "flex", flexDirection: "column", gap: "4px", borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}> 
                            <h2 style={{fontSize: "1.1075rem", overflow: "hidden", marginTop: "0"}}>{houseType}</h2>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "4px", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}>
                            <h2 style={{fontSize: "1.1075rem", marginTop: "0", marginBottom:"16px"}}>{staycation.location.address}</h2>
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
                    
                    </div>

                </div>


            </div>

        </div>
        
    );


}


