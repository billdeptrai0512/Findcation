// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./listing.module.css"


export default function Header({ page }) {

    const navigate = useNavigate()
    const { hostId } = useParams()

    return (
        <div className={styles.header}>

            <motion.button onClick={() => page === 0 ? navigate(`/host/${hostId}`) : navigate(-1)} className={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }} >
                {page === -1 ? "Thoát" : "Quay lại"}
            </motion.button>

        </div>
    )
}

