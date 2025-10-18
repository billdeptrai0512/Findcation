// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHost } from "../../host/hostContext";
import styles from "../footer/footer.module.css"

export default function BackButton() {
  const navigate = useNavigate();
  const { staycationId } = useParams();
  const { host, updateStaycation } = useHost();
  const staycation = host?.staycations.find(
      (s) => s.id === parseInt(staycationId, 10)
  );

  const originalStaycationRef = useRef(staycation);
  const path = location.pathname.split("/").filter(Boolean);

  const goBacktoMain = () => navigate('/')
  const goBackToHost = () => navigate(`/host/${host.id}`) 
  const goBackToStaycation = () => {
      updateStaycation(staycation.id, originalStaycationRef.current);
      navigate(`/host/${host.id}/editor/${staycationId}`, {state: { staycation }})
  }
  const goBackToStaycationGallery = () => {
      updateStaycation(staycation.id, originalStaycationRef.current);
      navigate(`/host/${host.id}/editor/${staycationId}/rooms`, {state: { staycation }})
  }

  if (path.length === 2) {
    return (
      <motion.button onClick={goBacktoMain} 
          className={styles.next_button}      
          whileTap={{scale: 0.95}} >
              Quay lại
      </motion.button>
    );
  }

  if (path.length === 4) {

    return (
      <motion.button onClick={goBackToHost} 
          className={styles.next_button}      
          whileTap={{scale: 0.95}} >
              Quay lại
      </motion.button>
    );
  }

  if (path.length === 5) {

      if (path[path.length - 1] === "rooms") {

          return (
            <motion.button onClick={goBackToHost} 
                className={styles.next_button}      
                whileTap={{scale: 0.95}} >
                    Quay lại
            </motion.button>
          );
      }

      return (
        <motion.button onClick={goBackToStaycation} 
            className={styles.next_button}      
            whileTap={{scale: 0.95}} >
                Quay lại
        </motion.button>
      );  
  }

  if (path.length === 6) {

      return (
        <motion.button onClick={goBackToStaycationGallery} 
            className={styles.next_button}      
            whileTap={{scale: 0.95}} >
                Quay lại
        </motion.button>
      );  
      
            
  }

}

