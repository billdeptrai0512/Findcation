import { useMediaQuery } from "react-responsive"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import styles from "../map.module.css"
import Preview from "./preview";


export default function PreviewStaycation() {

    const navigate = useNavigate()
    const { id } = useParams();
    const [ staycation , setStaycations ] = useState();

    useEffect(() => {
        const fetchStaycation = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${id}`);
                console.log(response.data);
                setStaycations(response.data);
            } catch (error) {
                console.error("Error fetching staycation:", error);
            }
        };

        fetchStaycation();
    }, [id])


    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const exitOverLay = () => {
        if (isMobile) return

        navigate("/")
    }

    if (!staycation) return null;

    return (
        <div onClick={exitOverLay} className={styles.preview_overlay}>
            <motion.div
                key={id} // important! so exit triggers when ID changes
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
            >
                <Preview staycation={staycation} />
            </motion.div>
        </div>
    )
}