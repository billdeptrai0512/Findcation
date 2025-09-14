
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import styles from "../map.module.css";
import Contacts from "./contacts";
import Images from "./images";
import Details from "./details";

export default function Preview({ staycation }) {

    const navigate = useNavigate()

    return (
        <div className={styles.preview_container}>

            <div className={styles.preview_card} onClick={(e) => e.stopPropagation()}>

                <div className={styles.preview_header}>

                    <button onClick={() => navigate("/")}>
                        <X size={20}/>
                    </button>

                    <h1>{staycation.name}</h1> 

                </div>

                <div >

                    <Images listing={staycation} />

                    <Details staycation={staycation} />
                    
                </div>
            </div>

        </div>
        
    );


}


