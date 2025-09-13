import { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useAuth } from './authContext';
import { GoogleLogin } from '@react-oauth/google';
import { X, } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import {AnimatePresence, motion} from "framer-motion"
import SubmitPassword from './submitPassword';
import axios from 'axios';
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

        if (email === "") return setError("Bắt buộc phải điền email.")
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/email`, {email});

            const { hasPassword, hasRegister } = response.data;

            console.log("hasPassword" + hasPassword)
            console.log("hasRegister" + hasRegister)

            // if we not found email -> we return hasRegister = false -> we pop up Register Form with the email
            if (hasRegister === false) return setFoundEmail(false)


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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, {
                credential: credentialResponse.credential,
            }, { withCredentials: true });

            setUser(response.data.user)

            navigate('/list-staycation');

        } catch (err) {
            console.error('Google login failed', err);
        }
    };

    if (foundEmail === false || hasPassword === false) return navigate("/auth/register", {state: {email: email}}) 

    if (foundEmail === true && hasPassword === true) return <SubmitPassword email={email} setFoundEmail={setFoundEmail}/>

    return (
  
        <div onClick={() => navigate("/")}
        className={styles.preview_overlay} style={{display: "flex"}}>
            <motion.div className={styles.container}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <button onClick={() => navigate('/')}>
                                <X size={20} style={{padding: "4px"}}/>
                            </button>
                            <div className={styles.title}>
                                Đăng nhập hoặc Đăng Ký
                            </div>
                        </div>
                        <div className={styles.panel}>
                            <h1>Chào mừng bạn tham gia Findcation</h1>
                            <form onSubmit={handleSubmitEmail}>
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

                                {error && <p className={styles.error}>{error}</p>}
                                
                                <div className={styles.actionLoginRow}>
                                    <button type="submit" className={styles.button}>Tiếp tục</button>
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
        </div>
    );
}
