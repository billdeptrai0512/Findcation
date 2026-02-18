// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./footer.module.css"
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyButton() {


    // this button will navigate to /host/:hostId/editor/:staycationId/verify
    const navigate = useNavigate();
    const { hostId, staycationId } = useParams();
    const handleVerify = () => {
        navigate(`/host/${hostId}/editor/${staycationId}/verify`);
    };

    return (
        <motion.button
            onClick={handleVerify}
            className={styles.upload_button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Xác thực
        </motion.button>
    );
}

