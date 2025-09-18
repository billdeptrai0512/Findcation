// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SearchBar from './search-bar';
import AddressMap from "./addressMap";
import styles from "./location.module.css";
import People from "../../assets/people.png";

export default function SearchAddress({location}) {

    return (
        <motion.div className={styles.pageContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >

            <h1 style={{ marginBottom: "4px", fontSize: "1.68rem" }}>Staycation của bạn địa chỉ ở đâu?</h1>
    
            <div className={styles.search_address}>
    
                <AddressMap location={location} icon={People}/>
        
                <SearchBar /> 

            </div>
    
        </motion.div>
    )
}
