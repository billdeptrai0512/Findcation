// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import styles from '../../auth/login.module.css';
import axios from 'axios';

export default function ChangePassword({setChangePassword}) {

    const [password, setPassWord] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassWord] = useState('')
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showNewConfirm, setNewConfirm] = useState(false)
    
    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            return setError('Xác nhận mật khẩu mới không giống nhau')
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/change-password`, 
                { password,  newPassword },
                { withCredentials: true }
            );

            console.log(response.data);

            alert('Thay đổi mật khẩu thành công')

            setChangePassword(false)

        } catch (err) {
            console.error('reset password failed', err);
        }
    };

    return (
        <div className={styles.preview_overlay}>
            <div className={styles.container}>
                <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button onClick={() => setChangePassword(false)}>
                            <ChevronLeft size={20} style={{padding: "4px"}}/>
                        </button>
                        <div className={styles.title}>
                            Thay đổi mật khẩu
                        </div>
                    </div>
                    <div className={styles.panel}>
                        <form onSubmit={handleChangePassword}>
                            <div className={styles.inputGroup}>

                                <div style={{position: "relative", display: "flex", alignItems: "center"}}>
                                    <input
                                        id="old-password"
                                        name="old-password"
                                        placeholder="Mật khẩu cũ"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete='new-password'
                                        value={password}
                                        onChange={(e) => setPassWord(e.target.value)}
                                        className={styles.input}
                                    />
                                    <button type="button" className={styles.toggleButton}
                                        onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? "Ẩn" : "Hiển thị"}
                                    </button>
                                </div>

                                {/*  */}

                                <div style={{position: "relative", display: "flex", alignItems: "center"}}>
                                    <input
                                        id="new-password"
                                        name="new-password"
                                        placeholder="Mật khẩu mới"
                                        type={showConfirm ? "text" : "password"}
                                        autoComplete='new-password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={styles.input}
                                    />
                                    <button type="button" className={styles.toggleButton}
                                        onClick={() => setShowConfirm(!showConfirm)}>
                                            {showConfirm ? "Ẩn" : "Hiển thị"}
                                    </button>
                                </div>

                                <div style={{position: "relative", display: "flex", alignItems: "center"}}>
                                    <input
                                        id="confirm-new-password"
                                        name="confirm-new-password"
                                        placeholder="Nhập lại mật khẩu mới"
                                        type={showNewConfirm ? "text" : "password"}
                                        autoComplete='new-password'
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassWord(e.target.value)}
                                        className={styles.input}
                                    />
                                    <button type="button" className={styles.toggleButton}
                                        onClick={() => setNewConfirm(!showNewConfirm)}>
                                            {showNewConfirm ? "Ẩn" : "Hiển thị"}
                                    </button>
                                </div>
                            </div>

                            {error && <p className={styles.error}>{error}</p>}
                            
                            <div className={styles.actionLoginRow}>
                                <motion.button type="submit" className={styles.button}
                                    whileTap={{scale: 0.95}}>
                                        Cập nhật
                                </motion.button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
