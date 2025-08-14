import styles from "./listing.module.css"

export default function FooterProgress({start, getStart, goNext, goBack, percentage}) {

  console.log(percentage)

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
                <button className={styles.startButton} onClick={getStart} >
                    Bắt đầu
                </button>
            ) : (
                <>
                    <button onClick={goBack} className={styles.button}>
                        Quay lại
                    </button>
                    {
                      percentage !== 100 ? 
                      <button onClick={goNext} className={styles.button}>
                        Tiếp theo
                      </button> :
                      <button onClick={goNext} className={styles.button}>
                        Đăng
                      </button>
                    }

                </>
            )}
            
        </div>
    </div>
  );
}

