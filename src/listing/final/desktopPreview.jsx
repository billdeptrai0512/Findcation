import { useListing } from "../listingContext";
import { featureIconMap  } from "../../assets/featureIcons";
import { X } from "lucide-react";
import styles from "../listing.module.css";
import Contacts from "./contacts";
import Images from "./images";

export default function DesktopReview({ setRenderPreview }) {

    const { listing } = useListing()

    const houseType = listing.type === "house" ? "Cho thuê toàn bộ căn nhà" : "Cho thuê phòng trong căn nhà"

    return (
        <div className={styles.preview_container}>
            <div className={styles.preview_card}>

                <div className={styles.preview_header}>

                    <button onClick={() => setRenderPreview(false)}>
                        <X  size={30}/>
                    </button>

                    <h1>{listing.name}</h1> 

                </div>

                {/* preview_information_desktop */}

                <div style={{display: "flex", maxHeight:"60vh", overflowY: "hidden", justifyContent: "space-around", margin: "0 0 0 3rem"}}>
                        
                    <Images listing={listing} />

                    <div className={styles.preview_details} style={{display: "flex", flexDirection: "column", margin: "2em", overflowY: "scroll"}}>          
                        
                        {/* type of hose */}
                        <div style={{display: "flex", flexDirection: "column", gap: "4px", borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '16px'}}> 
                            <h2 style={{fontSize: "1.1075rem", overflow: "hidden", marginTop: "0"}}>{houseType}</h2>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "4px", padding: '16px 0'}}>
                            <h2 style={{fontSize: "1.1075rem", marginTop: "0",}}>Địa chỉ: </h2>
                            <span style={{fontSize: "0.975rem", padding:"12px 0"}}>{listing.location.address}</span>
                        </div>
                        
                        {/* features */}
                        <div style={{display: "flex", flexDirection: "column", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0 0'}}>
                            <h2 style={{fontSize: "1.1075rem", marginTop: "0"}}>Tiện nghi:</h2>
                            {listing.features.map((feature, index) => (
                                <div key={index} 
                                    style={{fontSize: "0.975rem", padding:"12px 0", borderBottom: '1px solid rgba(0,0,0,0.04)', display: "flex", justifyContent: "space-between", alignItems: "center"}}> 
                                    <span>{feature}</span>
                                    <span>{featureIconMap[feature] || "❓"}</span>
                                </div>
                                ))}
                        </div>

                        <Contacts staycation={listing} />
                        
                    
                    </div>

                </div>


            </div>

        </div>
        
    );


}


