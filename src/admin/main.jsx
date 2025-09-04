import { useState, useEffect } from "react";
import axios from "axios";
import Image from "./images";
import Contacts from "./contacts";
import Details from "./details";

export default function AdminDashBoard() {
    const [staycation, setStaycation] = useState(null);
    const [searchId, setSearchId] = useState(""); // track input value
    const [totalStaycation, setTotalStaycation] = useState(null)
    const [totalVerifiedStaycation, setTotalVerifiedStaycation] = useState(null)
    const [totalSuggestion, setTotalSuggestion] = useState(null)
    // const [totalPaidStaycation, setTotalPaidStaycation] = useState(null)

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
    
                console.log(response.data.length);
                setTotalStaycation(response.data.length);
            } catch (error) {
                console.error("Error fetching staycation:", error);
            }
        };

        const fetchVerifiedStaycations = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/listing/all-verified-listing`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                );
    
                console.log(response.data.length);
                setTotalVerifiedStaycation(response.data.length);
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

                setTotalSuggestion(response.data);
            } catch (error) {
                console.error("Error fetching staycation:", error);
            }
        };
    
        fetchStaycations();
        fetchVerifiedStaycations()
        fetchSuggestions()
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
            <h1>Admin</h1>

            <div>
                <div >
                    <input type="number" value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
                    <button onClick={() => handleSearchStaycation(searchId)} disabled={!searchId} >
                        Search
                    </button>
                </div>

                {staycation && (
                    <div style={{display: "flex", maxHeight:"500px", overflowY: "hidden", marginTop: "3em"}}>
                        
                        <div style={{overflowY: "scroll"}}>   
                            <Image staycation={staycation}/>
                            <Details staycation={staycation}/>
                        </div>
                        
                        <Contacts staycation={staycation} setStaycation={setStaycation} />

                    </div>
                )}

                <div style={{display: "flex", justifyContent: "space-between", textAlign: "center", marginTop: "3em"}}>
                    <div style={{padding: "3em", boxShadow: "0 0 0 1px transparent,0 0 0 4px transparent, 0 2px 4px rgba(0,0,0,0.18)",
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: 'blur(10px) saturate(180%)'}}>
                        <h3 style={{margin: 0}}>{totalStaycation}</h3>
                        <span>staycation</span>
                    </div>
                    <div style={{padding: "3em", boxShadow: "0 0 0 1px transparent,0 0 0 4px transparent, 0 2px 4px rgba(0,0,0,0.18)",
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: 'blur(10px) saturate(180%)'}}>
                        <h3 style={{margin: 0}}>{totalVerifiedStaycation}</h3>
                        <span>verified staycation</span>
                    </div>
                    <div style={{padding: "3em", boxShadow: "0 0 0 1px transparent,0 0 0 4px transparent, 0 2px 4px rgba(0,0,0,0.18)",
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: 'blur(10px) saturate(180%)'}}>
                        <h3 style={{margin: 0}}>1000</h3>
                        <span>paid staycation</span>
                    </div>
                </div>
                
                { totalSuggestion && (
                    <div style={{ paddingTop: "5em" }}>
                        <table
                            style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            borderRadius: "8px",
                            overflow: "hidden",
                            }}
                        >
                            <thead style={{ background: "#f5f5f5" }}>
                            <tr>
                                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Created At</th>
                                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>User</th>
                                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Stage</th>
                                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Message</th>
                            </tr>
                            </thead>
                            <tbody>
                            {totalSuggestion.map((s, i) => (
                                <tr
                                    key={s.id}
                                    style={{ background: i % 2 === 0 ? "#ffffff" : "#fafafa", cursor: "pointer",}}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#ffffff" : "#fafafa") }
                                >
                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                                        {new Date(s.createdAt).toISOString().split("T")[0]}
                                    </td>
                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                                        <span style={{ fontWeight: "500" }}>{s.user?.name}</span>
                                    <br />
                                        <span style={{ fontSize: "12px", color: "#555" }}>{s.user?.email}</span>
                                    </td>
                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{s.stage}</td>
                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{s.message}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                
            </div>
  
        </div>
    );
}
