import SearchBar from './search-bar';
import AddressMap from "./addressMap";
import styles from "./location.module.css";
import People from "../../assets/people.png";

export default function SearchAddress({location}) {

    return (
        <div className={styles.pageContent}>

            <h1 style={{ marginBottom: "4px", paddingBottom: "24px" }}>Chổ ở của bạn nằm ở đâu?</h1>
    
            <div className={styles.search_address}>
    
                <AddressMap location={location} icon={People}/>
        
                <SearchBar /> 

            </div>
    
        </div>
    )
}
