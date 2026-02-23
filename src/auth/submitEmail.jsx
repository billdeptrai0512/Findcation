// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useAuth } from './authContext';
import { GoogleLogin } from '@react-oauth/google';
import { X, Info, ChevronLeft } from 'lucide-react';

import SubmitPassword from './submitPassword';
import { apiClient } from '../config/api';
import styles from './login.module.css';

export default function SubmitEmail() {
    const { setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [foundEmail, setFoundEmail] = useState(null)
    const [hasPassword, setHasPassword] = useState(null)
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        if (email === "") return setError("* Thông tin này là bắt buộc")

        setIsSubmitting(true);
        setError('');

        try {
            const response = await apiClient.post(`/login/email`, { email });

            const { hasPassword, hasRegister } = response.data;

            // if we not found email -> we return hasRegister = false -> we pop up Register Form with the email
            if (hasRegister === false) {
                setFoundEmail(false);
                return;
            }

            // if we found email -> we check if they have password
            setFoundEmail(true);
            setHasPassword(hasPassword);

        } catch (err) {
            console.error('Login failed', err);
            setError('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await apiClient.post(`/auth/google`, {
                credential: credentialResponse.credential,
            });

            const user = response.data.user
            setUser(user)

            if (user.isAdmin) {
                return navigate('/admin')
            } else {
                navigate(`/host/${user.id}`)
            }

        } catch (err) {
            console.error('Google login failed', err);
        }
    };

    if (foundEmail === false) return navigate("/auth/register", { state: { email: email } })

    if (foundEmail === true && hasPassword === true) return <SubmitPassword email={email} setFoundEmail={setFoundEmail} />

    return (
        <motion.div className={styles.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <button onClick={() => foundEmail === true ? setFoundEmail(null) : navigate('/')}>
                        {foundEmail === true ? <ChevronLeft size={20} style={{ padding: "4px" }} /> : <X size={20} style={{ padding: "4px" }} />}
                    </button>
                    <div className={styles.title}>
                        {foundEmail === true ? 'Tài khoản đã tồn tại' : 'Đăng nhập'}
                    </div>
                </div>
                <div className={styles.panel}>
                    {foundEmail === true ? (
                        <>
                            <div className={styles.infoPanel}>
                                {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                    <Info size={24} color="#3b82f6" />
                                    <h2 className={styles.infoTitle}>Chào mừng bạn quay lại!</h2>
                                </div> */}
                                <p className={styles.infoText}>
                                    Email <strong>{email}</strong> đã được đăng ký thông qua Google.
                                    <br />
                                    Bạn có thể tiếp tục đăng nhập nhanh bằng Google hoặc thiết lập mật khẩu riêng để đăng nhập bằng email.
                                </p>
                            </div>

                            <div className={styles.googleWrapper}>
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => console.log('Google Login Failed')}
                                />
                            </div>

                            <div className={styles.actionRegisterRow} style={{ marginBottom: "1rem" }}>
                                <p>hoặc</p>
                            </div>

                            <div className={styles.actionLoginRow}>
                                <motion.button
                                    className={styles.secondaryButton}
                                    onClick={() => navigate("/auth/register", { state: { email: email, isUpgrade: true } })}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Thiết lập mật khẩu
                                </motion.button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Chào mừng bạn tham gia Findcation</h1>
                            <form onSubmit={handleSubmitEmail}>

                                {error && <p className={styles.error}>{error}</p>}

                                <div className={styles.inputGroup}>
                                    <input
                                        id="email"
                                        name="username"
                                        type="email"
                                        placeholder="Email"
                                        autoComplete="username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.actionLoginRow}>
                                    <motion.button type="submit" className={styles.button}
                                        disabled={isSubmitting}
                                        whileTap={{ scale: 0.95 }} >
                                        {isSubmitting ? 'Đang xử lý...' : 'Tiếp tục'}
                                    </motion.button>
                                </div>

                            </form>

                            <div className={styles.actionRegisterRow}>
                                <p>hoặc</p>
                            </div>

                            <div className={styles.googleWrapper}>
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => console.log('Google Login Failed')}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

