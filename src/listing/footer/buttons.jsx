
import styles from "../listing.module.css"
import StartButton from "./start";
import BackButton from "./back";
import NextButton from "./next";
import CompleteButton from "./complete";

export default function Buttons({start, getStart, 
    goNext, goBack, 
    percentage, page, 
    steps, stepValidity}) {

    const justifyContent = start === true ? "space-between" : "end"

    if (start === false) {
      return (
        <div className={styles.footerButtons} style={{ justifyContent: justifyContent }}>
            <StartButton getStart={getStart} />
        </div>
      )
    }

    const allValid = Object.values(stepValidity).every(Boolean);

    return (

      <div className={styles.footerButtons} style={{ justifyContent: justifyContent }}>

  
        <BackButton goBack={goBack} />

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

