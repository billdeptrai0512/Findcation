import { useListing } from "../listingContext";
import styles from "./location.module.css";
import AddressMap from "./addressMap";
import Home from "../../assets/home.png";
import PublicToggle from "./publicToggle";

export default function ConfirmAddress() {

    const { listing , editLocationDetails } = useListing()

    const handleChange = (e) => {
        const { name, value } = e.target;
        editLocationDetails( name , value)
    }

    return (
        <div className={styles.pageContent}>

            <h1 style={{ marginBottom: "4px", paddingBottom: "24px", fontSize: "1.68rem" }}>Xác nhận địa chỉ của bạn</h1>
                
            <div>
                
                <div className={styles.address_details}>
                    <input type="text" name="apartment" placeholder="Căn hộ, tầng, v.v (nếu có)" value={listing.location.details.apartment} onChange={(e) => handleChange(e)} />
                    <input type="text" name="building" placeholder="Tên tòa nhà (nếu có)"  value={listing.location.details.building} onChange={(e) => handleChange(e)}/>
                    <input type="text" name="street" placeholder="Địa chỉ" value={listing.location.details.street} onChange={(e) => handleChange(e)}/>
                    <input type="text" name="ward" placeholder="Phường" value={listing.location.details.ward} onChange={(e) => handleChange(e)}/>
                    <input type="text" name="city" placeholder="Thành phố" value={listing.location.details.city} onChange={(e) => handleChange(e)}/>
                </div>

                <PublicToggle />
                
                <div className={styles.details_map}>
                    <AddressMap icon={Home}/>
                </div>
    
            </div>

        </div>
    )
}
