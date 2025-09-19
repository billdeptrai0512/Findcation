// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "../listing.module.css"

export default function StartButton({ getStart }) {

  return (
    <motion.button onClick={getStart} 
        className={styles.startButton}
        whileHover={{scale: 1.05}}        
        whileTap={{scale: 0.95}} >
        Bắt đầu
    </motion.button>
  );
}

