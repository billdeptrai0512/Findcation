
import { MapPin } from "lucide-react";
import styles from './location.module.css'; 

export default function SearchBar({setAddress, address}) {

  return (

     <div className={styles.searchBar}>
        <MapPin size={30} color="#222222" style={{ marginRight: "8px", marginLeft: "8px" }} />
        <input type="text" placeholder="Nhập địa chỉ của bạn"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
  );
}




