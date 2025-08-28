import styles from "./map.module.css";
import Header from "./header";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import NearByButton from "./nearby";


export default function LandingPage() {

  const { user, } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 714px)'})
  
  return (
    <div className={styles.main_container} >
        <Header /> 
        {
          isMobile ? (
            <div className={styles.footer}>
              <div className={styles.cta_div}>
                  <NearByButton />
                  <button className={styles.cta_button} onClick={() => navigate(!user ? "/auth/login" : "/list-staycation")}>
                      <h2 style={{margin: 0}}>Bạn đang kinh doanh staycation ?</h2>
                  </button>
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
                    <button className={styles.cta_button} onClick={() => navigate(!user ? "/auth/login" : "/list-staycation")}>
                        <h2 style={{margin: 0}}>Bạn đang kinh doanh staycation ?</h2>
                    </button>
                </div>
              </div>
            </>

          )
        }
 
        {/* <div className={styles.left_footer}>
          <div className={styles.cta_div}>
              <NearByButton />
          </div>
        </div>
        <div className={styles.right_footer}>
          <div className={styles.cta_div}>
              <button className={styles.cta_button} onClick={() => navigate(!user ? "/auth/login" : "/list-staycation")}>
                  <h2 style={{margin: 0}}>Bạn đang kinh doanh staycation ?</h2>
              </button>
          </div>
        </div> */}
    </div>
  );
}