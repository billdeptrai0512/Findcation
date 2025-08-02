import { useState } from "react";
import styles from "./listing.module.css"

export default function FooterProgress() {

  const totalSteps = 5;
  const [start, setStart] = useState(false)
  const [step, setStep] = useState(0);

  const percentage = Math.round((step / totalSteps) * 100);

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 0) setStart(false)
    if (step > 0) setStep(step - 1);
  };

  const handleStart = () => {
    setStart(true);
  };

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
            style={{ justifyContent: start === true ? "space-between" : "center" }}>

            {start === false ? (
                <button onClick={handleStart} className={styles.startButton}>
                    Bắt đầu
                </button>
            ) : (
                <>
                    <button onClick={handleBack} className={styles.button}>
                        Quay lại
                    </button>
                    <button onClick={handleNext} className={styles.button}>
                        Tiếp theo
                    </button>
                </>
            )}
            
        </div>
    </div>
  );
}

