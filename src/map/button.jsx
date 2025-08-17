import { useNavigate } from "react-router-dom";
import styles from "./map.module.css"


export default function Button({url, text, action}) {

    const navigate = useNavigate()

    function handleClick() {

        if (url) {
            return navigate(url)
        }

        if (action) {
            return action()
        }

    }

    return (
        <button         style={{
            padding: "16px 32px",
            borderRadius: "8px",
            background: "linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "0.975rem",
            fontWeight: "500",
            fontFamily: "'Inter', sans-serif"
          }} className={styles.login} onClick={() => handleClick()}>
            {text}
        </button>
    );
}

