import { useState } from "react"
import { X } from "lucide-react"
import axios from "axios"
import styles from "../../auth/login.module.css"

export default function Suggestion({ setOpenSuggestions }) {

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmitSuggestion = async (e) => {
        e.preventDefault();

        if (message === "") return setError("Góp ý không được bỏ trống.")

        try {

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/suggestion`, {
                message,
                stage: "preview"
            });

            alert('Cảm ơn đã góp ý 🤝')

            setOpenSuggestions(false)

        } catch (err) {
            console.error('Send suggestion failed', err);

        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <button onClick={() => setOpenSuggestions(false)}>
                        <X size={20} style={{ padding: "4px" }} />
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
                                placeholder="Bạn nghĩ điều gì chưa tốt và nên được cải thiện ?"
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