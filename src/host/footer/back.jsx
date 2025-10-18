// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./footer.module.css"

export default function BackButton({goBack}) {

  return (
    <motion.button onClick={goBack} 
        className={styles.back_button}      
        whileTap={{scale: 0.95}} >
            Quay lại
    </motion.button>
  );
}

