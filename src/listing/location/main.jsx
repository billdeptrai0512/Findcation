import { useState, useEffect } from "react";
import RegisterMap from "./addressMap";
import styles from "../listing.module.css";
import axios from "axios";
import SearchBar from './search';
import AutoComplete from "./autoComplete";
import AddressMap from "./addressMap";
import AddressDetailPage from "./addressDetails";
 // Replace with your actual key

export default function LocationListing() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState([15.0285, 105.8542]);
  const [predictions, setPredictions] = useState([]);

  // Fetch address suggestions using Google Places Text Search API
  useEffect(() => {

    const delayDebounce = setTimeout(async () => {

      if (address.length < 5) return setPredictions([]);
  
      try {

        const res = await axios.get(`https://rsapi.goong.io/v2/place/autocomplete?input=${address}&api_key=${import.meta.env.VITE_GOONG_API_KEY}&has_deprecated_administrative_unit=true`);
        const data = res.data;
        const predictions = data.predictions || [];


        console.log(predictions)

        if (res.data.status === "OK" && predictions.length > 0) return setPredictions(predictions);

      } catch (error) {
        console.error("Get autocomplete from Goong failed:", error);
        setPredictions([]);
      }

    }, 400);
  
    return () => clearTimeout(delayDebounce);
  }, [address]);

  //without address
  //have address - confirm details information 
  //adjust the location on the map to get final gps store to database

    return (
      <AddressDetailPage
        address={address}
        setAddress={setAddress}
        location={location}
        setLocation={setLocation}
        predictions={predictions}
        setPredictions={setPredictions}
      />
    );
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
    return (

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
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
            </div>
        
            <div style={{ height: "25vh", borderRadius: "8px", marginTop: "16px"}}>
                <AddressMap location={location} setLocation={setLocation} address={address} setAddress={setAddress} />
            </div>
            
  
        </div>
  
      </div>
    )
}
