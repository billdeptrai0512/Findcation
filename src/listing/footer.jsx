// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useListing } from "./listingContext";
import { useStaycation } from "../map/staycationContext";
import { useAuth } from "../auth/authContext";
import styles from "./listing.module.css"

export default function FooterProgress({start, getStart, goNext, goBack, percentage, page, steps, stepValidity}) {

  const {uploadListingOnDatabase, resetListing} = useListing()  
  const { fetchStaycations, setNewStaycation } = useStaycation()
  const {user} = useAuth()

  const navigate = useNavigate()

  const handleUploadListing = async () => {

    if (!user) return console.log('no user')

    try {

      const created = await uploadListingOnDatabase(user)

      setNewStaycation(created)

      resetListing()

      await fetchStaycations() 

      navigate("/")

    } catch (err) {

      console.error("Error uploading listing:", err)

    }

  }

  return (
    <div className={styles.footer}>

      {/* Progress Bar */}
      <div >
        <div style={{
          height: 6,
          background: "#eee",
          borderRadius: 3,
          overflow: "hidden"
        }}>
          <div style={{
            width: `${percentage}%`,
            background: "#000",
            height: "100%",
            transition: "width 0.3s"
          }} />
        </div>
      </div>

      <div className={styles.footerButtons}
          style={{ justifyContent: start === true ? "space-between" : "end" }}>

          {start === false ? (
              <motion.button className={styles.startButton} onClick={getStart} 
                  whileHover={{scale: 1.05}}        
                  whileTap={{scale: 0.95}} >
                    Bắt đầu
              </motion.button>
          ) : (
              <>
                  <motion.button onClick={goBack} className={styles.back_button}      
                      whileTap={{scale: 0.95}} >
                      Quay lại
                  </motion.button>
                  {
                    percentage !== 100 ? 
                    <motion.button onClick={goNext} className={styles.next_button} disabled={!stepValidity[steps[page]]}
                          style={{ backgroundColor: stepValidity[steps[page]] ? "#000" : "#DDDDDD", cursor: stepValidity[steps[page]] ? "pointer" : "not-allowed"}}
                          whileHover={{scale: 1.05}}        
                          whileTap={{scale: 0.95}}>
                            Tiếp theo
                    </motion.button> :
                    <motion.button onClick={handleUploadListing} className={styles.upload_button} disabled={!stepValidity[steps[page]]}
                        whileHover={{scale: 1.05}}        
                        whileTap={{scale: 0.95}}>
                          Hoàn tất
                    </motion.button>
                  }

              </>
          )}
          
      </div>
    </div>
  );
}

