// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useAuth } from './authContext';
import { GoogleLogin } from '@react-oauth/google';
import { X, } from 'lucide-react';
import SubmitPassword from './submitPassword';
import { apiClient } from '../config/api';
import styles from './login.module.css';

export default function SubmitEmail() {
    const { setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [foundEmail, setFoundEmail] = useState(null)
    const [hasPassword, setHasPassword] = useState(null)
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        if (email === "") return setError("* Thông tin này là bắt buộc")

        try {
            const response = await apiClient.post(`/login/email`, { email });

            const { hasPassword, hasRegister } = response.data;

            // if we not found email -> we return hasRegister = false -> we pop up Register Form with the email
            if (hasRegister === false) return setFoundEmail(false)

            // there will only 2 kind of login -> gooogleLogin + googleCodeLogin
            // which mean, if they enter email -> we send code via google to login
            // if they use googleLogin -> then just log them in
            if (hasRegister === true && hasPassword === false) {
                setHasPassword(false)
                setFoundEmail(true)
                return
            }

            // if we found email -> we check if googleLogin = false ? -> we redirect to submit password form
            if (hasRegister === true && hasPassword === true) {
                setHasPassword(true)
                setFoundEmail(true)
                return
            }

            // login(token);

        } catch (err) {
            console.error('Login failed', err);

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

    if (foundEmail === false || hasPassword === false) return navigate("/auth/register", { state: { email: email } })

    if (foundEmail === true && hasPassword === true) return <SubmitPassword email={email} setFoundEmail={setFoundEmail} />

    return (
        <motion.div className={styles.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <button onClick={() => navigate('/')}>
                        <X size={20} style={{ padding: "4px" }} />
                    </button>
                    <div className={styles.title}>
                        Đăng nhập
                    </div>
                </div>
                <div className={styles.panel}>
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
                                whileTap={{ scale: 0.95 }} >
                                Tiếp tục
                            </motion.button>
                        </div>

                    </form>

                    <div className={styles.actionRegisterRow}>
                        <div className={styles.line}></div>
                        <p>hoặc</p>
                        <div className={styles.line}></div>
                    </div>

                    <div className={styles.googleWrapper}>
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => console.log('Google Login Failed')}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
