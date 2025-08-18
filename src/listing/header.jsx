import { useNavigate } from "react-router-dom"
import styles from "./listing.module.css"


export default function Header() {

    const navigate = useNavigate()

    return (
        <div className={styles.header}>

            <button onClick={() => navigate('/')} className={styles.button} > 
                Thoát 
            </button>

            {/* when navigate to suggestion it should include the stage where user are in */}

        </div>   
    )
}