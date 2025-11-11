import styles from "../map.module.css";
import NearByButton from "./nearby";
import MyStaycationButton from "./mystaycation";
import { useMediaQuery } from "react-responsive";

export default function Footer() {

  const isMobile = useMediaQuery({ query: '(max-width: 714px)'})

  if (isMobile) {
    return (
      <div className={styles.footer}>
        <div className={styles.cta_div}>
            <MyStaycationButton />
            <NearByButton />
        </div>
      </div>
    )
  }
  
  return (
      <>
        <div className={styles.left_footer}>
          <div className={styles.cta_div}>
              <MyStaycationButton />
          </div>
        </div>
        <div className={styles.right_footer}>
          <div className={styles.cta_div}>
              <NearByButton />
          </div>
        </div>
      </>

     // if user -> we re direct them to CRUD staycation overall --> emails | staycations | contact information | 

  );
}