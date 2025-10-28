// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react"
import { X, ChevronLeft } from "lucide-react"
import { useAuth } from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import styles from "../../auth/login.module.css"

import ChangePassword from "./changePasswords";
import ChangeEmail from "./changeEmail";

export default function Options({setOpenOptions}) {

    const navigate = useNavigate()
    const { logout } = useAuth()

    const [changePassword, setChangePassword] = useState(false)
    const [changeEmail, setChangeEmail] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    if (changePassword === true) return <ChangePassword setChangePassword={setChangePassword}/>

    if (changeEmail === true) return <ChangeEmail setChangeEmail={setChangeEmail} />

    return (
        <div className={styles.preview_overlay} >
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>

                        <button onClick={() => setOpenOptions(null)}>
                            <X size={20} style={{padding: "4px"}}/>
                        </button>
                        <div className={styles.title}>
                            Tùy chọn
                        </div>
                    </div>
                    <div className={styles.panel} style={{display: "flex", justifyContent: "center", flexDirection: "column", gap: "1em"}}>

                        <motion.button onClick={() => setChangeEmail(true)} 
                            className={styles.options_button} 
                            whileHover={{scale: 1.05}}        
                            whileTap={{scale: 0.95}}>
                                Thay đổi email
                        </motion.button>

                        <motion.button onClick={() => setChangePassword(true)} 
                            className={styles.options_button} 
                            whileHover={{scale: 1.05}}        
                            whileTap={{scale: 0.95}}>
                                Thay đổi mật khẩu
                        </motion.button>

                        <motion.button onClick={handleLogout} 
                            className={styles.options_button} 
                            whileHover={{scale: 1.05}}        
                            whileTap={{scale: 0.95}}>
                                Đăng xuất
                        </motion.button>

                    </div>
                </div>
            </div>
        </div>
    )
}