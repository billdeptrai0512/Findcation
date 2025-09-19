/* eslint-disable no-unused-vars */
import { motion } from "motion/react"
import styles from "./map.module.css";
import Header from "./header";
import Footer from "./footer/main";


export default function LandingPage() {

  return (
    <motion.div className={styles.main_container} 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0, ease: "easeOut" }}>

      <Header /> 
      <Footer />
 
    </motion.div>
  );
}