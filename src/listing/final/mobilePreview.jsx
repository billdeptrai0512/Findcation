import { Link } from "react-router-dom";
import { useListing } from "../listingContext";
import { Facebook, Instagram, X } from "lucide-react";
import { featureIconMap  } from "../../assets/featureIcons";
import FacebookIcon from "../../assets/facebook.png";
import InstagramIcon from "../../assets/instagram.png";
import Zalo from "../../assets/zalo.png";
import styles from "../listing.module.css";
import Contacts from "./contacts";

export default function MobilePreview({ setRenderPreview }) {

    const { listing } = useListing()

    const houseType = listing.type === "house" ? "Thuê toàn bộ căn nhà" : "Thuê phòng trong căn nhà"

    return (
        <div className={styles.preview_container}>
            <div className={styles.preview_card}>

                <div className={styles.preview_header}>

                    <button onClick={() => setRenderPreview(false)}>
                        <X  size={20}/>
                    </button>

                    <h1>{listing.name}</h1> 

                </div>

                {/* preview_information_desktop */}

                <div className={styles.preview_details} style={{display: "flex", flexDirection:"column" , maxHeight:"60vh", overflowY: "scroll", padding: "0 1em", margin: "0 auto"}}>
                        
                    <div style={{display: "flex", alignItems:"center", margin: "8px auto", maxWidth:"300px"}}>
                        <img src={listing.images[0]?.url} alt="cover_photo"  style={{width: "100%", borderRadius:"8px"}} />
                    </div>

                    <div className={styles.preview_details} style={{display: "flex", justifyContent: "space-between", flexDirection: "column",  maxWidth: "300px", margin: "0 auto"}}>
                        
                        {/* type of hose */}
                        <div style={{display: "flex", flexDirection: "column", gap: "4px", borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}> 
                            <h2 style={{fontSize: "1.1075rem", overflow: "hidden", marginTop: "0"}}>{houseType}</h2>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "4px", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}>
                            <h2 style={{fontSize: "1.1075rem", marginTop: "0"}}>{listing.location.address}</h2>
                        </div>
                        
                        {/* features */}
                        <div style={{display: "flex", flexDirection: "column", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0 0'}}>
                            <h2 style={{fontSize: "1.1075rem", marginTop: "0", marginBottom:"16px"}}>Tiện nghi</h2>
                            {listing.features.map((feature, index) => (
                                <div key={index} 
                                    style={{fontSize: "0.975rem", padding:"12px 0", borderBottom: '1px solid rgba(0,0,0,0.04)', display: "flex", justifyContent: "space-between", alignItems: "center"}}> 
                                    <span>{feature}</span>
                                    <span>{featureIconMap[feature] || "❓"}</span>
                                </div>
                                ))}

                        </div>

                        {/* vị trí */}

                        <Contacts staycation={listing} />

                    
                    </div>

                </div>


            </div>

        </div>
        
    );


}


