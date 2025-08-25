import styles from "./map.module.css";
import Header from "./header";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";


export default function LandingPage() {

  // if (!hasPermission || !GPS || !staycations) return <LoadingScreen />;
  const { user, } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.main_container} >
        <Header /> 
        <div className={styles.footer}>
          <div className={styles.cta_div}>
              <button className={styles.cta_button} onClick={() => navigate(!user ? "/auth/login" : "/list-staycation")}>
                  <h2 style={{margin: 0}}>Bạn là chủ kinh doanh staycation ?</h2>
              </button>
          </div>
        </div>
    </div>


  );
}