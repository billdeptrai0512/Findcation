import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/authcontext";
import styles from "./footer.module.css"
import Button from "./button";


export default function Footer() {

    const router = useLocation();
    const { user, logout } = useAuth();
    const mainPage = router.pathname === "/" 

    if (user) {

        return (

            <footer className={styles.footer}>
    
                <Button text={'Đăng xuất'} action={logout}/>
    
            </footer>
        )

    }

    if (mainPage) {

        return ( 

            <footer className={styles.footer}>
    
                <Button url={'/login'} text={'Trở thành chủ nhà'}/>
    
            </footer>
        )

    } 
}


