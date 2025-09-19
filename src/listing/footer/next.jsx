// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "../listing.module.css"

export default function NextButton({ goNext, page, steps, stepValidity }) {

  return (
    <motion.button onClick={goNext} className={styles.next_button} 
        style={{ backgroundColor: stepValidity[steps[page]] ? "#000" : "#DDDDDD", 
            cursor: stepValidity[steps[page]] ? "pointer" : "not-allowed"}}
        disabled={!stepValidity[steps[page]]}
        whileHover={{scale: 1.05}}        
        whileTap={{scale: 0.95}}>
            Tiếp theo
    </motion.button>
  );
}

