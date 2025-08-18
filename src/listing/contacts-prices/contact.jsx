import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useListing } from "../listingContext";
import { useOutletContext } from "react-router-dom";
import { Facebook, Instagram, Pencil, Check } from "lucide-react";
import styles from "../listing.module.css";
import Zalo from "../../assets/zalo.png";

// =======================
// Constants & Config
// =======================
const MOBILE_BREAKPOINT = 768;

const CONTACTS_CONFIG = [
  {
    field: "zalo",
    url: "https://zalo.me/",
    icon: <img src={Zalo} alt="Zalo" style={{ width: "37px" }} />,
    placeholder: "số điện thoại",
  },
  {
    field: "facebook",
    url: "https://www.facebook.com/",
    icon: <Facebook size={35} fill="#222222" stroke="none" />,
    placeholder: "username",
  },
  {
    field: "instagram",
    url: "https://www.instagram.com/",
    icon: (
      <Instagram
        size={35}
        stroke="#ffffff"
        fill="#222222"
        strokeWidth={2}
      />
    ),
    placeholder: "username",
  },
];

// =======================
// Helpers
// =======================
function getUsernameFromUrl(url) {
  if (!url) return "";
  try {
    const { pathname } = new URL(url);
    return pathname.replace(/^\/s?\//, "").replace(/^\/|\/$/g, "") || url;
  } catch {
    return url; // Fallback for invalid URL
  }
}

// =======================
// Reusable Component
// =======================
function ContactField({
  contact,
  value,
  url,
  placeholder,
  isEditing,
  onChange,
  onToggleEdit,
}) {
  return (
    <div style={ui.row}>
      <div style={ui.icon}>{contact.icon}</div>

      <div style={ui.column}>
        {isEditing || value === null ? (
          <div style={ui.editRow}>
            <input
              type="text"
              value={value || ""}
              placeholder={placeholder}
              onChange={(e) => onChange(contact.field, e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && onToggleEdit(contact.field, false)
              }
              style={ui.input}
            />
            <Check
              size={20}
              style={ui.checkIcon}
              onClick={() => onToggleEdit(contact.field, false)}
            />
          </div>
        ) : (
          <div style={ui.displayRow}>
            {value ? (
              <a
                href={`${url}${value}`}
                target="_blank"
                rel="noopener noreferrer"
                style={ui.link}
              >
                {getUsernameFromUrl(value)}
              </a>
            ) : (
              <span style={{ color: "#aaa" }}>{contact.placeholder}</span>
            )}

            <Pencil
              size={20}
              style={ui.pencilIcon}
              onClick={() => onToggleEdit(contact.field, true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// =======================
// Main Component
// =======================
export default function Contact() {
  const { listing, uploadContact } = useListing();
  const { setStepValidity, currentStep } = useOutletContext();
  const isMobile = useMediaQuery({ query: `(max-width: ${MOBILE_BREAKPOINT}px)` });

  // Track editing state for each field
  const [editing, setEditing] = useState(
    CONTACTS_CONFIG.reduce((acc, { field }) => ({ ...acc, [field]: true }), {})
  );

  // Step validation
  useEffect(() => {
    setStepValidity((prev) => ({
      ...prev,
      [currentStep]:
        listing.contacts.zalo !== null &&
        listing.contacts.facebook !== null &&
        listing.contacts.instagram !== null,
    }));
  }, [listing.contacts, currentStep, setStepValidity]);

  // Handlers
  const handleChange = (field, value) => uploadContact(field, value);
  const handleToggleEdit = (field, state) =>
    setEditing((prev) => ({ ...prev, [field]: state }));

  return (
    <div
      className={styles.contact_information_container}
      style={{ width: isMobile ? "unset" : "50%" }}
    >
      {CONTACTS_CONFIG.map((contact) => (
        <ContactField
          key={contact.field}
          contact={contact}
          url={contact.url}
          placeholder={contact.placeholder}
          value={listing.contacts?.[contact.field]}
          isEditing={editing[contact.field]}
          onChange={handleChange}
          onToggleEdit={handleToggleEdit}
        />
      ))}
    </div>
  );
}

// =======================
// Styles (Inline for now)
// =======================
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
  editRow: { display: "flex", alignItems: "center", gap: "4px", position: "relative" },
  displayRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  input: {
    width: "100%",
    padding: "4px 36px 4px 8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    lineHeight: "1.6rem",
  },
  link: { display: "block", textDecoration: "none", overflow: "hidden" },
  checkIcon: { position: "absolute", right: 0, paddingRight: "8px", cursor: "pointer" },
  pencilIcon: { paddingRight: "8px", cursor: "pointer" },
};
