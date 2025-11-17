import { useState, useEffect } from "react";
import styles from "./admin.module.css"
import Logo from "../assets/logo.png"
import axios from "axios";
import Image from "./images";
import Contacts from "./contacts";
import Details from "./details";
import { useMediaQuery } from "react-responsive"
import Staycations from "./staycations";
import Traffics from "./traffics";
import { useNavigate } from "react-router-dom";
import Suggestions from "./suggestion";
import { ChevronRight , ChevronLeft } from "lucide-react";
import SectionSelector from "./section";

export default function AdminDashBoard() {
    const [selected, setSelected] = useState('traffic');
    const [staycations, setStaycations] = useState([])
    const [traffics, setTraffics] = useState([])
    const [suggestions, setSuggestions] = useState([])

    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {

        const fetchStaycations = async () => {
            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/listing/all-listing`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                );
                setStaycations(response.data);
            } catch (error) {
                console.error("Error fetching staycation:", error);
            }
        };

        const fetchVerifiedStaycations = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/traffic/allTraffic`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                );
                setTraffics(response.data);
            } catch (error) {
                console.error("Error fetching staycation:", error);
            }
        };

        const fetchSuggestions = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/suggestion`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                );
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching staycation:", error);
            }
        };

        fetchStaycations();
        fetchSuggestions();
        fetchVerifiedStaycations()
        
    }, []);


    const handleSearchStaycation = async (id) => {
        try {
            const response = await axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                })
                .then((res) => res.data);

            console.log(response);
            setStaycation(response);
        } catch (error) {
            console.error("Error fetching staycation:", error);
        }
    };

    return (
        <div style={{margin: "0 auto", maxWidth: "680px"}}>
            {/* header */}
             <div className={styles.preview_header}>

                <span style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "8px"}}
                    onClick={() => navigate("/")}>
                    <img src={Logo} alt="logo" style={{width: "64px"}} />
                    <h1>Findcation</h1> 
                </span>

                {/* <button onClick={() => navigate("/")}>
                    <X size={20}/>
                </button> */}

                {/* maybe a button to reload ? */}

            </div>

            {/* div section : contact+help | staycations / verified staycation */}
            <div>
                {/* <div >
                    <input type="number" value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
                    <button onClick={() => handleSearchStaycation(searchId)} disabled={!searchId} >
                        Search
                    </button>
                </div> */}

                {/* {staycation && (
                    <div style={{display: "flex", maxHeight:"500px", overflowY: "hidden", marginTop: "3em"}}>
                        
                        <div style={{overflowY: "scroll"}}>   
                            <Image staycation={staycation}/>
                            <Details staycation={staycation}/>
                        </div>
                        
                        <Contacts staycation={staycation} setStaycation={setStaycation} />

                    </div>
                )} */}

                {/* section  */}

                <SectionSelector isMobile={isMobile} selected={selected} setSelected={setSelected} counts={{
                    staycation: staycations.length,
                    traffic: traffics.length,
                    suggestion: suggestions.length,
                }} />

                { 
                    selected === 'staycation' && (
                        <Staycations staycations={staycations} />
                    )
                }

                { 
                    selected === 'traffic' && (
                        <Traffics traffics={traffics} />
                    )
                }

                { 
                    selected === 'suggestion' && (
                        <Suggestions suggestions={suggestions} />
                    )
                }

                
            </div>
  
        </div>
    );
}
