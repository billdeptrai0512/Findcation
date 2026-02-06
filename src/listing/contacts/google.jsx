import { useAuth } from "../../auth/authContext";
import { GoogleLogin } from '@react-oauth/google';
import GoogleIcon from "../../assets/google.png";
import styles from "./contacts.module.css";
import { apiClient } from "../../config/api";

export default function Google() {

    const { setUser, user } = useAuth()

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await apiClient.post(`/auth/google`, {
                credential: credentialResponse.credential,
            });

            setUser(response.data.user)

        } catch (err) {
            console.error('Google login failed', err);
        }
    };

    if (user) return (

        <div className={styles.contactRow} style={ui.row}>

            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={GoogleIcon} alt="Google" style={{ width: "35px" }} />
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <span> {user.name} </span>
                </div>
            </div>

        </div>

    )

    return (

        <div className={styles.contactRow} style={ui.row}>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                size="33px"
                onError={() => console.log('Google Login Failed')}
            />
        </div>
    )
}


const ui = {
    icon: { flexShrink: 0 },
    column: { display: "flex", flexDirection: "column", gap: "8px", flex: 1, minWidth: 0 },
    editRow: { display: "flex", alignItems: "center", gap: "4px", position: "relative", cursor: "pointer" },
    displayRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    input: {
        border: "none",
        lineHeight: "2rem",
        textAlign: "center",
        fontSize: "14px",
    },
    link: { display: "block", textDecoration: "none", overflow: "hidden" },
    checkIcon: { position: "absolute", right: 0, paddingRight: "8px", cursor: "pointer" },
    pencilIcon: { paddingRight: "8px", cursor: "pointer" },
};

