import { useListing } from "../listingContext";
import { useMediaQuery } from "react-responsive";
import styles from "./location.module.css";
import AddressMap from "./addressMap";
import Home from "../../assets/home.png";
import PublicToggle from "./publicToggle";
import ConfirmMap from "./gpsMap";

export default function ConfirmAddress() {

    const { listing , editLocationDetails } = useListing()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

    const handleChange = (e) => {
        const { name, value } = e.target;
        editLocationDetails( name , value)
    }

    return (
        <div className={styles.pageContent} style={{padding:"0px 4px", minWidth: isMobile ? "unset" : "630px", height: "100%"}}>

            <h1 style={{ marginBottom: "4px", paddingBottom: "16px", fontSize: "1.68rem", paddingLeft:"unset" }}>Xác nhận địa chỉ của bạn</h1>
                
            <div style={{minHeight: "420px"}}>
                
                <div className={styles.address_details}>
                    <input type="text" name="street" placeholder="Địa chỉ" value={listing.location.details.street} onChange={(e) => handleChange(e)}/>
                    <input type="text" name="ward" placeholder="Phường" value={listing.location.details.ward} onChange={(e) => handleChange(e)}/>
                    <input type="text" name="city" placeholder="Thành phố" value={listing.location.details.city} onChange={(e) => handleChange(e)}/>
                    <input type="text" name="building" placeholder="Tên tòa nhà, căn hộ (nếu có)"  value={listing.location.details.building} onChange={(e) => handleChange(e)}/>
                </div>
                
                <div className={styles.details_map}>
                    <h2 style={{ margin: "0", marginBottom: "4px", paddingBottom: "12px", paddingLeft:"unset", fontWeight: "600", }}>Ghim đúng vị trí chưa?</h2>
                    <ConfirmMap icon={Home}/>
                </div>
    
            </div>

        </div>
    )
}
