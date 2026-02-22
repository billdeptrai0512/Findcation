import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive"
import styles from "./admin.module.css"
import Logo from "../assets/logo.webp"
import { apiClient } from "../config/api";
import Hosts from "./hosts";
import Traffics from "./traffics";
import Suggestions from "./suggestion";
import SectionSelector from "./section";

export default function AdminDashBoard() {
    const [selected, setSelected] = useState('traffic');
    const [hosts, setHosts] = useState([])
    const [traffics, setTraffics] = useState([])
    const [suggestions, setSuggestions] = useState([])

    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {

        const fetchHosts = async () => {
            try {
                const response = await apiClient.get(`/auth/allHost`);
                console.log(response.data)
                setHosts(response.data);
            } catch (error) {
                console.error("Error fetching hosts:", error);
            }
        };

        const fetchVerifiedStaycations = async () => {
            try {
                const response = await apiClient.get(`/traffic/allTraffic`);
                setTraffics(response.data);
            } catch (error) {
                console.error("Error fetching staycation:", error);
            }
        };

        const fetchSuggestions = async () => {
            try {
                const response = await apiClient.get(`/suggestion`);
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching staycation:", error);
            }
        };

        fetchHosts();
        fetchSuggestions();
        fetchVerifiedStaycations()

    }, []);


    const handleSearchStaycation = async (id) => {
        try {
            const response = await apiClient
                .get(`/listing/staycation/${id}`)
                .then((res) => res.data);

            console.log(response);
            setStaycation(response);
        } catch (error) {
            console.error("Error fetching staycation:", error);
        }
    };

    return (
        <div style={{ margin: "0 auto", maxWidth: "680px" }}>
            {/* header */}
            <div className={styles.preview_header}>

                <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", cursor: "pointer" }}
                    onClick={() => navigate("/")}>
                    <img src={Logo} alt="logo" style={{ width: "64px" }} />
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
                    host: hosts.length,
                    traffic: traffics.length,
                    suggestion: suggestions.length,
                }} />

                {
                    selected === 'host' && (
                        <Hosts hosts={hosts} />
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
