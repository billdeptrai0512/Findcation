


import { motion } from "framer-motion";
import styles from "../listing.module.css"

export default function StartButton({ setOpenSuggestions }) {

    return (

        <motion.button className={styles.button} onClick={() => setOpenSuggestions(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }} >
            Góp ý
        </motion.button>

    );
}