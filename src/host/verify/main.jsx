import { useParams } from "react-router-dom";
import { Zap, MapPin, Phone, ChevronDown, ChevronUp, ShieldCheck, Clock, RefreshCw } from "lucide-react";
import styles from "./verify.module.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHost } from "../hostContext";
import { apiClient } from "../../config/api";
import { getContactUrl, isContactVerified } from "../../utils/contactUtils";

import FacebookIcon from "../../assets/facebook.webp";
import InstagramIcon from "../../assets/instagram.webp";
import ZaloIcon from "../../assets/zalo.webp";

// ── Config ────────────────────────────────────────────────────────────────────
// 👇 Update these to Findcation's official accounts
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

// ── ContactCard: one button → codes for all unverified platforms ──────────────
function ContactCard({ contacts, hostId }) {
    const { updateContacts, host } = useHost();
    const registered = PLATFORMS.filter(p => getContactUrl(contacts[p.key]));
    const unverified = registered.filter(p => !isContactVerified(contacts[p.key]));
    const allVerified = registered.length > 0 && unverified.length === 0;

    // codes: { facebook: { code, expiresAt } | null, ... }
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
            // Call per-platform in parallel — backend can later offer a bulk endpoint
            // POST /auth/host/:id/generate-code { platform }
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
                    // Sync back to HostContext so host.contacts reflects the code
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
            {allVerified ? (
                <div className={styles.all_verified_banner}>
                    <ShieldCheck size={20} color="#166534" />
                    <span>Tất cả kênh liên hệ đã được xác thực</span>
                </div>
            ) : (
                <>
                    {/* Contact list — shows all platforms with pending / verified states */}
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
                                        /* Code chip + direct DM link to Findcation */
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
                        {console.log(host)}
                    </div>

                    {/* Instruction — only visible after codes are generated */}
                    {hasAnyCodes && (
                        <p className={styles.codes_instruction}>
                            Nhắn từng mã trên đến Findcation qua kênh tương ứng — chúng tôi sẽ xác thực trong vòng 24 giờ.
                        </p>
                    )}

                    {/* Single action button for all platforms */}
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

// ── Main page ─────────────────────────────────────────────────────────────────
export default function VerifyStaycation() {
    const { staycationId } = useParams();
    const { host } = useHost();
    const [openCard, setOpenCard] = useState(null);

    const staycation = host?.staycations.find(s => s.id === parseInt(staycationId));
    if (!staycation) return null;

    const address = staycation.location?.details;
    const addressString = address
        ? `${address.street}, ${address.ward}, ${address.city}`
        : "Chưa có địa chỉ";

    const contacts = host.contacts ?? {};
    const anyContactVerified =
        isContactVerified(contacts.facebook) ||
        isContactVerified(contacts.instagram) ||
        isContactVerified(contacts.zalo);

    const toggle = (card) => setOpenCard(prev => prev === card ? null : card);

    return (
        <div className={styles.pageContent}>
            <div className={styles.page_header}>
                <h1 className={styles.page_title}>Xác thực</h1>
                <p className={styles.page_subtitle}>Chứng minh bạn là chủ staycation và thông tin liên hệ là của bạn</p>
            </div>

            {/* ── Card 1: Liên hệ ── */}
            <div className={styles.section_card}>
                <div className={styles.card_header} onClick={() => toggle("contact")}>
                    <div className={styles.card_header_left}>
                        <div className={styles.card_icon_box}><Phone size={18} /></div>
                        <div>
                            <span className={styles.card_title}>Thông tin liên hệ</span>
                            <div className={styles.card_badges}>
                                {anyContactVerified
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
                                <ContactCard contacts={contacts} hostId={host.id} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Card 2: Địa chỉ ── */}
            <div className={styles.section_card}>
                <div className={styles.card_header} onClick={() => toggle("address")}>
                    <div className={styles.card_header_left}>
                        <div className={styles.card_icon_box}><MapPin size={18} /></div>
                        <div>
                            <span className={styles.card_title}>Địa chỉ</span>
                            <div className={styles.card_badges}>
                                {staycation.verify
                                    ? <span className={styles.status_badge_verified}>Đã xác thực</span>
                                    : <span className={styles.status_badge_unverified}>Chưa xác thực</span>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.card_chevron}>
                        {openCard === "address" ? <ChevronUp size={18} color="#6A6A6A" /> : <ChevronDown size={18} color="#6A6A6A" />}
                    </div>
                </div>

                <AnimatePresence>
                    {openCard === "address" && (
                        <motion.div className={styles.card_body}
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                            <div className={styles.sub_divider} />
                            <div className={styles.sub_section}>
                                <div className={styles.sub_label_row} style={{ justifyContent: "center" }}>
                                    <span className={styles.email_address} style={{ maxWidth: "80%", textAlign: "center" }}>
                                        {addressString}
                                    </span>
                                </div>
                                <div className={styles.payment_box}>
                                    <div className={styles.payment_price_row}>
                                        <span className={styles.payment_price}>512.000 VNĐ</span>
                                        <span className={styles.payment_price_note}>· một lần</span>
                                    </div>
                                    <div className={styles.qr_wrap}>
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=AddressVerification512000"
                                            alt="QR thanh toán địa chỉ" className={styles.qr_img} />
                                    </div>
                                    <p className={styles.payment_note}>Findcation sẽ đến để xác thực địa chỉ staycation của bạn.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Card 3: Đang hoạt động ── */}
            <div className={styles.section_card}>
                <div className={styles.card_header} onClick={() => toggle("business")}>
                    <div className={styles.card_header_left}>
                        <div className={styles.card_icon_box}><Zap size={18} /></div>
                        <div>
                            <span className={styles.card_title}>Đang hoạt động</span>
                            <div className={styles.card_badges}>
                                <span className={styles.status_badge_unverified}>Chưa xác thực</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card_chevron}>
                        {openCard === "business" ? <ChevronUp size={18} color="#6A6A6A" /> : <ChevronDown size={18} color="#6A6A6A" />}
                    </div>
                </div>

                <AnimatePresence>
                    {openCard === "business" && (
                        <motion.div className={styles.card_body}
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                            <div className={styles.divider} />
                            <p className={styles.card_description}>
                                Xác thực trạng thái hoạt động giúp chỗ ở của bạn được ưu tiên hiển thị trên bản đồ.
                            </p>
                            <div className={styles.payment_section}>
                                <div className={styles.price_row}>
                                    <span className={styles.price_amount}>51.200 VNĐ</span>
                                    <span className={styles.price_period}> / tháng</span>
                                </div>
                                <div className={styles.qr_wrap}>
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=BusinessVerification51200"
                                        alt="QR thanh toán hoạt động" className={styles.qr_img} />
                                </div>
                                <p className={styles.payment_note}>Quét mã để thanh toán và xác thực hoạt động</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
