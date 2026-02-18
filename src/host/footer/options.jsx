// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./footer.module.css"

export default function OptionsButton({ setOpenOptions }) {

  return (
    <motion.button onClick={() => setOpenOptions(true)}
      className={styles.information_button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      Thông tin liên hệ
    </motion.button>
  );
}

