import InstagramIcon from "../../assets/instagram.png";
import { useState } from "react";
export default function Instagram() {    
    
    const [instagramUser, setInstagramUser] = useState(null);
    const currentUrl = window.location.href; // Replace with your actual redirect URI
    const url = `http://localhost:3000/auth/instagram?redirect=${encodeURIComponent(currentUrl)}`
    return (
        <div style={ui.row}>
            <div style={ui.icon}>
                <img src={InstagramIcon} alt="Instagram" style={{ width: "35px" }} />
            </div>
    
        <div style={ui.column}>
          
            <div style={ui.editRow} 
            onClick={() => window.location.href = url}>
              <span>
                Liên kết bằng Instagram
              </span>
            </div>

        </div>
      </div>
    )
}

const ui = {
    row: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      padding: "16px 12px",
      borderRadius: "12px",
    },
    icon: { flexShrink: 0 },
    column: { display: "flex", flexDirection: "column", gap: "8px", flex: 1, minWidth: 0 },
    editRow: { display: "flex", alignItems: "center", gap: "4px", position: "relative", cursor: "pointer" },
    displayRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    input: {
      width: "100%",
      padding: "4px 36px 4px 8px",
      border: "none",
      borderRadius: "4px",
      lineHeight: "2rem",
    },
    link: { display: "block", textDecoration: "none", overflow: "hidden" },
    checkIcon: { position: "absolute", right: 0, paddingRight: "8px", cursor: "pointer" },
    pencilIcon: { paddingRight: "8px", cursor: "pointer" },
  };