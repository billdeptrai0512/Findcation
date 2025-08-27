import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';
import { ChevronLeft } from 'lucide-react'
import styles from './login.module.css';
import axios from 'axios';

export default function RegisterForm() {
    
    const location = useLocation()
    const state = location.state

    const { login } = useAuth()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: state.email,
        password: '',
        isAdmin: false, // ✅ thêm isAdmin
    });
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        if (formData.firstName === '') return setError('Bạn chưa điền tên của bạn.')
        if (formData.lastName === '') return setError('Bạn chưa điền họ của bạn.')
        if (formData.password === '') return setError('Bạn chưa nhập mật khẩu.')

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, formData);

            await login(formData.email, formData.password)

            navigate('/list-staycation')

        } catch (err) {

            console.error('Register failed', err);
            
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <button onClick={() => navigate('/auth/login')}>
                        <ChevronLeft size={20} style={{padding: "4px"}}/>
                    </button>
                    <div className={styles.title}>
                        Hoàn tất đăng ký
                    </div>
                </div>
                <div className={styles.panel}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label>Tên pháp nhân</label>
                            <input
                                id="firstName"
                                name="firstName"
                                placeholder="Tên trên giấy tờ tùy thân"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={styles.input}
                            />
                            <input
                                id="lastName"
                                name="lastName"
                                placeholder="Họ trên giấy tờ tùy thân"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Thông tin liên hệ</label>
                            <input
                                id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
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
                                    autoComplete='new-password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                                <button type="button" className={styles.toggleButton}
                                    onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? "Ẩn" : "Hiển thị"}
                                </button>
                            </div>
                        </div>

                        {error && <p className={styles.error}>{error}</p>}
        
                        <div className={styles.actionLoginRow}>
                            <button type="submit" className={styles.button}>Đồng ý và tiếp tục</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>

    );
}
