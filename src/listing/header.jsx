import { useNavigate } from "react-router-dom"
import styles from "./listing.module.css"


export default function Header({setOpenSuggestions}) {

    const navigate = useNavigate()

    return (
        <div className={styles.header}>

            <button onClick={() => navigate('/')} className={styles.button} > 
                Thoát 
            </button>

            <div style={{display: "flex", justifyContent: 'flex-end'}} >
                <button className={styles.button} onClick={() => setOpenSuggestions(true)} >
                    Góp ý
                </button>
            </div>

        </div>   
    )
}

