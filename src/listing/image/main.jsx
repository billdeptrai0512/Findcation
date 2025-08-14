import { useListing } from "../listingContext";
import styles from "./image.module.css"
import Camera from "../../assets/camera.png"
import Area from "./area";

export default function ImageUpload() {

    const {listing, uploadImages} = useListing()

    if (listing.images.length === 0) return (
        
        <div className={styles.pageContent}>
            <h1 style={{marginBottom: "4px"}}>Bổ sung ảnh chụp chổ ở căn hộ của bạn</h1>
            <div className={styles.intrustion} style={{paddingBottom: "8px", color: "#6A6A6A"}}>
                Về sau, bạn vẫn có thể đăng thêm hoặc thay đổi ảnh.
            </div>

            <div className={styles.upload_area}>
                <div>
                    <img src={Camera} alt="" style={{height:"168px"}} />
                </div>
                <label>
                    <input type="file" name="image" multiple style={{ display: "none" }} onChange={(e) => uploadImages(e.target.files)}/>
                    Thêm ảnh
                </label>
            </div>
        </div>
    )

    return <Area />
}
