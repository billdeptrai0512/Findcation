// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "../listing.module.css"
import ProgressBar from "./progressBar";
import Buttons from "./buttons";

export default function Footer({start, 
        getStart, goNext, goBack,
        percentage, page, steps, stepValidity}) {

  return (
    <div className={styles.footer}>

        <ProgressBar percentage={percentage} />

        <Buttons start={start} percentage={percentage} 
            getStart={getStart} goNext={goNext} goBack={goBack} 
            page={page} steps={steps} stepValidity={stepValidity}/>

    </div>
  );
}

