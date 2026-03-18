import { useState, useMemo } from "react";
import { apiClient } from "../config/api";
import { ChevronDown, ChevronUp, CheckCircle, Circle, MapPin, User, Search, Trash2, X } from "lucide-react";
import styles from "./admin.module.css";
import { getContactUrl as getUrl, isContactVerified as isVerified } from "../utils/contactUtils";

import FacebookIcon from "../assets/facebook.webp";
import InstagramIcon from "../assets/instagram.webp";
import ZaloIcon from "../assets/zalo.webp";

// ── ContactPlatform ───────────────────────────────────────────────────────────
function ContactPlatform({ icon, platform, value, hostId, onUpdate }) {
    const url = getUrl(value);
    const [confirmed, setConfirmed] = useState(isVerified(value));
    const [loading, setLoading] = useState(false);

    if (!url) return null;

    const pendingCode = (!confirmed && value?.code) ? value.code : null;

    const hrefs = {
        facebook: `https://www.facebook.com/${url}`,
        instagram: `https://www.instagram.com/${url}`,
        zalo: `https://zalo.me/${url}`,
    };

    const handleConfirm = async (e) => {
        e.stopPropagation();
        if (confirmed || loading) return;
        setLoading(true);
        try {
            await apiClient.patch(`/admin/host/${hostId}/verify-contact`, { platform, verified: true });
            setConfirmed(true);
            onUpdate?.({ verify: true });
        } catch (err) {
            console.error("Verify contact failed:", err);
            alert("Xác thực thất bại.");
        } finally {
            setLoading(false);
        }
    };

    const handleUnverify = async (e) => {
        e.stopPropagation();
        if (!confirmed || loading) return;
        setLoading(true);
        try {
            await apiClient.patch(`/admin/host/${hostId}/verify-contact`, { platform, verified: false });
            setConfirmed(false);
            onUpdate?.({ verify: false });
        } catch (err) {
            console.error("Unverify contact failed:", err);
            alert("Huỷ xác thực thất bại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.contact_row}>
            <a className={styles.contact_link} href={hrefs[platform]} target="_blank" rel="noreferrer"
                onClick={e => e.stopPropagation()}>
                <img src={icon} alt={platform} />
                <span className={styles.contact_handle}>{url}</span>
            </a>

            {/* Pending code badge */}
            {pendingCode && (
                <span style={{
                    fontFamily: "monospace", fontWeight: 700, fontSize: "13px",
                    background: "#FEF3C7", color: "#92400E", padding: "2px 8px", borderRadius: "6px",
                    letterSpacing: "2px", flexShrink: 0
                }}>
                    {pendingCode}
                </span>
            )}

            {confirmed ? (
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <button className={`${styles.confirm_btn} ${styles.confirm_btn_done}`} disabled>
                        <CheckCircle size={13} /> Đã xác thực
                    </button>
                    <button
                        title="Huỷ xác thực"
                        onClick={handleUnverify}
                        disabled={loading}
                        style={{
                            border: "1px solid #fca5a5", background: "#fff", color: "#dc2626",
                            borderRadius: "5px", padding: "4px 7px", cursor: "pointer", fontSize: "12px",
                            lineHeight: 1, flexShrink: 0,
                        }}
                    >
                        ×
                    </button>
                </div>
            ) : (
                <button
                    className={styles.confirm_btn}
                    onClick={handleConfirm}
                    disabled={loading}
                >
                    <Circle size={13} /> {loading ? "Đang xác thực..." : "Xác thực"}
                </button>
            )}
        </div>
    );
}

// ── VerifyToggle ────────────────────────────────────────────────────────────────────
// Reusable row: label | badge | button. Used inside StaycationCard.
function VerifyToggle({ label, verified, onVerify, onUnverify, verifyLabel, loading }) {
    return (
        <div className={styles.verify_toggle_row}>
            <span className={styles.verify_toggle_label}>{label}</span>
            <span className={verified ? styles.badge_verified : styles.badge_unverified}>
                {verified ? "✓ Xác thực" : "Chưa"}
            </span>
            {verified ? (
                <button
                    className={styles.confirm_btn}
                    onClick={onUnverify}
                    disabled={loading}
                    style={{ borderColor: "#fca5a5", color: "#dc2626", padding: "3px 8px" }}
                >
                    × Huỷ
                </button>
            ) : (
                <button
                    className={styles.confirm_btn}
                    onClick={onVerify}
                    disabled={loading}
                    style={{ padding: "3px 8px" }}
                >
                    {loading ? "Đang..." : verifyLabel}
                </button>
            )}
        </div>
    );
}

// ── StaycationCard ────────────────────────────────────────────────────────────────────
// Single card per staycation showing both address + active verification
function StaycationCard({ staycation, onUpdate }) {
    const address = staycation.location?.details;
    const addressStr = address
        ? `${address.street}, ${address.ward}, ${address.city}`
        : "Chưa có địa chỉ";

    // State initialised from props on each mount — parent hostsData is kept
    // fresh via onUpdate callbacks, so props will be correct on re-expand.
    const [addressVerified, setAddressVerified] = useState(staycation.addressVerified === true);
    const [imagesVerified, setImagesVerified] = useState(staycation.imagesVerified === true);
    const [activeVerified, setActiveVerified] = useState(staycation.active === true);
    const [loadingAddr, setLoadingAddr] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [loadingAct, setLoadingAct] = useState(false);


    const toggleAddress = async (e, val) => {
        e.stopPropagation();
        setLoadingAddr(true);
        try {
            await apiClient.patch(`/admin/staycation/${staycation.id}/verify-address`, { verified: val });
            setAddressVerified(val);
            onUpdate?.({ addressVerified: val });
        } catch { alert("Thao tác thất bại."); }
        finally { setLoadingAddr(false); }
    };

    const toggleImages = async (e, val) => {
        e.stopPropagation();
        setLoadingImg(true);
        try {
            await apiClient.patch(`/admin/staycation/${staycation.id}/verify-images`, { verified: val });
            setImagesVerified(val);
            onUpdate?.({ imagesVerified: val });
        } catch { alert("Thao tác thất bại."); }
        finally { setLoadingImg(false); }
    };

    const toggleActive = async (e, val) => {
        e.stopPropagation();
        setLoadingAct(true);
        try {
            await apiClient.patch(`/admin/staycation/${staycation.id}/verify-active`, { active: val });
            setActiveVerified(val);
            onUpdate?.({ active: val });
        } catch { alert("Thao tác thất bại."); }
        finally { setLoadingAct(false); }
    };

    return (
        <div className={styles.staycation_card}>
            {/* Header */}
            <div className={styles.staycation_card_header}>
                <div className={styles.staycation_name}>{staycation.name}</div>
                <div className={styles.staycation_address}>
                    <MapPin size={11} />
                    <span>{addressStr}</span>
                </div>
            </div>

            {/* Divider */}
            <div className={styles.staycation_card_divider} />

            {/* Verify rows */}
            <div className={styles.staycation_card_body}>
                <VerifyToggle
                    label="🏠 Địa chỉ"
                    verified={addressVerified}
                    onVerify={e => toggleAddress(e, true)}
                    onUnverify={e => toggleAddress(e, false)}
                    verifyLabel="Xác thực"
                    loading={loadingAddr}
                />
                <VerifyToggle
                    label="📸 Hình ảnh"
                    verified={imagesVerified}
                    onVerify={e => toggleImages(e, true)}
                    onUnverify={e => toggleImages(e, false)}
                    verifyLabel="Xác thực"
                    loading={loadingImg}
                />
                <VerifyToggle
                    label="⚡ Hoạt động"
                    verified={activeVerified}
                    onVerify={e => toggleActive(e, true)}
                    onUnverify={e => toggleActive(e, false)}
                    verifyLabel="Xác thực"
                    loading={loadingAct}
                />
            </div>
        </div>
    );
}

// ── ExpandedHostPanel ─────────────────────────────────────────────────────────
function ExpandedHostPanel({ host, onUpdateStaycation, onUpdateContact }) {
    const contacts = host.contacts ?? {};
    const staycations = host.staycations ?? [];
    const hasContacts = getUrl(contacts.facebook) || getUrl(contacts.instagram) || getUrl(contacts.zalo);

    return (
        <tr>
            <td colSpan={4} className={styles.expanded_panel}>
                <div className={styles.expanded_inner}>

                    {/* Contacts */}
                    <div className={styles.contacts_block}>
                        <div className={styles.section_label}>📞 Xác thực liên hệ</div>
                        <ContactPlatform icon={FacebookIcon} platform="facebook" value={contacts.facebook} hostId={host.id}
                            onUpdate={patch => onUpdateContact?.("facebook", patch)} />
                        <ContactPlatform icon={InstagramIcon} platform="instagram" value={contacts.instagram} hostId={host.id}
                            onUpdate={patch => onUpdateContact?.("instagram", patch)} />
                        <ContactPlatform icon={ZaloIcon} platform="zalo" value={contacts.zalo} hostId={host.id}
                            onUpdate={patch => onUpdateContact?.("zalo", patch)} />
                        {!hasContacts && <span className={styles.empty_label}>Chưa có liên hệ nào.</span>}
                    </div>

                    {/* Staycation cards — address + active grouped per listing */}
                    <div className={styles.staycations_block}>
                        <div className={styles.section_label}>🏠 Staycations ({staycations.length})</div>
                        {staycations.length === 0
                            ? <span className={styles.empty_label}>Chưa có staycation.</span>
                            : staycations.map(st => (
                                <StaycationCard
                                    key={st.id}
                                    staycation={st}
                                    onUpdate={patch => onUpdateStaycation?.(st.id, patch)}
                                />
                            ))
                        }
                    </div>

                </div>
            </td>
        </tr>
    );
}

// ── ContactSummaryBadges (inline table cell) ──────────────────────────────────
function ContactSummaryBadges({ contacts = {} }) {
    const platforms = [
        { key: "facebook", icon: FacebookIcon, href: u => `https://www.facebook.com/${u}` },
        { key: "instagram", icon: InstagramIcon, href: u => `https://www.instagram.com/${u}` },
        { key: "zalo", icon: ZaloIcon, href: u => `https://zalo.me/${u}` },
    ];

    const visible = platforms.filter(p => getUrl(contacts[p.key]));
    if (!visible.length) return <span className={styles.empty_label}>—</span>;

    return (
        <div className={styles.contact_summary}>
            {visible.map(({ key, icon, href }) => {
                const url = getUrl(contacts[key]);
                const verified = isVerified(contacts[key]);
                const hasCode = !verified && contacts[key]?.code;
                return (
                    <a key={key} className={styles.contact_summary_link}
                        href={href(url)} target="_blank" rel="noreferrer"
                        onClick={e => e.stopPropagation()}>
                        <img src={icon} alt={key} />
                        <span className={styles.contact_summary_handle}>{url}</span>
                        {verified
                            ? <CheckCircle size={12} color="#22c55e" />
                            : hasCode
                                ? <span style={{
                                    fontFamily: "monospace", fontWeight: 700,
                                    fontSize: "11px", letterSpacing: "1.5px",
                                    background: "#FEF3C7", color: "#92400E",
                                    padding: "1px 5px", borderRadius: "4px",
                                    whiteSpace: "nowrap",
                                }}>
                                    {contacts[key].code}
                                </span>
                                : null
                        }
                    </a>
                );
            })}
        </div>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Hosts({ hosts: initialHosts }) {
    const [expandedId, setExpandedId] = useState(null);
    // mutable copy so PATCH results survive expand/collapse cycles
    const [hostsData, setHostsData] = useState(initialHosts ?? []);
    const [searchEmail, setSearchEmail] = useState("");
    const [filterHasStaycation, setFilterHasStaycation] = useState(false);

    const toggle = (id) => setExpandedId(prev => prev === id ? null : id);

    const filteredHosts = useMemo(() => {
        return hostsData.filter(h => {
            const matchesEmail = h.email?.toLowerCase().includes(searchEmail.toLowerCase());
            const matchesStaycation = !filterHasStaycation || (h.staycations && h.staycations.length > 0);
            return matchesEmail && matchesStaycation;
        });
    }, [hostsData, searchEmail, filterHasStaycation]);

    const handleDeleteHost = async (e, hostId, hostEmail) => {
        e.stopPropagation();
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xoá host ${hostEmail || hostId} và tất cả dữ liệu liên quan? Hành động này không thể hoàn tác.`);
        if (!confirmDelete) return;

        try {
            await apiClient.delete(`/admin/host/${hostId}`);
            setHostsData(prev => prev.filter(h => h.id !== hostId));
            if (expandedId === hostId) setExpandedId(null);
            alert("Đã xoá host thành công.");
        } catch (err) {
            console.error("Delete host failed:", err);
            alert("Xoá host thất bại.");
        }
    };

    // Update a specific staycation field inside a host
    const updateStaycation = (hostId, staycationId, patch) => {
        setHostsData(prev => prev.map(h => {
            if (h.id !== hostId) return h;
            return {
                ...h,
                staycations: h.staycations.map(st =>
                    st.id === staycationId ? { ...st, ...patch } : st
                ),
            };
        }));
    };

    // Update a specific contact platform field inside a host
    const updateContact = (hostId, platform, patch) => {
        setHostsData(prev => prev.map(h => {
            if (h.id !== hostId) return h;
            const existing = h.contacts[platform];
            const updated = typeof existing === "string"
                ? { url: existing, verify: false, ...patch }
                : { ...existing, ...patch };
            return { ...h, contacts: { ...h.contacts, [platform]: updated } };
        }));
    };

    if (!hostsData?.length) return <div className={styles.empty_state}>Chưa có host nào.</div>;

    return (
        <div style={{ paddingTop: "2em", overflowX: "auto" }}>
            {/* Filter Bar */}
            <div className={styles.filter_container}>
                <div className={styles.search_wrapper}>
                    <Search size={16} className={styles.search_icon} />
                    <input
                        type="text"
                        placeholder="Tìm email host..."
                        className={styles.search_input}
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    {searchEmail && (
                        <button className={styles.clear_btn} onClick={() => setSearchEmail("")}>
                            <X size={14} />
                        </button>
                    )}
                </div>

                <label className={styles.filter_checkbox_label}>
                    <input
                        type="checkbox"
                        className={styles.filter_checkbox}
                        checked={filterHasStaycation}
                        onChange={(e) => setFilterHasStaycation(e.target.checked)}
                    />
                    <span>Có staycation</span>
                </label>
            </div>

            <table className={styles.hosts_table}>
                <thead>
                    <tr>
                        <th>Host</th>
                        <th className={styles.col_address}>Staycations</th>
                        <th className={styles.col_contact}>Liên hệ</th>
                        <th style={{ textAlign: "center", width: "80px" }}>Quản lý</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHosts.map((host, i) => {
                        const isExpanded = expandedId === host.id;
                        const staycations = host.staycations ?? [];
                        const allVerified = staycations.length > 0 && staycations.every(st =>
                            st.addressVerified && st.imagesVerified && st.contactsVerified
                        );
                        const rowBg = isExpanded ? undefined : i % 2 === 0 ? "#fff" : "#fafafa";

                        return [
                            <tr key={host.id}
                                className={`${styles.host_row} ${isExpanded ? styles.host_row_expanded : ""}`}
                                style={isExpanded ? undefined : { background: rowBg }}
                                onClick={() => toggle(host.id)}
                            >
                                {/* Host */}
                                <td>
                                    <div className={styles.host_cell}>
                                        <div className={styles.host_avatar}>
                                            <User size={16} color="#9ca3af" />
                                        </div>
                                        <div>
                                            <div className={styles.host_name}>{host.name || host.email}</div>
                                            {host.name && <div className={styles.host_email}>{host.email}</div>}
                                        </div>
                                    </div>
                                </td>



                                {/* Staycations count + status */}
                                <td className={styles.col_address}>
                                    <div className={styles.staycation_count}>
                                        {staycations.length} staycation
                                        {staycations.length > 0 && (
                                            <span className={allVerified ? styles.badge_verified : styles.badge_unverified}>
                                                {allVerified ? "✅ Đã xác thực" : "⏳ Chưa đủ"}
                                            </span>
                                        )}
                                    </div>
                                </td>

                                {/* Contacts summary */}
                                <td className={styles.col_contact}>
                                    <ContactSummaryBadges contacts={host.contacts} />
                                </td>

                                {/* Toggle */}
                                {/* <td style={{ textAlign: "center" }}>
                                    {isExpanded
                                        ? <ChevronUp size={16} color="#6b7280" />
                                        : <ChevronDown size={16} color="#6b7280" />}
                                </td> */}

                                {/* Delete */}
                                <td style={{ verticalAlign: "middle" }}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <button
                                            className={styles.delete_btn}
                                            onClick={(e) => handleDeleteHost(e, host.id, host.email)}
                                            title="Xoá host"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>,

                            isExpanded && <ExpandedHostPanel
                                key={`exp-${host.id}`}
                                host={host}
                                onUpdateStaycation={(stId, patch) => updateStaycation(host.id, stId, patch)}
                                onUpdateContact={(platform, patch) => updateContact(host.id, platform, patch)}
                            />,
                        ];
                    })}
                </tbody>
            </table>
        </div>
    );
}
