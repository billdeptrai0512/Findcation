import styles from "./footer.module.css"
import ProgressBar from "./progressBar";
import Buttons from "./buttons";

export default function Footer({setOpenOptions}) {

  return (

    <div className={styles.footer}>

      <ProgressBar  />

      <Buttons setOpenOptions={setOpenOptions}/>

    </div>
  );
}

