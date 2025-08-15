import styles from "./listing.module.css"
import { Navigate, useNavigate } from "react-router-dom";
import { useListing } from "./listingContext";
import { useAuth } from "../auth/authcontext";

export default function FooterProgress({start, getStart, goNext, goBack, percentage}) {

  console.log(percentage)

  const {uploadListingOnDatabase} = useListing()
  const {user} = useAuth()

  const navigate = useNavigate()


  const handleUploadListing = () => {

    if (!user) return console.log('no user')

    uploadListingOnDatabase(user.id)

    navigate("/")
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
                      <button onClick={goNext} className={styles.next_button}>
                        Tiếp theo
                      </button> :
                      <button onClick={handleUploadListing} className={styles.upload_button}>
                        Đăng
                      </button>
                    }

                </>
            )}
            
        </div>
    </div>
  );
}

