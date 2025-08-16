import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useListing } from "../listingContext";
import { useOutletContext } from "react-router-dom";
import { Facebook, Instagram, Pencil, Check } from "lucide-react";
import styles from "../listing.module.css";
import Zalo from "../../assets/zalo.png"; // Assuming Zalo is an SVG component
// Constants
const MOBILE_BREAKPOINT = 768;

const CONTACTS_CONFIG = [
  { field: "facebook", icon: <Facebook size={35} fill="#222222" stroke="none" />, placeholder: "Facebook URL" },
  { field: "instagram", icon: <Instagram size={35} stroke="#ffffff" fill="#222222" strokeWidth={2} />, placeholder: "Instagram URL" },
  { field: "zalo", icon: <img src={Zalo} alt="" style={{width:"37px"}} />, placeholder: "Zalo URL" }
];

// Helper: Extract readable username from URL
function getUsernameFromUrl(url) {
  if (!url) return "";
  try {
    const { pathname } = new URL(url);
    return pathname.replace(/^\/s?\//, "").replace(/^\/|\/$/g, "") || url;
  } catch {
    return url; // Invalid URL, return as is
  }
}

// Reusable contact field
function ContactField({ contact, value, isEditing, onChange, onToggleEdit }) {
  return (
    <div style={stylesRow}>
      <div style={stylesIcon}> {contact.icon} </div>
      <div style={stylesColumn}>
        {isEditing || value === null ? (
          <div style={stylesEditRow}>
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(contact.field, e.target.value)}
              onBlur={() => onToggleEdit(contact.field, false)}
              autoFocus
              style={stylesInput}
            />
            <Check size={20} style={{position: "absolute", right: "0", paddingRight: "8px"}} onClick={() => onToggleEdit(contact.field, false)} />
          </div>
        ) : (
            <div style={stylesDisplayRow}>
              {value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" style={stylesLink}>
                  {getUsernameFromUrl(value)}
                </a>
              ) : (
                <span style={{ color: "#aaa" }}>{contact.placeholder}</span>
              )}
              <Pencil size={20} style={{ paddingRight: "8px"}} onClick={() => onToggleEdit(contact.field, true)} />
            </div>
          )}
      </div>
    </div>
  );
}



// Main component
export default function Contact() {
  const { listing, uploadContact } = useListing();
  const { setStepValidity, currentStep } = useOutletContext();

  useEffect(() => {
      setStepValidity((prev) => ({
        ...prev,
        [currentStep]: listing.contacts.zalo !== null && listing.contacts.facebook !== null && listing.contacts.instagram !== null
      }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing.contacts]);

  const [editing, setEditing] = useState(
    CONTACTS_CONFIG.reduce((acc, { field }) => ({ ...acc, [field]: true }), {})
  );

  const isMobile = useMediaQuery({ query: `(max-width: ${MOBILE_BREAKPOINT}px)` });

  const handleChange = (field, value) => uploadContact(field, value);

  const toggleEdit = (field, state) =>
    setEditing((prev) => ({ ...prev, [field]: state }));

  return (
    <div
      className={styles.contact_information_container}
      style={{ width: isMobile ? "unset" : "50%" }}
    >
      <h2>Thông tin liên lạc</h2>
      {CONTACTS_CONFIG.map((contact) => (
        <ContactField
          key={contact.field}
          contact={contact}
          value={listing.contacts?.[contact.field]}
          isEditing={editing[contact.field]}
          onChange={handleChange}
          onToggleEdit={toggleEdit}
        />
      ))}
    </div>
  );
}

// Inline style constants (can be moved to CSS later)
const stylesRow = { display: "flex", gap: "8px", alignItems: "center", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", padding: "16px 12px", borderRadius: "12px" };
const stylesIcon = { flexShrink: 0 };
const stylesColumn = { display: "flex", flexDirection: "column", gap: "8px", flex: "1", minWidth: "0" };
const stylesEditRow = { display: "flex", alignItems: "center", gap: "4px", position: "relative" };
const stylesDisplayRow = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const stylesInput = { width: "100%", padding: "4px 36px 4px 8px", border: "1px solid #ccc", borderRadius: "4px", lineHeight: "1.6rem"};
const stylesLink = { display: "block", textDecoration: "none", overflow: "hidden" };
