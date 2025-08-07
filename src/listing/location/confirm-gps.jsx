import styles from "./location.module.css";
import { MapPin } from "lucide-react";
import GPSMap from './gpsMap';

export default function ConfirmGPS({location, setLocation}) {

    return (
        <div className={styles.pageContent}>

            <h1 style={{ marginBottom: "4px", paddingBottom: "24px" }}>Ghim đã đúng vị trí chưa?</h1>
    
            <div className={styles.search_address}>
    
                <GPSMap location={location} setLocation={setLocation}/>
        
                <div className={styles.searchBar}>
                    <div className={styles.search_input}>
                        <MapPin size={30} color="#222222" style={{ marginRight: "8px", marginLeft: "24px" }} />
                        <input type="text" placeholder="Nhập địa chỉ của bạn" value={location.address} />
                    </div>
                </div>

            </div>
    
        </div>
    )
}
