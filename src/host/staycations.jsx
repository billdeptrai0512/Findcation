import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./host.module.css"

export default function Staycations() {

    const { staycations } = useOutletContext()

    const navigate = useNavigate();

    return (

        <div className={styles.pageContent}>
                    {/* Main Content */}
            <div>

                <h2>Staycation của bạn</h2>

                <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px"}}>
            
                    {staycations.map((staycation) => (
                        
                        
                        <div key={staycation.id}  
                            style={{ cursor: "pointer", maxWidth: "286px", 
                            border: "1px solid #ddd", 
                            borderRadius: "8px",  overflow: "hidden", flex: "0 0 auto" }}
                            onClick={() => navigate(`editor/${staycation.id}`, { state: {staycation} })} 
                        >
                            <div>
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}${staycation.images?.[0]}`}
                                    alt="cover_photo"
                                    style={{ width: "100%", height: "auto",
                                        borderTopLeftRadius: "8px", borderTopRightRadius: "8px",
                                        objectFit: "cover", objectPosition: "center",
                                    }}
                                />
                            </div>
                            
                            <div style={{ display: "flex", flexDirection: "column",  gap: "4px", padding: "0 8px 8px 8px", }} >
                                <h2 style={{ marginTop: "0", fontSize: "1.1rem" }}>
                                    {staycation.name}
                                </h2>
                                <div style={{ color: "#555" }}>
                                    {staycation.location?.address || "Địa chỉ không có"}
                                </div>
                            </div>
                            
                        </div>
                    ))}

                </div>
            </div>


            <div>
            {/* contacts is not in staycation but in user profile */}
                <h2 style={{ marginTop: "0" }}>Thông tin liên lạc</h2>

                <div style={{cursor: "pointer"}}>

                    <div style={{display: "flex", flexDirection: "column", gap: "4px", padding: "0 8px 8px 8px"}}>
                        <h2 style={{marginTop: "0"}}>Facebook</h2>
                        {/* <p>{host.staycations[16].contacts.facebook.url}</p> */}
                    </div>

                    <div style={{display: "flex", flexDirection: "column", gap: "4px", padding: "0 8px 8px 8px"}}>
                        <h2 style={{marginTop: "0"}}>Zalo</h2>

                    </div>

                    <div style={{display: "flex", flexDirection: "column", gap: "4px", padding: "0 8px 8px 8px"}}>
                        <h2  style={{marginTop: "0"}} >Instagram</h2>

                    </div>
                </div>
            
            </div>

        </div>


    );
}

