

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive"
import { useHost } from "../hostContext";
import { useRef } from "react";
import BackButton from "./back";
import OptionsButton from "./options";
import CompleteButton from "./complete";
import DeleteButton from "../delete";
import styles from "./footer.module.css"

export default function Buttons({setOpenOptions}) {

    const navigate = useNavigate()
    const location = useLocation();
    const isMobile = useMediaQuery({ query: '(max-width: 750px)'})

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
            <div className={styles.footerButtons} style={{justifyContent: isMobile ? "space-between" : "end"}} >

                {isMobile && <BackButton goBack={goBacktoMain} />}

                <OptionsButton  setOpenOptions={setOpenOptions}/> 
            </div>
        )
    }

    if (path.length === 4) {

        return (
            <div className={styles.footerButtons} style={{justifyContent: isMobile ? "space-between" : "end"}}>

                {isMobile && <BackButton goBack={goBackToHost} />}

                <DeleteButton /> 

            </div>
        )
    }

    if (path.length === 5) {

        if (path[path.length - 1] === "rooms") {

            return (
                <div className={styles.footerButtons} style={{justifyContent: isMobile ? "space-between" : "end"}}>

                    {isMobile && <BackButton goBack={goBackToHost} />}

                    <OptionsButton setOpenOptions={setOpenOptions}/> 

                </div>
            )
        }

        return (
            <div className={styles.footerButtons} style={{justifyContent: isMobile ? "space-between" : "end"}}>

                {isMobile && <BackButton goBack={goBackToStaycation} />}
                
                <CompleteButton />

            </div>
        )
    }

    if (path.length === 6) {

        return (
            <div className={styles.footerButtons} style={{justifyContent: isMobile ? "space-between" : "end"}}>

                {isMobile && <BackButton goBack={goBackToStaycationGallery} />}
                
                <CompleteButton />

            </div>
        )
        
             
    }

}

          
            