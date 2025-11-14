import styles from "./map.module.css"

export default function Header() {
    return ( 

        <div className={styles.header} >
            <div className={styles.title} >
                <h1>Findcation</h1>
                <span>Bản đồ kết nối staycation self-checkin khắp Việt Nam</span>   
            </div>
        </div>
    )
}


