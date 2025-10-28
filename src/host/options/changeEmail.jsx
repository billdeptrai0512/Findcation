// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import { useHost } from '../hostContext';
import styles from '../../auth/login.module.css';
import axios from 'axios';

export default function ChangePassword({setChangeEmail}) {


    const { refreshHost } = useHost()
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [, setLoading] = useState(false)
    const [onWaiting, setOnWaiting] = useState(false)
    const [error, setError] = useState('');

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        if (email === '') {
            return setError('Xác nhận mật khẩu mới không giống nhau')
        }

        setLoading(true)

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/new-email`, 
                { newEmail: email },
                { withCredentials: true }
            );

            if (response.data?.message === "Reset code sent to email") {

                setError('')
                setOnWaiting(true)

            }

        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Không thể gửi mã, vui lòng thử lại.");
            }
        } finally {
            setLoading(false)
        }
    };

    const handleSubmitCode = async (e) => {
        e.preventDefault();

        if (code === '') return setError('Bạn chưa nhập mã xác nhận.');

        try {

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/change-email`, 
                {newEmail: email, code},
                { withCredentials: true }
            );

            console.log(response.data.message)

            setChangeEmail(false)
            refreshHost()
            
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Đã xảy ra lỗi, vui lòng thử lại.");
            }
        }
    }

    if (onWaiting) return (
        <div className={styles.preview_overlay}>
            <div className={styles.container}>
                <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button onClick={() => setOnWaiting(false)}>
                            <ChevronLeft size={20} style={{padding: "4px"}}/>
                        </button>
                        <div className={styles.title}>
                            Thay đổi email
                        </div>
                    </div>
                    <div className={styles.panel}>
                        <form onSubmit={handleSubmitCode}>
                            <div className={styles.inputGroup}>

                                <input
                                    id="email"
                                    name="email"
                                    placeholder="Nhập email mới"
                                    type={"email"}
                                    value={email}
                                    className={styles.input}
                                />

                                <input
                                    id="code"
                                    name="code"
                                    type="number"
                                    placeholder="6-digits-code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className={styles.input}
                                />

                            </div>

                            {error && <p className={styles.error}>{error}</p>}
                            
                            <div className={styles.actionLoginRow}>
                                <motion.button type="submit" className={styles.button}
                                    whileTap={{scale: 0.95}}>
                                        Xác nhận
                                </motion.button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className={styles.preview_overlay}>
            <div className={styles.container}>
                <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button onClick={() => setChangeEmail(false)}>
                            <ChevronLeft size={20} style={{padding: "4px"}}/>
                        </button>
                        <div className={styles.title}>
                            Thay đổi email
                        </div>
                    </div>
                    <div className={styles.panel}>
                        <form onSubmit={handleSubmitEmail}>
                            <div className={styles.inputGroup}>

                                <input
                                    id="email"
                                    name="email"
                                    placeholder="Nhập email mới"
                                    type={"email"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.input}
                                />
                    
                            </div>

                            {error && <p className={styles.error}>{error}</p>}
                            
                            <div className={styles.actionLoginRow}>
                                
                                <motion.button type="submit" className={styles.button}
                                    whileTap={{scale: 0.95}}>
                                        Gửi mã xác nhận
                                </motion.button>

                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
