import { useParams, useNavigate } from "react-router-dom";
import { useHost } from "./hostContext";
import styles from "./host.module.css"

export default function Staycation() {

    const navigate = useNavigate();
    const { host } = useHost()
    const { staycationId } = useParams();

    const staycation = host?.staycations.find(
        (s) => s.id === parseInt(staycationId, 10)
    );
    
    return (
        
        <div className={styles.pageContent} > 

            <div onClick={() => navigate(`rooms`)}
                
                style={{display:"flex", justifyContent:"center", boxSizing: "border-box", boxShadow: "0 3px 10px rgba(0,0,0,0.6)", width: "100%", minWidth: "300px", maxWidth: "400px", padding: "8px", margin: "0 auto", borderRadius: "8px"}}>

                <div  style={{cursor: "pointer", width: "100%",  borderRadius: "8px", overflow: "hidden"}}>
                    
                    <img src={`${import.meta.env.VITE_BACKEND_URL}${staycation.images[0]}`} alt="cover_photo"
                        style={{width: "100%", height:"auto", borderRadius:"8px",
                            objectFit: 'cover', objectPosition: "center"}} />
                    
                </div>                

            </div>

            <div onClick={() => navigate(`title`)}

                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)", padding: "8px",  borderRadius: "8px"}}>

                <span style={{fontSize: "1rem", fontWeight: "500"}}>Tiêu đề</span>
                    
                <div style={{color: "#6A6A6A", fontWeight: "500"}} >{staycation.name}</div>
                    
            </div>

            <div onClick={() => navigate(`type`)} 
            
                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)",  padding: "8px", borderRadius: "8px"}}>

                <span style={{fontSize: "1rem", fontWeight: "500"}}>Loại chỗ ở</span>

                <div style={{color: "#6A6A6A", fontWeight: "500"}}>{staycation.type === "room" ? `${staycation.numberOfRoom} phòng riêng` : `Toàn bộ căn nhà` } </div>

            </div>

            <div onClick={() => navigate(`prices`)} 
            
                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)", padding: "8px", borderRadius: "8px"}}>

                <span style={{fontSize: "1rem", fontWeight: "500"}}>Bảng giá</span>

                <div style={{display: "flex", gap: "16px", color: "#6A6A6A", fontWeight: "500"}}>

                    <span>{formatPrice(staycation.prices.min)}</span>
                    <span> ~ </span>
                    <span>{formatPrice(staycation.prices.max)}</span>
                    
                </div>

            </div>

            <div onClick={() => navigate(`location`)}
            
                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)", padding: "8px", borderRadius: "8px"}}>

                <span style={{fontSize: "1rem", fontWeight: "500"}}>Vị trí</span>

                <div style={{display: "flex", gap: "16px", color: "#6A6A6A", fontWeight: "500"}}>

                    {`${staycation.location.details.street}, ${staycation.location.details.ward}, ${staycation.location.details.city}`}
                    
                    {/* 99 Dạ Nam, Chánh Hưng, Hồ Chí Minh */}

                </div>

            </div>

            <div onClick={() => navigate(`features`)}
            
                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)", borderRadius: "8px", padding: "8px"}}>

                <span style={{fontSize: "1rem", fontWeight: "500"}}>Tiện nghi</span>
                <div style={{display: "flex", gap: "16px", color: "#6A6A6A", fontWeight: "500"}}>

                    {staycation.features.join(", ")}

                </div>

            </div>


        </div>

    );
}

const formatPrice = (price) => {
    if (!price) return "";
    return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
};

