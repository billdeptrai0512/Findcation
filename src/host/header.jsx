// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"
import styles from "./host.module.css"


export default function Header({host}) {

    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 450px)'})

    return (
        <div className={styles.header} style={{justifyContent: isMobile ? "center" : "space-between"}}>

            {!isMobile && (
                <div className={styles.title} >
                    <motion.h1 onClick={() => navigate('/')}  
                        whileHover={{scale: 1.05}}        
                        whileTap={{scale: 0.95}} > 
                            Findcation 
                    </motion.h1>
                </div>
            )}

            <div className={styles.button}  >
                
                {host.email}
               
            </div>

        </div>   
    )
}

