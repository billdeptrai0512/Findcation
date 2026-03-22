import { Phone, ChevronDown, ChevronUp, ShieldCheck, Clock, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { apiClient } from "../../../config/api";
import { useHost } from "../../hostContext";
import { getContactUrl, isContactVerified } from "../../../utils/contactUtils";
import styles from "../verify.module.css";
import FacebookIcon from "../../../assets/facebook.webp";
import InstagramIcon from "../../../assets/instagram.webp";
import ZaloIcon from "../../../assets/zalo.webp";

// ── Config ────────────────────────────────────────────────────────────────────
const FINDCATION_PAGES = {
    facebook: "https://m.me/findcation",        // Facebook Messenger direct
    instagram: "https://ig.me/m/findcationnn",     // Instagram DM direct
    zalo: "https://zalo.me/0902822192",      // Findcation Zalo number
};

const PLATFORMS = [
    { key: "facebook", icon: FacebookIcon, label: "Facebook" },
    { key: "instagram", icon: InstagramIcon, label: "Instagram" },
    { key: "zalo", icon: ZaloIcon, label: "Zalo" },
];

function formatExpiry(expiresAt) {
    if (!expiresAt) return "";
    const mins = Math.round((new Date(expiresAt) - Date.now()) / 60000);
    if (mins <= 0) return "Đã hết hạn";
    return `Còn ${mins} phút`;
}

function ContactDetails({ contacts, hostId, staycationId }) {
    const { updateContacts } = useHost();
    const registered = PLATFORMS.filter(p => getContactUrl(contacts[p.key]));
    const unverified = registered.filter(p => !isContactVerified(contacts[p.key]));
    const allVerified = registered.length > 0 && unverified.length === 0;

    const [codes, setCodes] = useState(() => {
        const init = {};
        registered.forEach(p => {
            const v = contacts[p.key];
            init[p.key] = v?.code ? { code: v.code, expiresAt: v.codeExpiresAt } : null;
        });
        return init;
    });
    const [loading, setLoading] = useState(false);

    const hasAnyCodes = unverified.some(p => codes[p.key]);

    const handleGenerateAll = async () => {
        setLoading(true);
        try {
            const results = await Promise.all(
                unverified.map(p =>
                    apiClient
                        .post(`/auth/host/${hostId}/generate-code`, { platform: p.key })
                        .then(res => ({ key: p.key, ...res.data }))
                        .catch(() => null)
                )
            );
            setCodes(prev => {
                const next = { ...prev };
                results.forEach(r => {
                    if (!r) return;
                    next[r.key] = { code: r.code, expiresAt: r.expiresAt };
                    updateContacts(r.key, { code: r.code, codeExpiresAt: r.expiresAt });
                });
                return next;
            });

        } catch (err) {
            console.error("Generate codes failed:", err);
            alert("Tạo mã thất bại. Thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.sub_section}>
            {registered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "16px 0", display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#6A6A6A" }}>Chưa có thông tin liên hệ nào.</p>
                    <a href={`/host/${hostId}/editor/${staycationId}/contacts`} className={styles.send_code_btn} style={{ width: "auto", padding: "10px 24px", textDecoration: "none" }}>
                        Thêm liên hệ
                    </a>
                </div>
            ) : allVerified ? (
                <div className={styles.all_verified_banner}>
                    <ShieldCheck size={20} color="#166534" />
                    <span>Tất cả kênh liên hệ đã được xác thực</span>
                </div>
            ) : (
                <>
                    <div className={styles.contact_list}>
                        {registered.map(p => {
                            const url = getContactUrl(contacts[p.key]);
                            const verified = isContactVerified(contacts[p.key]);
                            const codeInfo = codes[p.key];
                            return (
                                <div key={p.key} className={styles.contact_item_row}>
                                    <img src={p.icon} alt={p.label} className={styles.contact_platform_icon} />
                                    <span className={styles.contact_platform_handle}>{url}</span>

                                    {verified ? (
                                        <span className={styles.verified_badge}>
                                            <ShieldCheck size={12} /> Đã xác thực
                                        </span>
                                    ) : codeInfo ? (
                                        <div className={styles.inline_code}>
                                            <span className={styles.code_chip}>{codeInfo.code}</span>
                                            <span className={styles.code_expiry_small}>
                                                <Clock size={10} /> {formatExpiry(codeInfo.expiresAt)}
                                            </span>
                                            <a
                                                href={FINDCATION_PAGES[p.key]}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={styles.dm_link}
                                            >
                                                Nhắn →
                                            </a>
                                        </div>
                                    ) : (
                                        <span className={styles.pending_badge}>Chờ xác thực</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {hasAnyCodes && (
                        <p className={styles.codes_instruction}>
                            Nhắn từng mã trên đến Findcation qua kênh tương ứng — chúng tôi sẽ xác thực trong vòng 24 giờ.
                        </p>
                    )}

                    <button
                        className={styles.send_code_btn}
                        onClick={handleGenerateAll}
                        disabled={loading}
                    >
                        {loading
                            ? "Đang tạo mã..."
                            : hasAnyCodes
                                ? <><RefreshCw size={14} style={{ display: "inline", marginRight: 6 }} />Tạo mã mới ({unverified.length} kênh)</>
                                : `Tạo mã xác thực (${unverified.length} kênh)`
                        }
                    </button>
                </>
            )}
        </div>
    );
}

export default function ContactCard({ staycation, openCard, toggle, contacts, hostId }) {
    return (
        <div className={styles.section_card}>
            <div className={styles.card_header} onClick={() => toggle("contact")}>
                <div className={styles.card_header_left}>
                    <div className={styles.card_icon_box}><Phone size={18} /></div>
                    <div>
                        <span className={styles.card_title}>Thông tin liên hệ</span>
                        <div className={styles.card_badges}>
                            {staycation.contactsVerified
                                ? <span className={styles.status_badge_verified}>Đã xác thực</span>
                                : <span className={styles.status_badge_unverified}>Chưa xác thực</span>}
                        </div>
                    </div>
                </div>
                <div className={styles.card_chevron}>
                    {openCard === "contact" ? <ChevronUp size={18} color="#6A6A6A" /> : <ChevronDown size={18} color="#6A6A6A" />}
                </div>
            </div>

            <AnimatePresence>
                {openCard === "contact" && (
                    <motion.div className={styles.card_body}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div className={styles.card_body_scroll}>
                            <div className={styles.divider} />
                            <ContactDetails contacts={contacts} hostId={hostId} staycationId={staycation.id} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
