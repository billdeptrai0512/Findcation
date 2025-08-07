import { useState } from "react";
import styles from "./location.module.css";
import AddressMap from "./addressMap";
 // Replace with your actual key

export default function ConfirmAddress({ location, setLocation }) {

    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        setLocation(prev => ({
            ...prev,
            public: !isToggled
        }))
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocation(prev => ({
            ...prev,
            details: {
                ...prev.details,
                [name]: value
            }
        }));
    }

    return (
        <div className={styles.pageContent}>

            <h1 style={{ marginBottom: "4px", paddingBottom: "24px" }}>Xác nhận địa chỉ của bạn</h1>
                
            <div>
                
                <div className={styles.address_details}>
                    <input type="text" name="apartment" placeholder="Căn hộ, tầng, v.v (nếu có)" value={location.details.apartment} onChange={(e) => handleChange(e)} />
                    <input type="text" name="building" placeholder="Tên tòa nhà (nếu có)"  value={location.details.building} onChange={(e) => handleChange(e)}/>
                    <input type="text" name="street" placeholder="Địa chỉ" value={location.details.street} onChange={(e) => handleChange(e)}/>
                    <input type="text" name="ward" placeholder="Phường" value={location.details.ward} onChange={(e) => handleChange(e)}/>
                    <input type="text" name="city" placeholder="Thành phố" value={location.details.city} onChange={(e) => handleChange(e)}/>
                </div>
                
                <div className={styles.public_options}>
                    <div >
                        <h4 style={{marginBottom: 0}}>Công khai địa chỉ của home</h4>
                        <p>Mặc định, bọn mình chỉ hiển thị vị trí của home trên bản đồ.</p>
                    </div>
                    <label className={styles.toggle}>
                        <input type="checkbox" checked={isToggled} onChange={handleToggle}/>
                        <span className="slider"> </span>
                    </label>
                </div>
                
                <div className={styles.details_map}>
                    <AddressMap location={location} setLocation={setLocation}/>
                </div>
    
            </div>

        </div>
    )
}
