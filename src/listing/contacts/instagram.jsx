import InstagramIcon from "../../assets/instagram.png";
import { useListing } from "../listingContext";



export default function Instagram({filter}) {    
    const { listing, uploadContact } = useListing();

    const handleChange = (e) => {
      const { name, value } = e.target;
      uploadContact(name, filter(value));
    }

    const handleClick = () => {
      if (listing.contacts.instagram.url) {
        window.open(`https://www.instagram.com/${listing.contacts.instagram.url}`, "_blank")
      }
    }

    return (
        <div style={ui.row}>

            <div onClick={handleClick} style={{ cursor: listing.contacts.instagram?.url ? "pointer" : "default", ...ui.icon }}>
                <img src={InstagramIcon} alt="Instagram" style={{ width: "35px" }} />
            </div>
    
        <div style={ui.column}>
          
          <input type="text" name="instagram" id="instgram" placeholder="findcationnn" 
            style={ui.input} onChange={handleChange} value={listing.contacts.instagram?.url && listing.contacts.instagram.url}/>

        </div>
      </div>
    )
}

const ui = {
    row: {
      display: "flex",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      padding: "16px 12px",
      borderRadius: "12px",
    },
    icon: { flexShrink: 0},
    column: { display: "flex", flexDirection: "column", gap: "8px", flex: 1, minWidth: 0 },
    editRow: { display: "flex", alignItems: "center", gap: "4px", position: "relative", cursor: "pointer" },
    displayRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    input: {
      border: "none",
      lineHeight: "2rem",
      textAlign: "center",
      fontSize: "14px",
    },
    link: { display: "block", textDecoration: "none", overflow: "hidden" },
    checkIcon: { position: "absolute", right: 0, paddingRight: "8px", cursor: "pointer" },
    pencilIcon: { paddingRight: "8px", cursor: "pointer" },
  };

  