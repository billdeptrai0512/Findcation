import { useMediaQuery } from "react-responsive"
import BackButton from "./back"
import styles from "../host.module.css"


export default function Header() {

    const isMobile = useMediaQuery({ query: '(max-width: 750px)'})

    return (
        <div className={styles.header}>

            {!isMobile && <BackButton/>}

        </div>   
    )
}

