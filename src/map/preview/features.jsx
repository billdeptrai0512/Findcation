
import { useState } from "react";
import { featureIconMap  } from "../../assets/featureIcons";
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function Features({ staycation }) {

    const [expand, setExpanded] = useState(false);

    return (

        <div style={{display: "flex", flexDirection: "column", textAlign: "end", borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}>
            <div onClick={() => setExpanded((prev) => !prev)} style={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign:"center"}}>
                <h2 style={{fontSize: "1.1075rem", marginTop: "0"}}>Sở hữu</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {!expand && <span>{staycation.features.length} tiện nghi</span>}
                    {!expand && <ChevronDown size={20} strokeWidth={1.5} />}
                </div>            
            </div>
            
            {expand === true && staycation.features.map((feature, index) => (
                <div key={index}
                    style={{
                        fontSize: "0.975rem",
                        padding: "12px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span> {feature} </span>
                    <span>{featureIconMap[feature]}</span>
                </div>
                
            ))}

            {expand === true && 
            
                <div onClick={() => setExpanded((prev) => !prev)}
                    style={{display: "flex", justifyContent:"center", cursor: "pointer"}}>
                    <ChevronUp size={20} strokeWidth={1.5} /> 
                </div>    

            }

        </div>
    
    );


}



