import { useState } from "react"
import { X } from "lucide-react"
import { useHost } from "../hostContext"
import { apiClient } from "../../config/api"
import styles from "../../auth/login.module.css"

export default function ContactEditor({ data, setOpenContactEditor }) {

    const { host, refreshHost } = useHost()
    const [url, setUrl] = useState('')
    const [error, setError] = useState('')

    const handleSubmitContact = async (e) => {
        e.preventDefault();

        //TODO: We should able to remove the url
        //TODO: The url default should null or empty string

        if (url === "") return setError("Góp ý không được bỏ trống.")

        try {

            await apiClient.patch(`/auth/contact/${host.id}`, {
                type: data.type,
                url,
            });

            refreshHost()
            setOpenContactEditor(false)

        } catch (err) {
            console.error('Add contacts failed', err);

        }
    };

    const handleRemoveContact = async () => {
        try {
            await apiClient.patch(`/auth/contact/${host.id}`, {
                type: data.type,
                url: "",
            });
            refreshHost()
            setOpenContactEditor(false)
        } catch (err) {
            console.error('Send suggestion failed', err);
        }
    };



    return (
        <div className={styles.preview_overlay} >
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <button onClick={() => setOpenContactEditor(null)}>
                            <X size={20} style={{ padding: "4px" }} />
                        </button>
                        <div className={styles.title}>
                            {data.type}
                        </div>
                    </div>
                    <div className={styles.panel}>
                        <form onSubmit={handleSubmitContact}>
                            <div className={styles.inputGroup}>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder={data.url}
                                    rows={4}
                                    value={url}
                                    style={{ resize: "none" }}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            {error && <p className={styles.error}>{error}</p>}

                            <div className={styles.actionLoginRow} style={{ flexDirection: "unset" }}>
                                <button type="button" onClick={handleRemoveContact} className={styles.options_button}>Xóa</button>
                                <button type="submit" className={styles.button} style={{ width: "unset", padding: "16px 24px" }}>Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}