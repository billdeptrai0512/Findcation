import styles from "./listing.module.css"
import { useNavigate } from "react-router-dom";
import { useListing } from "./listingContext";
import { useStaycation } from "../map/staycationContext";
import { useAuth } from "../auth/authContext";

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

      await fetchStaycations() // why ?

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
              <button className={styles.startButton} onClick={getStart} >
                  Bắt đầu
              </button>
          ) : (
              <>
                  <button onClick={goBack} className={styles.back_button}>
                      Quay lại
                  </button>
                  {
                    percentage !== 100 ? 
                    <button onClick={goNext} 
                          className={styles.next_button} disabled={!stepValidity[steps[page]]}
                          style={{ backgroundColor: stepValidity[steps[page]] ? "#000" : "#DDDDDD", cursor: stepValidity[steps[page]] ? "pointer" : "not-allowed"}}>
                          Tiếp theo
                    </button> :
                    <button onClick={handleUploadListing} className={styles.upload_button} disabled={!stepValidity[steps[page]]}>
                      Hoàn tất
                    </button>
                  }

              </>
          )}
          
      </div>
    </div>
  );
}

