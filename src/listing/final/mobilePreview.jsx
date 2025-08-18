import { Link } from "react-router-dom";
import { useListing } from "../listingContext";
import { Facebook, Instagram, X } from "lucide-react";
import { featureIconMap  } from "../../assets/featureIcons";
import Zalo from "../../assets/zalo.png";
import styles from "../listing.module.css";

export default function MobilePreview({ setRenderPreview }) {

    const { listing } = useListing()

    const houseType = listing.type === "house" ? "Toàn bộ ngôi nhà" : "Phòng trong căn nhà"

    return (
        <div className={styles.preview_container}>
            <div className={styles.preview_card}>

                <div className={styles.preview_header}>

                    <button onClick={() => setRenderPreview(false)}>
                        <X  size={20}/>
                    </button>

                    <h1>Bản xem trước đầy đủ</h1> 

                </div>

                {/* preview_information_desktop */}

                <div className={styles.preview_details} style={{display: "flex", flexDirection:"column" , maxHeight:"60vh", overflowY: "scroll", padding: "0 1em"}}>
                        
                    <div style={{display: "flex", alignItems:"center", margin: "8px auto", maxWidth:"400px"}}>
                        <img src={listing.images[0]?.url} alt="cover_photo"  style={{width: "100%", borderRadius:"8px"}} />
                    </div>

                    <div className={styles.preview_details} style={{display: "flex", justifyContent: "space-between", flexDirection: "column", margin: "0 auto"}}>
                        
                        <h1 style={{marginTop: "0"}}>{listing.name}</h1>
                        
                        {/* type of hose */}
                        <div style={{display: "flex", flexDirection: "column", gap: "4px", borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}> 
                            <h2 style={{fontSize: "1.1075rem", overflow: "hidden", marginTop: "0"}}>{houseType}</h2>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "4px", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}>
                            <h2 style={{fontSize: "1.1075rem", marginTop: "0", marginBottom:"16px"}}>{listing.location.address}</h2>
                        </div>
                        
                        {/* features */}
                        <div style={{display: "flex", flexDirection: "column", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0 0'}}>
                            <h2 style={{fontSize: "1.1075rem", marginTop: "0", marginBottom:"16px"}}>Tiện nghi</h2>
                            {listing.features.slice(0, 5).map((feature, index) => (
                                <div key={index} 
                                    style={{fontSize: "0.975rem", padding:"12px 0", borderBottom: '1px solid rgba(0,0,0,0.04)', display: "flex", justifyContent: "space-between", alignItems: "center"}}> 
                                    <span>{feature}</span>
                                    <span>{featureIconMap[feature] || "❓"}</span>
                                </div>
                                ))}

                                {listing.features.length > 5 && (
                                    <div style={{fontSize: "0.9rem", padding:"16px 0", color: "#666"}}>
                                        + {listing.features.length - 5} tiện nghi nữa
                                    </div>
                                )}
                        </div>

                        {/* vị trí */}


                        <div style={{display: "flex", flexDirection: "column", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}>
                            {/* <h2 style={{fontSize: "1.1075rem", marginTop: "0", marginBottom:"16px"}}>Thông tin liên lạc</h2> */}
                            <div style={{display: "flex", justifyContent:"space-evenly" ,padding: '8px 0'}}>
                                <span>
                                    <Link to={`https://www.facebook.com/${listing.contacts.facebook}`} target="_blank" rel="noopener noreferrer">
                                        <Facebook size={35} fill="#222222" stroke="none" />
                                    </Link>
                                </span>
                                <span>
                                    <Link to={`https://www.instagram.com/${listing.contacts.instagram}`} target="_blank" rel="noopener noreferrer">
                                        <Instagram size={35} stroke="#ffffff" fill="#222222" strokeWidth={2} />
                                    </Link>
                                </span>
                                <span>
                                    <Link to={`https://zalo.me/${listing.contacts.zalo}`} target="_blank" rel="noopener noreferrer">
                                        <img src={Zalo} alt="" style={{width:"37px"}} />
                                    </Link>
                                </span>
                            </div>
                        </div>

                    
                    </div>

                </div>


            </div>

        </div>
        
    );


}


