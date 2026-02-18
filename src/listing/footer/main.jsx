// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "../listing.module.css"
import ProgressBar from "./progressBar";
import Buttons from "./buttons";

export default function Footer({
  getStart, goNext, setOpenSuggestions,
  percentage, page, steps, stepValidity }) {

  return (
    <div className={styles.footer}>

      <ProgressBar percentage={percentage} />

      <Buttons percentage={percentage}
        getStart={getStart} goNext={goNext} setOpenSuggestions={setOpenSuggestions}
        page={page} steps={steps} stepValidity={stepValidity} />

    </div>
  );
}

