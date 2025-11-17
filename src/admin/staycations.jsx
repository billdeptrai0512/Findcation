export default function Staycations({staycations}) {

    // const handleSearchStaycation = async (id) => {
    //     try {
    //         const response = await axios
    //             .get(`${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${id}`, {
    //                 headers: {
    //                     "ngrok-skip-browser-warning": "true",
    //                 },
    //             })
    //             .then((res) => res.data);

    //         console.log(response);

    //     } catch (error) {
    //         console.error("Error fetching staycation:", error);
    //     }
    // };

    return (

        // Address / create at / verified or not 
        <div style={{ paddingTop: "2em" }}>
            <table style={{ borderCollapse: "collapse", width: "100%",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",  borderRadius: "8px", overflow: "hidden", }}
            >
                <thead style={{ background: "#f5f5f5" }}>
                    <tr>
                        <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Name</th>
                        <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Address</th>
                        <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>Verified</th>
                    </tr>
                </thead>
                <tbody>
                {staycations.map((s, i) => (
                    <tr 
                        key={s.id}
                        style={{ background: i % 2 === 0 ? "#ffffff" : "#fafafa", cursor: "pointer",}}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#ffffff" : "#fafafa")}
                    >
                        <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                            {s.name}
                        </td>
                        <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                            {s.location.details.street}, {s.location.details.ward}, {s.location.details.city}
                        </td>

                        <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
                            <span style={{ fontWeight: "500" }}>✅ 🚫</span>
                        </td>

                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    );
}
