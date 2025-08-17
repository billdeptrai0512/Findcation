import { useNavigate } from "react-router-dom"
import styles from "./listing.module.css"


export default function Header({setOpenSuggestions}) {

    const navigate = useNavigate()

    return (
        <div className={styles.header}>

            <button onClick={() => navigate('/')} className={styles.button} > 
                Thoát 
            </button>

            {/* when navigate to suggestion it should include the stage where user are in */}
            <button onClick={() => setOpenSuggestions(true)} className={styles.button} >
                Bạn có góp ý ?
            </button>

        </div>   
    )
}