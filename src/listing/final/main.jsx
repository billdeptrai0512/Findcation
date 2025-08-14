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
            <h1 style={{marginBottom: "4px"}}>Thật tuyệt! Đã đến lúc đăng cho thuê.</h1>
            <div className={styles.intrustion} style={{paddingBottom: "8px", color: "#6A6A6A"}}>
                Dưới đây là những thông tin mà bọn mình sẽ hiển thị cho khách. Hãy đảm bảo bạn đã kiểm tra kỹ thông tin trước khi đăng.
            </div>


            <div className={isMobile ? styles.mobile_contact_container : styles.contact_container}>

                <DemoProfile />

                <Contact />

            </div>
        </div>
    );
}

