
import { useState } from "react";
import { featureIconMap } from "../../assets/featureIcons";
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function Features({ staycation }) {

    const [expand, setExpanded] = useState(true);

    return (

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: '8px', boxShadow: '0 5px 10px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
            <div onClick={() => setExpanded((prev) => !prev)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "center" }}>
                <h2 style={{ fontSize: "1.1075rem", marginTop: "0" }}>Tiện nghi</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {!expand && <span>{staycation.features.length}</span>}
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
                    style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}>
                    <ChevronUp size={20} strokeWidth={1.5} />
                </div>

            }

        </div>

    );


}



