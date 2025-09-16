/* eslint-disable no-unused-vars */
import styles from "./map.module.css";
import Header from "./header";
import NearByButton from "./nearby";
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../auth/authContext";


export default function LandingPage() {

  const { user } = useAuth()
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 714px)'})
  
  return (
    <motion.div className={styles.main_container} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
      >
        <Header /> 
        {
          isMobile ? (
            <div className={styles.footer}>
              <div className={styles.cta_div}>
                  <NearByButton />
                  <motion.button className={styles.cta_button} onClick={() => navigate("/auth/login")}
                      whileHover={{scale: 1.05}}        
                      whileTap={{scale: 0.95}} 
                    >
                      <h2 style={{margin: 0}}>Staycation của tôi</h2>
                  </motion.button>
              </div>
            </div>

          ) : (

            <>
              <div className={styles.left_footer}>
                <div className={styles.cta_div}>
                    <NearByButton />
                </div>
              </div>
              <div className={styles.right_footer}>
                <div className={styles.cta_div}>
                    <motion.button className={styles.cta_button} onClick={() => navigate("/auth/login")}
                        whileHover={{scale: 1.05}}        
                        whileTap={{scale: 0.95}} 
                      >
                        <h2 style={{margin: 0}}>Staycation của tôi </h2>
                    </motion.button>
                </div>
              </div>
            </>

            // if user -> we re direct them to CRUD staycation overall --> emails | staycations | contact information | 

          )
        }
 
    </motion.div>
  );
}