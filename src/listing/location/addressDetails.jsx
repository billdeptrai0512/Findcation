import { useState, useEffect } from "react";
import RegisterMap from "./addressMap";
import styles from "../listing.module.css";
import axios from "axios";
import SearchBar from './search';
import AutoComplete from "./autoComplete";
import AddressMap from "./addressMap";
 // Replace with your actual key

export default function AddressDetailPage({ address, setAddress, location, setLocation, predictions, setPredictions }) {

    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (

        <>
            <style>
                {`
                .slider::before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: 0.4s;
                    border-radius: 50%;
                }

                input:checked + .slider::before {
                    transform: translateX(18px);
                }
                `}
            </style>

            <div className={styles.pageContent}>

            <h1 style={{ marginBottom: "4px", paddingBottom: "24px" }}>Xác nhận địa chỉ của bạn</h1>
            
            {/* <div className={styles.intrustion} style={{ paddingBottom: "24px", color: "#6A6A6A" }}>
                Địa chỉ của bạn sẽ không hiển thị công khai trên bản đồ Findcation.
            </div> */}
    
            <div style={{ position: "relative", width: "100%", maxWidth: "720px", margin: "0px auto" }}>

                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <input type="text" placeholder="Căn hộ, tầng, v.v (nếu có)" style={{ borderRadius: "4px", padding: "16px", fontSize: "16px", fontWeight: "600", border: "none", boxShadow: "0 0 0 1px #ccc" }} />
                    <input type="text" placeholder="Tên tòa nhà (nếu có)" style={{ borderRadius: "4px", padding: "16px", fontSize: "16px", fontWeight: "600",border: "none", boxShadow: "0 0 0 1px #ccc" }}/>
                    <input type="text" placeholder="Địa chỉ" style={{ borderRadius: "4px", padding: "16px", fontSize: "16px", fontWeight: "600", border: "none", boxShadow: "0 0 0 1px #ccc" }}/>
                    <input type="text" placeholder="Phường" style={{ borderRadius: "4px", padding: "16px", fontSize: "16px", fontWeight: "600", border: "none", boxShadow: "0 0 0 1px #ccc" }}/>
                    <input type="text" placeholder="Thành phố" style={{ borderRadius: "4px", padding: "16px", fontSize: "16px", fontWeight: "600", border: "none", boxShadow: "0 0 0 1px #ccc" }} />
                </div>
                <div>
                    <div>
                        <h4 style={{marginBottom: 0}}>Công khai địa chỉ của bạn</h4>
                        <p>Bọn mình chỉ chia sẻ vị trí của home trên bản đồ, mặc định không công khai địa chỉ</p>
                    </div>
                    <label
                        style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '42px',
                        height: '24px',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={isToggled}
                            onChange={handleToggle}
                            style={{
                                opacity: 0,
                                width: 0,
                                height: 0,
                            }}
                            />
                        <span
                            className="slider"
                            style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: isToggled ? '#5f5f5f' : '#ccc',
                                borderRadius: '24px',
                                transition: '0.4s',
                            }}
                        >
                            
                        </span>
                    </label>
                </div>
            
                <div style={{ height: "25vh", borderRadius: "8px", marginTop: "16px"}}>
                    <AddressMap location={location} setLocation={setLocation} address={address} setAddress={setAddress} />
                </div>
                
    
            </div>
    
        </div>
        
        </>

        
    )
}

const renderGetAddressPage = ({address , setAddress, location, setLocation, predictions, setPredictions}) => {
    return (

        <div className={styles.pageContent}>

        <h1 style={{ marginBottom: "4px", paddingBottom: "24px" }}>Chổ ở của bạn nằm ở đâu?</h1>
  
        <div style={{ position: "relative", width: "100%", maxWidth: "720px", margin: "0px auto" }}>
  
          <AddressMap location={location} setLocation={setLocation} address={address} setAddress={setAddress} />
  
          <SearchBar address={address} setAddress={setAddress} />
  
          <AutoComplete predictions={predictions} setPredictions={setPredictions} setLocation={setLocation} />
  
        </div>
  
      </div>
    )
}

const renderGetDetailsPage = ({address , setAddress, location, setLocation, predictions, setPredictions}) => {

}
