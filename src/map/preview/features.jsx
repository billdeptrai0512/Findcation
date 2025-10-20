
import { useState } from "react";
import { featureIconMap  } from "../../assets/featureIcons";
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function Features({ staycation }) {

    const [expand, setExpanded] = useState(false);

    return (

        <div style={{display: "flex", flexDirection: "column", textAlign: "center", borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}>
            <div onClick={() => setExpanded((prev) => !prev)} style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
                <h2 style={{fontSize: "1.1075rem", marginTop: "0"}}>Tiện nghi</h2>
                <span> {expand ? <ChevronUp size={32} strokeWidth={1.5} /> : <ChevronDown size={32} strokeWidth={1.5} />} </span>
            </div>
            
            {expand === true && staycation.features.map((feature, index) => (
                <div key={index}
                    onClick={() => setExpanded((prev) => !prev)}
                    style={{
                        fontSize: "0.975rem",
                        padding: "12px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    <span> {feature} </span>
                    <span>{featureIconMap[feature]}</span>
                </div>
            ))}

        </div>
    
    );


}



