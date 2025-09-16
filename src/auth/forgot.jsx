import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft  } from 'lucide-react';
import axios from 'axios';
import styles from './login.module.css';

export default function Forgot() {

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('')
    const [onWaiting, setOnWaiting] = useState(false)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        if (email === '') return setError('Bạn chưa nhập email.');

        try {

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/forgot-password`, {email});

            if (response.data?.message === "Reset code sent to email") {

                setError('')

                return setOnWaiting(true)
            }
            
        } catch (err) {
            console.error('Login failed', err);
            setError('Không có email này trong hệ thống');
        }
    };

    const handleSubmitCode = async (e) => {
        e.preventDefault();

        if (code === '') return setError('Bạn chưa nhập mã xác nhận.');

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/verify-pin`, {email, code});

            const { token } = response.data;
            if (token) return navigate(`/auth/reset-password`, {state: { token, email }});
            
        } catch (err) {
            console.error('Login failed', err);
            setError('Sai mã xác nhận');
        }
    }

    const renderFormInputEmail = () =>{
        return (
            <div className={styles.container}>
                <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button onClick={() => navigate('/auth/login')}>
                            <ChevronLeft size={20} style={{padding: "4px"}}/>
                        </button>
                        <div className={styles.title}>
                            Bạn đã quên mật khẩu ?
                        </div>
                    </div>
                    <div className={styles.panel}>
                        <form onSubmit={handleSubmitEmail}>
                            <div className={styles.inputGroup}>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            {error && <p className={styles.error}>{error}</p>}
                            
                            <div className={styles.actionLoginRow}>
                                <button type="submit" className={styles.button}>Gửi mã xác nhận</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const renderFormInputCode = () =>{
        return (
            <div className={styles.container}>
                <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button onClick={() => {
                            setOnWaiting(false)
                            setError('')
                        }}>
                            <ChevronLeft size={20} style={{padding: "4px"}}/>
                        </button>
                        <div className={styles.title}>
                            Nhập mã xác nhận
                        </div>
                    </div>
                    <div className={styles.panel}>
                        <form onSubmit={handleSubmitCode}>
                            <div className={styles.inputGroup}>
                                <input
                                    id="code"
                                    name="code"
                                    type="number"
                                    placeholder="6-DIGITS-CODE"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            {error && <p className={styles.error}>{error}</p>}
                            
                            <div className={styles.actionLoginRow}>
                                <button type="submit" className={styles.button}>Tiếp tục</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container} >
            {onWaiting ? renderFormInputCode() : renderFormInputEmail()}
        </div>
    );
}
