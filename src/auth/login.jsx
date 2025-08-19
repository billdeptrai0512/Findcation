import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './authcontext';
import { GoogleLogin } from '@react-oauth/google';
import { X, Mail, ChevronLeft  } from 'lucide-react';
import PasswordLogin from './passwordLogin';
import axios from 'axios';
import styles from './login.module.css';

export default function Login() {
    const { setUser } = useAuth();
    const [member, setMember] = useState()
    const [email, setEmail] = useState('');
    const [foundEmail, setFoundEmail] = useState(null)
    const [googleLogin, setGoogleLogin] = useState(null)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        if (email === "") return setError("Bắt buộc phải điền email.")
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/email`, {email});

            const { user, googleLogin, hasRegister } = response.data;

            // if we not found email -> we return hasRegister = false -> we pop up Register Form with the email
            if (hasRegister === false) return setFoundEmail(false)

            // if we found email -> we check if googleLogin = true ? -> if true then it already register via google -> redirect to google login with that email display
            if (hasRegister === true && googleLogin === true) {
                setGoogleLogin(true)
                return setMember(user)
            }

            // if we found email -> we check if googleLogin = false ? -> we redirect to submit password form
            if (hasRegister === true && googleLogin === false) return setFoundEmail(true)

            // login(token);

        } catch (err) {
            console.error('Login failed', err);

        } 
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register/auth/google`, {
                credential: credentialResponse.credential,
            }, { withCredentials: true });

            setUser(response.data.user)

            navigate('/list-staycation');

        } catch (err) {
            console.error('Google login failed', err);
        }
    };

    if (foundEmail === false) return navigate("/auth/register", {state: {email: email}}) 

    if (foundEmail === true) return <PasswordLogin email={email} setFoundEmail={setFoundEmail}/>

    if (googleLogin) {

        const imgixDomain = 'https://findcation.imgix.net';

        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <button onClick={() => {
                            setGoogleLogin(false)
                            setMember(null)
                            return setEmail('')
                        }}>
                            <ChevronLeft  size={20}/>
                        </button>
                        <div className={styles.title}>
                            Chào mừng bạn quay lại, {member.name}
                        </div>
                    </div>
                    <div className={styles.panel}>

                        <div className={styles.profile}>
                            <img src={`${imgixDomain}${member.avatar}`} alt="avatar" />
                            <p> <Mail size={16}/> {maskEmail(member.email)} </p>
                        </div>

                        <div className={styles.googleWrapper}>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => console.log('Google Login Failed')}
                            />
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <button onClick={() => navigate('/')}>
                        <X size={20} style={{padding: "4px"}}/>
                    </button>
                    <div className={styles.title}>
                        Đăng nhập
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
                        
                        <div className={styles.actionRegisterRow}>
                            <div className={styles.line}></div>
                            <p>hoặc</p>
                            <div className={styles.line}></div>
                        </div>

                    </form>

                    <div className={styles.googleWrapper}>
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => console.log('Google Login Failed')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function maskEmail(email) {
    const [local, domain] = email.split("@");

    if (local.length <= 6) {
        // If local part is short, show only first character and last one
        return `${local[0]}${"•".repeat(local.length - 2)}${local.slice(-1)}@${domain}`;
    }

    const start = local.slice(0, 2);
    const end = local.slice(-4);
    const masked = "•".repeat(local.length - start.length - end.length);
    return `${start}${masked}${end}@${domain}`;
}
