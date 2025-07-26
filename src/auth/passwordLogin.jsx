import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './authcontext';
import { ChevronLeft  } from 'lucide-react';
import styles from './login.module.css';

export default function PasswordLogin({email, setFoundEmail}) {

    const { login } = useAuth()

    const [password, setPassWord] = useState('')
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

    const handleSubmitPassword = async (e) => {
        e.preventDefault();

        if (password === "") return setError("Bắt buộc phải điền mật khẩu.")
        
        try {

            login(email, password);

            alert("login thành công")

            navigate('/')

        } catch (err) {
            console.error('Login failed', err);
            setError("Sai mật khẩu")
        } 
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <button onClick={() => setFoundEmail(null)}>
                        <ChevronLeft size={20} style={{padding: "4px"}}/>
                    </button>
                    <div className={styles.title} >
                        Đăng nhập
                    </div>
                </div>
                <div className={styles.panel}>
                    <form onSubmit={handleSubmitPassword}>
                        <div className={styles.inputGroup}>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                autoComplete='current-password'
                                value={password}
                                onChange={(e) => setPassWord(e.target.value)}
                                className={styles.input}
                            />
                            <div className={styles.showPassword}>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.toggleButton}
                                >
                                    {showPassword ? "Ẩn" : "Hiển thị"}
                                </button>
                            </div>

                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                        
                        <div className={styles.actionLoginRow}>
                            <button type="submit" className={styles.button}>Đăng nhập</button>
                        </div>
                    </form>

                    <div className={styles.googleWrapper}>
                        <Link to="/forgot-password" className={styles.link}>Bạn đã quên mật khẩu?</Link>
                    </div>
                </div>


            </div>
        </div>

    );
}
