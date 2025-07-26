import { useNavigate } from "react-router-dom";
import styles from "./footer.module.css"


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
        <button className={styles.login} onClick={() => handleClick()}>
            {text}
        </button>
    );
}

