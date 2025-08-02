import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X } from "lucide-react"
import { useAuth } from "../auth/authcontext"
import axios from "axios"
import styles from "../auth/login.module.css"

export default function Suggestion() {

    const navigate = useNavigate()
    const { user } = useAuth()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmitSuggestion = async (e) => {
        e.preventDefault();

        if (message === "") return setError("Góp ý không được bỏ trống.")
        
        try {

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/suggestion`, {
                message,
                user,
                stage: "test"
            });

            alert('cảm ơn bạn đã góp ý')

        } catch (err) {
            console.error('Login failed', err);

        } 
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <button onClick={() => navigate('/list-staycation')}>
                        <X size={20} style={{padding: "4px"}}/>
                    </button>
                    <div className={styles.title}>
                        Góp ý
                    </div>
                </div>
                <div className={styles.panel}>
                    <form onSubmit={handleSubmitSuggestion}>
                        <div className={styles.inputGroup}>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Viết ra suy nghĩ của bạn"
                                rows={4}
                                value={message}
                                style={{ resize: "none" }}
                                onChange={(e) => setMessage(e.target.value)}
                                className={styles.input}
                            />
                        </div>

                        {error && <p className={styles.error}>{error}</p>}
                        
                        <div className={styles.actionLoginRow}>
                            <button type="submit" className={styles.button}>Gửi</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}