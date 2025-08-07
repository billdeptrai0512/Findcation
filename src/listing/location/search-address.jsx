import SearchBar from './search-bar';
import AddressMap from "./addressMap";
import styles from "./location.module.css";

export default function SearchAddress({location, setLocation}) {

    return (
        <div className={styles.pageContent}>

            <h1 style={{ marginBottom: "4px", paddingBottom: "24px" }}>Chổ ở của bạn nằm ở đâu?</h1>
    
            <div className={styles.search_address}>
    
                <AddressMap location={location} />
        
                <SearchBar setLocation={setLocation}/>

            </div>
    
        </div>
    )
}
