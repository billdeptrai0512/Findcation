import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { X, Mail, ChevronLeft  } from 'lucide-react';
import styles from './login.module.css';
import axios from 'axios';

export default function ResetPassword() {

    const location = useLocation()
    // eslint-disable-next-line no-unused-vars
    const {token, email} = location.state || {}

    const [password, setPassWord] = useState('')
    const [confirmPassword, setConfirmPassWord] = useState('')
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();
    
    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Cả 2 mật khẩu phải giống nhau')
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/reset-password`, {
                token: token,
                password
            });

            console.log(response.data);

            navigate('/')

        } catch (err) {
            console.error('reset password failed', err);
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <button onClick={() => navigate('/login')}>
                        <X size={20} style={{padding: "4px"}}/>
                    </button>
                    <div className={styles.title}>
                        Cập nhật mật khẩu
                    </div>
                </div>
                <div className={styles.panel}>
                    <form onSubmit={handleChangePassword}>
                        <div className={styles.inputGroup}>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                autoComplete='new-password'
                                value={password}
                                onChange={(e) => setPassWord(e.target.value)}
                                className={styles.input}
                            />
                            <div className={styles.showPassword} style={{zIndex: "2"}}>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.toggleButton}
                                >
                                    {showPassword ? "Ẩn" : "Hiển thị"}
                                </button>
                            </div>

                            {/*  */}

                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type={showConfirm ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu của bạn"
                                value={confirmPassword}
                                autoComplete='new-password'
                                onChange={(e) => setConfirmPassWord(e.target.value)}
                                className={styles.input}
                            />
                            <div className={styles.showPassword} style={{height: "9.85em"}}>
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className={styles.toggleButton}
                                >
                                    {showConfirm ? "Ẩn" : "Hiển thị"}
                                </button>
                            </div>
                        </div>

                        {error && <p className={styles.error}>{error}</p>}
                        
                        <div className={styles.actionLoginRow}>
                            <button type="submit" className={styles.button}>Cập nhật</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>


    );
}
