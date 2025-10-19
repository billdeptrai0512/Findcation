import { useNavigate, useOutletContext } from "react-router-dom";
import { CirclePlus } from 'lucide-react';
import styles from "./host.module.css"
import Contacts from "./contacts/main";

export default function Staycations() {
    const { staycations } = useOutletContext()
    const navigate = useNavigate();
    return (

        <div className={styles.pageContent}>
                    {/* Main Content */}
            <div>

                <div style={{ display: "flex", paddingBottom: "8px", alignItems:"end", justifyContent: "space-between" }}>
                    <h1 style={{ margin: "0", fontSize: "1.68em"}}>Staycation của tôi</h1>
                    <CirclePlus size={28} fill="#E31C5F" color="#FFFFFF" onClick={() => navigate(`/list-staycation`)} style={{ cursor: "pointer"}}/>
                </div>

                <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px"}}>
            
                    {staycations.map((staycation) => (
                        
                        
                        <div key={staycation.id}  
                            style={{ cursor: "pointer", maxWidth: "294px", maxHeight: "400px",
                            border: "1px solid #ddd", 
                            borderRadius: "8px",  overflow: "hidden", flex: "0 0 auto" }}
                            onClick={() => navigate(`editor/${staycation.id}`, { state: {staycation} })} 
                        >
                            <div>
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}${staycation.images?.[0]}`}
                                    alt="cover_photo"
                                    style={{ width: "100%", height: "191px",
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

            <Contacts />

        </div>


    );
}

