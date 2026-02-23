// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { apiClient } from '../config/api';
import styles from './login.module.css';

export default function Forgot() {

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('')
    const [onWaiting, setOnWaiting] = useState(false)
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();


    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        if (email === '') return setError('Bạn chưa nhập email.');

        setIsSubmitting(true);
        setError('');

        try {

            const response = await apiClient.post(`/login/forgot-password`, { email });

            if (response.data?.message === "Reset code sent to email") {
                setError('')
                return setOnWaiting(true)
            }

        } catch (err) {
            console.error('Forgot password failed', err);
            setError(err.response?.data?.message || 'Không có email này trong hệ thống');
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleSubmitCode = async (e) => {
        e.preventDefault();

        if (code === '') return setError('Bạn chưa nhập mã xác nhận.');

        setIsSubmitting(true);
        setError('');

        try {
            const response = await apiClient.post(`/login/verify-pin`, { email, code });

            const { token } = response.data;
            if (token) return navigate(`/auth/reset-password`, { state: { token, email } });

        } catch (err) {
            console.error('Verify pin failed', err);
            setError(err.response?.data?.message || 'Sai mã xác nhận');
        } finally {
            setIsSubmitting(false);
        }
    }


    const renderFormInputEmail = () => {
        return (
            <div className={styles.container}>
                <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button onClick={() => navigate('/auth/login')}>
                            <ChevronLeft size={20} style={{ padding: "4px" }} />
                        </button>
                        <div className={styles.title}>
                            Bạn quên mật khẩu ?
                        </div>
                    </div>
                    <div className={styles.panel}>
                        <form onSubmit={handleSubmitEmail}>

                            {error && <p className={styles.error}>{error}</p>}

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

                            <div className={styles.actionLoginRow}>
                                <motion.button type="submit" className={styles.button}
                                    disabled={isSubmitting}
                                    whileTap={{ scale: 0.95 }}>
                                    {isSubmitting ? 'Đang gửi...' : 'Gửi mã xác nhận'}
                                </motion.button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const renderFormInputCode = () => {
        return (
            <div className={styles.container}>
                <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button onClick={() => {
                            setOnWaiting(false)
                            setError('')
                        }}>
                            <ChevronLeft size={20} style={{ padding: "4px" }} />
                        </button>
                        <div className={styles.title}>
                            Nhập mã xác nhận
                        </div>
                    </div>
                    <div className={styles.panel}>
                        <form onSubmit={handleSubmitCode}>

                            {error && <p className={styles.error}>{error}</p>}

                            <div className={styles.inputGroup}>
                                <input
                                    id="code"
                                    name="code"
                                    type="number"
                                    placeholder="mã xác nhận"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.actionLoginRow}>
                                <motion.button type="submit" className={styles.button}
                                    disabled={isSubmitting}
                                    whileTap={{ scale: 0.95 }}>
                                    {isSubmitting ? 'Đang xử lý...' : 'Tiếp tục'}
                                </motion.button>

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
