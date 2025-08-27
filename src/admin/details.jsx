import { featureIconMap } from "../assets/featureIcons";

export default function Details({staycation}) {

    const houseType = staycation?.type === "house" ? "Toàn bộ ngôi nhà" : "Phòng trong căn nhà"

    return (
         <div style={{display: "flex", flexDirection: "column", marginTop: "2em"}}>
                            
            <h1 style={{marginTop: "0"}}>{staycation.name}</h1>
            
            {/* type of hose */}
            <div style={{display: "flex", flexDirection: "column", gap: "4px", borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}> 
                <h2 style={{fontSize: "1.1075rem", overflow: "hidden", marginTop: "0"}}>{houseType}</h2>
            </div>

            <div style={{display: "flex", flexDirection: "column", gap: "4px", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0'}}>
                <h2 style={{fontSize: "1.1075rem", marginTop: "0", marginBottom:"16px"}}>{staycation.location.address}</h2>
            </div>
            
            {/* features */}
            <div style={{display: "flex", flexDirection: "column", borderTop: '1px solid rgba(0,0,0,0.04)', padding: '16px 0 0'}}>
                <h2 style={{fontSize: "1.1075rem", marginTop: "0", marginBottom:"16px"}}>Tiện nghi</h2>
                {staycation.features.map((feature, index) => (
                    <div key={index} 
                        style={{fontSize: "0.975rem", padding:"12px 0", borderBottom: '1px solid rgba(0,0,0,0.04)', display: "flex", justifyContent: "space-between", alignItems: "center"}}> 
                        <span>{feature}</span>
                        <span>{featureIconMap[feature] || "❓"}</span>
                    </div>
                    ))}
            </div>
        </div>
    )
}