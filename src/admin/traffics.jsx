export default function Traffics({traffics}) {

    console.log(traffics)

    return (

        // Address / create at / verified or not 
        <div style={{ paddingTop: "2em" }}>
            <table style={{ borderCollapse: "collapse", width: "100%",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",  borderRadius: "8px", overflow: "hidden", }}
            >
                <thead style={{ background: "#f5f5f5" }}>
                    <tr>
                        <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>Name</th>
                        <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>Platform</th>
                        <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {traffics.map((traffic, i) => (
                        <tr key={traffic.id}
                             onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#ffffff" : "#fafafa")}>
                            
                            <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
                                {traffic.staycation.name}
                            </td>

                            <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
                                {traffic.platform}
                            </td>

                            <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
                                <span>{convertDate(traffic.date)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    );
}


function convertDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;

    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);

    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;

    const dd = date.getDate().toString().padStart(2, "0");
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}
