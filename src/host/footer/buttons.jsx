

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useHost } from "../hostContext";
import { useRef } from "react";
import BackButton from "./back";
import NextButton from "./next";
import CompleteButton from "./complete";
import styles from "./footer.module.css"

export default function Buttons() {

    const navigate = useNavigate()
    const location = useLocation();
    const { host, updateStaycation } = useHost();
    const { staycationId } = useParams();

    const staycation = host?.staycations.find(
        (s) => s.id === parseInt(staycationId, 10)
    );

    const originalStaycationRef = useRef(staycation);
    
    const path = location.pathname.split("/").filter(Boolean);

    const goBacktoMain = () => navigate('/')

    const goBackToHost = () => navigate(`/host/${host.id}`) 

    const goBackToStaycation = () => {
        updateStaycation(staycation.id, originalStaycationRef.current);
        navigate(`/host/${host.id}/editor/${staycationId}`, {state: { staycation }})
    }

    const goBackToStaycationGallery = () => {
        updateStaycation(staycation.id, originalStaycationRef.current);
        navigate(`/host/${host.id}/editor/${staycationId}/rooms`, {state: { staycation }})
    }

    if (path.length === 2) {
        return (
            <div className={styles.footerButtons}>
                <BackButton goBack={goBacktoMain} />

                <NextButton  /> 
            </div>
        )
    }

    if (path.length === 4) {

        return (
            <div className={styles.footerButtons} >

                <BackButton goBack={goBackToHost} />

                <NextButton /> 

            </div>
        )
    }

    if (path.length === 5) {

        if (path[path.length - 1] === "rooms") {

            return (
                <div className={styles.footerButtons} >

                    <BackButton goBack={goBackToHost} />

                    <NextButton /> 

                </div>
            )
        }

        return (
            <div className={styles.footerButtons} >

                <BackButton goBack={goBackToStaycation} />

                <CompleteButton />

            </div>
        )
    }

    if (path.length === 6) {

        return (
            <div className={styles.footerButtons} >

                <BackButton goBack={goBackToStaycationGallery} />

                <CompleteButton />

            </div>
        )
        
             
    }

}

          
            