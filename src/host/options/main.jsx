// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { useAuth } from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/google.webp";
import hostStyles from "../host.module.css";
import styles from "../../auth/login.module.css";

import ChangePassword from "./changePasswords";
import ChangeEmail from "./changeEmail";

export default function Options({ setOpenOptions }) {

    const navigate = useNavigate()
    const { logout, user } = useAuth()

    const [changePassword, setChangePassword] = useState(false)
    const [changeEmail, setChangeEmail] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    if (changePassword === true) return <ChangePassword setChangePassword={setChangePassword} />

    if (changeEmail === true) return <ChangeEmail setChangeEmail={setChangeEmail} />

    return (
        <div className={styles.preview_overlay} >
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>

                        <button onClick={() => setOpenOptions(null)}>
                            <ChevronLeft size={20} style={{ padding: "4px" }} />
                        </button>
                        <div className={styles.title}>
                            Tùy chọn
                        </div>
                    </div>
                    <div className={styles.panel} style={{ display: "flex", flexDirection: "column", gap: "0.75em" }}>

                        <div className={hostStyles.contact} style={{ cursor: "default" }}>
                            <img src={GoogleIcon} alt="Google" style={{ width: "33px" }} />
                            <span style={{ flex: "1", textAlign: "center", color: "#6A6A6A" }}>{user.email}</span>
                            <div style={{ width: "20px" }} /> {/* Spacer to balance the layout against the edit icons below */}
                        </div>

                        {user.isAdmin && (
                            <motion.button onClick={() => navigate("/admin")}
                                className={styles.options_button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}>
                                Admin
                            </motion.button>
                        )}

                        <motion.button onClick={() => setChangeEmail(true)}
                            className={styles.options_button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}>
                            Thay đổi email
                        </motion.button>

                        <motion.button onClick={() => setChangePassword(true)}
                            className={styles.options_button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}>
                            Thay đổi mật khẩu
                        </motion.button>

                        <motion.button onClick={handleLogout}
                            className={styles.options_button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}>
                            Đăng xuất
                        </motion.button>

                    </div>
                </div>
            </div>
        </div>
    )
}