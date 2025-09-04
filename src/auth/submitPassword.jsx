import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './authContext';
import { ChevronLeft, Eye, EyeClosed  } from 'lucide-react';
import styles from './login.module.css';


export default function SubmitPassword({email, setEmail, setFoundEmail,}) {

    const { login } = useAuth()

    const [password, setPassWord] = useState('')
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

    const handleSubmitPassword = async (e) => {
        e.preventDefault();

        if (password === "") return setError("Bắt buộc phải điền mật khẩu.")
        
        try {

            await login(email, password);

            navigate('/list-staycation')

        } catch (err) {

            if (err.response?.status === 401) {
                setError(
                  <>
                    Sai mật khẩu rồi.{" "}
                    <Link to="/auth/forgot-password" className={styles.link}>
                      Bạn đã quên mật khẩu?
                    </Link>
                  </>
                );
            } else if (err.response) {
                setError("Có lỗi xảy ra, vui lòng thử lại.");
            } else {
                setError("Không thể kết nối đến server.");
            }

        } 
    };

    // here we need to check if the user have the password or not ?
    // if he doesn't have meanning last time he use gmail so we kinda have them to register password if he want

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <button onClick={() => setFoundEmail(null)}>
                        <ChevronLeft size={20} style={{padding: "4px"}}/>
                    </button>
                    <div className={styles.title} >
                        {"Đăng nhập"}
                    </div>
                </div>
                <div className={styles.panel}>
                    <form onSubmit={handleSubmitPassword}>
                        {error && <p className={styles.error}>{error}</p>}

                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <input
                                id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Mật khẩu</label>
                            <div style={{position: "relative", display: "flex", alignItems: "center"}}>
                                <input
                                    id="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete='current-password'
                                    value={password}
                                    onChange={(e) => setPassWord(e.target.value)}
                                    className={styles.input}
                                />
                                <button type="button" className={styles.toggleButton}
                                    onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Eye /> : <EyeClosed />}
                                </button>
                            </div>

                        </div>
                              
                        <div className={styles.actionLoginRow}>
                            <button type="submit" className={styles.button}>{"Đăng nhập"}</button>
                        </div>
                        
                    </form>

                </div>


            </div>
        </div>

    );
}
