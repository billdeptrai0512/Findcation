import { useParams, useNavigate } from "react-router-dom";
import { useHost } from "./hostContext";
import styles from "./host.module.css"
import DeleteButton from "./delete";

export default function Staycation() {

    const navigate = useNavigate();
    const { host } = useHost()
    const { staycationId } = useParams();

    const staycation = host?.staycations.find(
        (s) => s.id === parseInt(staycationId, 10)
    );

    const totalImage = () => {
        if (!staycation) return 0;

        const defaultImages = Array.isArray(staycation.images) ? staycation.images.length : 0;

        const roomImages = Array.isArray(staycation.rooms)
                ? staycation.rooms.reduce((total, room) => {
                        const count = Array.isArray(room.images) ? room.images.length : 0;
                        return total + count;
                    }, 0)
                : 0;

        return defaultImages + roomImages;
    }
    
    return (
        
        <div className={styles.pageContent} > 


            <h1 style={{ margin: "0", fontSize: "1.68em"}}>Staycation của tôi</h1>
            
            <div onClick={() => navigate(`title`)}
                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)", padding: "8px",  borderRadius: "8px", cursor: "pointer"}}>

                <span style={{fontSize: "1rem", fontWeight: "500"}}>Tiêu đề</span> 
                <div style={{color: "#6A6A6A", fontWeight: "500"}} >{staycation.name}</div>
                    
            </div>

            <div onClick={() => navigate(`type`)} 
                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)",  padding: "8px", borderRadius: "8px", cursor: "pointer"}}>

                <span style={{fontSize: "1rem", fontWeight: "500"}}>Cho thuê</span>

                <div style={{color: "#6A6A6A", fontWeight: "500"}}>{staycation.type === "room" ? `${staycation.numberOfRoom} phòng riêng` : `Toàn bộ căn nhà` } </div>

            </div>

            <div onClick={() => navigate(`images`)}
                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)",  padding: "8px", borderRadius: "8px", cursor: "pointer"}}>
        
                <span style={{fontSize: "1rem", fontWeight: "500", paddingBottom: "4px"}}>Hình ảnh</span> 
                <div  style={{cursor: "pointer", width: "100%",  borderRadius: "8px", overflow: "hidden"}}>
                    {staycation.images && <div style={{color: "#6A6A6A", fontWeight: "500"}} >Đang có {totalImage()} hình</div>}
                </div>     
                
            </div>

            <div onClick={() => navigate(`prices`)} 
                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)",  padding: "8px", borderRadius: "8px", cursor: "pointer"}}>

                <span style={{fontSize: "1rem", fontWeight: "500"}}>Bảng giá</span>

                <div style={{display: "flex", gap: "16px", color: "#6A6A6A", fontWeight: "500"}}>

                    <span>{formatPrice(staycation.prices.min)}</span>
                    <span> ~ </span>
                    <span>{formatPrice(staycation.prices.max)}</span>
                    
                </div>

            </div>

            <div onClick={() => navigate(`location`)}
            
                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)",  padding: "8px", borderRadius: "8px", cursor: "pointer"}}>
                <span style={{fontSize: "1rem", fontWeight: "500"}}>Vị trí</span>
                <div style={{display: "flex", gap: "16px", color: "#6A6A6A", fontWeight: "500"}}>
                    {`${staycation.location.details.street}, ${staycation.location.details.ward}, ${staycation.location.details.city}`}
                    {/* 99 Dạ Nam, Chánh Hưng, Hồ Chí Minh */}
                </div>

            </div>

            <div onClick={() => navigate(`features`)}
            
                style={{boxShadow: "0 3px 10px rgba(0,0,0,0.6)",  padding: "8px", borderRadius: "8px", cursor: "pointer"}}>
                <span style={{fontSize: "1rem", fontWeight: "500"}}>Tiện nghi</span>
                <div style={{display: "flex", gap: "16px", color: "#6A6A6A", fontWeight: "500"}}>
                    {staycation.features.length} 
                </div>

            </div>

            {/* <div style={{display: "flex", justifyContent: "end"}}>
                <DeleteButton />
            </div> */}

        </div>

    );
}

const formatPrice = (price) => {
    if (!price) return "";
    return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
};

