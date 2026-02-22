/* eslint-disable no-unused-vars */
import styles from "../map.module.css";
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authContext";


export default function MyStaycationButton() {

    const { user } = useAuth()
    const navigate = useNavigate();

    const linkTo = user ? `/host/${user.id}` : "/auth/login"

    return (

        <motion.button className={styles.cta_button}
            onClick={() => navigate(linkTo)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        >
            <h2 style={{ margin: 0 }}>Staycation của tôi</h2>
        </motion.button>

        //bascially if there is no user, we would ask them to login - if there is a user, we would navigate them to their CRUD staycation page

    )
}