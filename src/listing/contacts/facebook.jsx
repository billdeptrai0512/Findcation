import FacebookIcon from "../../assets/facebook.png";
import { useListing } from "../listingContext";
import { useMediaQuery } from "react-responsive";


export default function Facebook({filter}) {    
    const { listing, uploadContact } = useListing();

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const facebookUrl = isMobile ? `fb://page/` : `https://www.facebook.com/`

    const handleChange = (e) => {
      const { name, value } = e.target;
      uploadContact(name, filter(value));
    }

    const handleClick = () => {
      if (listing.contacts.facebook.url) {
        window.open(`${facebookUrl}${listing.contacts.facebook.url}`, "_blank")
      }
    }

    return (
      <div style={ui.row}>
          <div style={{ cursor: listing.contacts.facebook?.url ? "pointer" : "default", ...ui.icon }} onClick={handleClick}>
              <img src={FacebookIcon} alt="Zalo" style={{ width: "35px" }} />
          </div>
  
        <div style={ui.column}>

            <input type="text" name="facebook" id="facebook" placeholder="findcation" 
              style={ui.input} onChange={handleChange} value={listing.contacts.facebook?.url && listing.contacts.facebook.url}/>

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
      border: "none",
      lineHeight: "2rem",
      textAlign: "center",
      fontSize: "14px",
    },
    link: { display: "block", textDecoration: "none", overflow: "hidden" },
    checkIcon: { position: "absolute", right: 0, paddingRight: "8px", cursor: "pointer" },
    pencilIcon: { paddingRight: "8px", cursor: "pointer" },
};

