import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import FacebookIcon from "../assets/facebook.webp";
import InstagramIcon from "../assets/instagram.webp";
import ZaloIcon from "../assets/zalo.webp";

// ── tiny inline styles ──────────────────────────────────────────────────────
const th = { padding: "11px 14px", border: "1px solid #e0e0e0", textAlign: "left", fontWeight: 600, fontSize: "13px", whiteSpace: "nowrap" };
const td = { padding: "11px 14px", border: "1px solid #e8e8e8", verticalAlign: "middle", fontSize: "13px" };
const iconLink = { display: "inline-flex", alignItems: "center", gap: "5px", marginRight: "8px", cursor: "pointer", textDecoration: "none", color: "#333", fontSize: "12px" };

function ContactBadge({ icon, handle, href }) {
    if (!handle) return null;
    return (
        <a href={href} target="_blank" rel="noreferrer" style={iconLink} onClick={e => e.stopPropagation()}>
            <img src={icon} alt="" style={{ width: "20px", height: "20px", borderRadius: "4px" }} />
            <span style={{ maxWidth: "90px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{handle}</span>
        </a>
    );
}

function ExpandedRow({ s }) {
    const address = s.location?.details;
    const contacts = s.host?.contacts ?? {};
    const navigate = useNavigate();

    const info = [
        { label: "Đường", value: address?.street },
        { label: "Phường/Xã", value: address?.ward },
        { label: "Thành phố", value: address?.city },
    ];

    return (
        <tr>
            <td colSpan={4} style={{ ...td, background: "#f9f9f9", padding: "16px 20px" }}>
                <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>

                    {/* Address block */}
                    <div>
                        <div style={{ fontWeight: 600, fontSize: "12px", color: "#888", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>📍 Địa chỉ</div>
                        {info.map(({ label, value }) => (
                            <div key={label} style={{ display: "flex", gap: "8px", marginBottom: "4px", fontSize: "13px" }}>
                                <span style={{ color: "#aaa", minWidth: "72px" }}>{label}</span>
                                <span style={{ fontWeight: 500 }}>{value || "—"}</span>
                            </div>
                        ))}
                    </div>

                    {/* Contacts block */}
                    <div>
                        <div style={{ fontWeight: 600, fontSize: "12px", color: "#888", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>📞 Liên hệ host</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {contacts.facebook && (
                                <a href={`https://www.facebook.com/${contacts.facebook}`} target="_blank" rel="noreferrer"
                                    style={{ ...iconLink, fontSize: "13px" }} onClick={e => e.stopPropagation()}>
                                    <img src={FacebookIcon} alt="fb" style={{ width: "22px" }} />
                                    <span>{contacts.facebook}</span>
                                </a>
                            )}
                            {contacts.instagram && (
                                <a href={`https://www.instagram.com/${contacts.instagram}`} target="_blank" rel="noreferrer"
                                    style={{ ...iconLink, fontSize: "13px" }} onClick={e => e.stopPropagation()}>
                                    <img src={InstagramIcon} alt="ig" style={{ width: "22px" }} />
                                    <span>{contacts.instagram}</span>
                                </a>
                            )}
                            {contacts.zalo && (
                                <a href={`https://zalo.me/${contacts.zalo}`} target="_blank" rel="noreferrer"
                                    style={{ ...iconLink, fontSize: "13px" }} onClick={e => e.stopPropagation()}>
                                    <img src={ZaloIcon} alt="zalo" style={{ width: "22px" }} />
                                    <span>{contacts.zalo}</span>
                                </a>
                            )}
                            {!contacts.facebook && !contacts.instagram && !contacts.zalo && (
                                <span style={{ color: "#bbb", fontSize: "13px" }}>Chưa có liên hệ</span>
                            )}
                        </div>
                    </div>

                    {/* Action */}
                    <div style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
                        <button
                            onClick={e => { e.stopPropagation(); navigate(`/host/${s.hostId}/editor/${s.id}`); }}
                            style={{
                                padding: "7px 14px", borderRadius: "6px", border: "1px solid #ccc",
                                background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 500,
                            }}
                        >
                            Mở editor →
                        </button>
                    </div>

                </div>
            </td>
        </tr>
    );
}

export default function Staycations({ staycations }) {
    const [expandedId, setExpandedId] = useState(null);

    const toggle = (id) => setExpandedId(prev => prev === id ? null : id);

    return (
        <div style={{ paddingTop: "2em", overflowX: "auto" }}>
            <table style={{
                borderCollapse: "collapse", width: "100%",
                boxShadow: "0 2px 6px rgba(0,0,0,0.10)", borderRadius: "8px", overflow: "hidden",
                fontSize: "13px",
            }}>
                <thead style={{ background: "#f5f5f5" }}>
                    <tr>
                        <th style={th}>Tên</th>
                        <th style={th}>Địa chỉ</th>
                        <th style={th}>Liên hệ host</th>
                        <th style={{ ...th, textAlign: "center" }}>Xác thực</th>
                    </tr>
                </thead>
                <tbody>
                    {staycations.map((s, i) => {
                        const isExpanded = expandedId === s.id;
                        const bg = isExpanded ? "#f0f4ff" : i % 2 === 0 ? "#ffffff" : "#fafafa";
                        const contacts = s.host?.contacts ?? {};
                        const address = s.location?.details;
                        const addressStr = address
                            ? `${address.street}, ${address.ward}, ${address.city}`
                            : "Chưa có địa chỉ";

                        return (
                            <Fragment key={s.id}>
                                <tr
                                    key={s.id}
                                    style={{ background: bg, cursor: "pointer", transition: "background 0.15s" }}
                                    onClick={() => toggle(s.id)}
                                    onMouseEnter={(e) => { if (!isExpanded) e.currentTarget.style.background = "#f0f0f0"; }}
                                    onMouseLeave={(e) => { if (!isExpanded) e.currentTarget.style.background = bg; }}
                                >
                                    <td style={td}>
                                        <span style={{ fontWeight: 500 }}>{s.name}</span>
                                    </td>
                                    <td style={{ ...td, color: "#555" }}>{addressStr}</td>
                                    <td style={td}>
                                        <ContactBadge icon={FacebookIcon} handle={contacts.facebook} href={`https://www.facebook.com/${contacts.facebook}`} />
                                        <ContactBadge icon={InstagramIcon} handle={contacts.instagram} href={`https://www.instagram.com/${contacts.instagram}`} />
                                        <ContactBadge icon={ZaloIcon} handle={contacts.zalo} href={`https://zalo.me/${contacts.zalo}`} />
                                        {!contacts.facebook && !contacts.instagram && !contacts.zalo && (
                                            <span style={{ color: "#ccc" }}>—</span>
                                        )}
                                    </td>
                                    <td style={{ ...td, textAlign: "center" }}>
                                        <span title={isExpanded ? "Thu gọn" : "Xem chi tiết"}>
                                            {isExpanded ? "▲" : "▼"}
                                        </span>
                                    </td>
                                </tr>
                                {isExpanded && <ExpandedRow key={`exp-${s.id}`} s={s} />}
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
