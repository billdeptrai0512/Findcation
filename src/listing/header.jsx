// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import styles from "./listing.module.css"


export default function Header({setOpenSuggestions}) {

    const navigate = useNavigate()

    return (
        <div className={styles.header}>

            <motion.button onClick={() => navigate('/')} className={styles.button} 
                whileHover={{scale: 1.05}}        
                whileTap={{scale: 0.95}} > 
                    Thoát 
            </motion.button>

            <div style={{display: "flex", justifyContent: 'flex-end'}} >
                <motion.button className={styles.button} onClick={() => setOpenSuggestions(true)}
                    whileHover={{scale: 1.05}}        
                    whileTap={{scale: 0.95}} >
                        Góp ý
                </motion.button>
            </div>

        </div>   
    )
}

