import styles from "../map.module.css"
import { useMediaQuery } from "react-responsive"
import { useParams } from "react-router-dom";
import MobilePreview from "./mobilePreview";
import DesktopPreview from "./desktopPreview";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PreviewStaycation() {

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

    if (!staycation) return null;

    if (isMobile) return (
        <MobilePreview staycation={staycation} />
    )

    return (
        <div className={styles.preview_overlay} style={{display: "flex"}}>
            
            <DesktopPreview staycation={staycation} />      
          
        </div>
    )
}