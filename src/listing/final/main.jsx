import { useMediaQuery } from "react-responsive";
import styles from "../listing.module.css";
import DemoProfile from "./demo";
import Contact from "./contact";


//we need responsive
//check button to confirm url
//url when confirm should be act like a link url
//image should be able to slide

export default function Final() {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

    return (
        <div className={styles.pageContent}>
            <h1 style={{marginBottom: "4px", fontSize: "1.68rem"}}>Thật tuyệt! Đã đến lúc đăng cho thuê.</h1>
            <div className={styles.intrustion} style={{paddingBottom: "8px", color: "#6A6A6A"}}>
                Dưới đây là thông tin mà bọn mình sẽ hiển thị trên bản đồ. Hãy đảm bảo bạn đã thêm thông tin liên lạc trước khi đăng nhé.
            </div>


            <div className={isMobile ? styles.mobile_contact_container : styles.contact_container}>

                <DemoProfile />

                <Contact />

            </div>
        </div>
    );
}

