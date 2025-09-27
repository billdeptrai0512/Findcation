import { useNavigate, useParams } from "react-router-dom";
import { useHost } from "../hostContext";
import { Image } from "lucide-react";
import styles from "../host.module.css"

export default function EditorRooms() {

    const navigate = useNavigate();
    const { host } = useHost()
    const { staycationId } = useParams();
    
    const staycation = host?.staycations.find(
        (s) => s.id === parseInt(staycationId, 10)
    );

    return (

        <div className={styles.pageContent} style={{justifyContent: "unset"}}>

            <div onClick={() => navigate("cover-images")}
                
                style={{display:"flex", justifyContent:"center", boxSizing: "border-box", boxShadow: "0 3px 10px rgba(0,0,0,0.6)", 
                width: "100%", minWidth: "300px", maxWidth: "400px", padding: "8px", margin: "0 auto", borderRadius: "8px"}}>

                <div  style={{cursor: "pointer", width: "100%",  borderRadius: "8px", overflow: "hidden"}}>
                    
                    <img src={`${import.meta.env.VITE_BACKEND_URL}${staycation.images?.[0]}`} alt="cover_photo"
                        style={{width: "100%", height:"auto", borderRadius:"8px",
                            objectFit: 'cover', objectPosition: "center"}} 
                    />

                    <div  style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "0 8px 8px 8px"}} >
                        <h2 style={{ marginTop: "0", fontSize: "1.1rem" }}>
                            Ảnh đại diện
                        </h2>
                        <div style={{ color: "#555" }}>
                            {staycation.images.length} ảnh
                        </div>
                    </div>
                    
                    
                </div>                

            </div>

        {/* then we have room images */}
        {staycation.numberOfRoom > 0 && 

            staycation.rooms.map((room) => (
                <div key={room.id} onClick={() => navigate(`${room.id}`)} 
                    style={{display:"flex", flexDirection: "column", justifyContent:"center", boxSizing: "border-box", 
                    boxShadow: "0 3px 10px rgba(0,0,0,0.6)", width: "100%", minWidth: "300px", maxWidth: "400px", padding: "8px", margin: "0 auto", borderRadius: "8px"}}>

                    
                    {room.images.length > 0 ? (

                        <img src={`${import.meta.env.VITE_BACKEND_URL}${room.images?.[0]}`} alt="cover_photo"
                            style={{ width: "100%", height: "auto",
                                borderTopLeftRadius: "8px", borderTopRightRadius: "8px",
                                objectFit: "cover", objectPosition: "center",
                            }}
                        />

                    ) : (

                        <div className={styles.empty}>
                            <label style={{ display: "block", width: "100%", height: "auto", cursor: "pointer" }}>
                                <div >
                                    <Image size={35} />
                                </div>
                            </label>
                        </div>

                    )}


                    <div  style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "0 8px 8px 8px"}} >
                        <h2 style={{ marginTop: "0", fontSize: "1.1rem" }}>
                            {room.name}
                        </h2>
                        <div style={{ color: "#555" }}>
                            {room.images.length > 0 ? room.images.length : "Thêm"} ảnh
                        </div>
                    </div>
                </div>
            ))
            
        }


        </div>

    );
}
