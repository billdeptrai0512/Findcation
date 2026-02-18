
import styles from "../listing.module.css"
import StartButton from "./start";
import SuggestionButton from "./suggestion";
import NextButton from "./next";
import CompleteButton from "./complete";

export default function Buttons({ getStart,
  goNext, setOpenSuggestions,
  percentage, page,
  steps, stepValidity }) {

  const justifyContent = page === -1 ? "end" : "space-between";

  if (page === -1) {
    return (
      <div className={styles.footerButtons} style={{ justifyContent: justifyContent }}>
        <StartButton getStart={getStart} />
      </div>
    )
  }

  const allValid = Object.values(stepValidity).every(Boolean);

  return (

    <div className={styles.footerButtons} style={{ justifyContent: justifyContent }}>


      <SuggestionButton setOpenSuggestions={setOpenSuggestions} />

      {

        percentage === 100 && allValid ?

          <CompleteButton goNext={goNext}
            page={page} steps={steps}
            stepValidity={stepValidity} />

          :

          <NextButton goNext={goNext}
            page={page} steps={steps}
            stepValidity={stepValidity} />

      }

    </div>

  );
}

