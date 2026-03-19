import { differenceInDays } from 'date-fns';
import { useState } from "react";
import { ChevronUp, ChevronDown, ShieldCheck, CircleCheck, Ban } from 'lucide-react';
import styles from "./preview.module.css";

const getTrustColor = (score) => {
    if (score < 50) return "#4b5563";
    if (score < 75) return "#2563eb";
    if (score < 90) return "#059669";
    return "#d97706";
};

export default function TrustScore({ staycation }) {

    const [expand, setExpanded] = useState(false);

    return (

        <div className={styles.detail_card}>
            <div
                onClick={() => setExpanded((prev) => !prev)}
                className={styles.detail_card_header}
                style={{ cursor: "pointer", justifyContent: "space-between", marginBottom: expand ? "12px" : "0" }}
            >
                <div style={{ display: "flex", gap: "6px" }}>
                    <ShieldCheck size={20} strokeWidth={2} />
                    <h2 className={styles.detail_card_title}>Điểm uy tín</h2>
                </div>
                <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                    <span style={{
                        fontSize: "12px", fontWeight: 700,
                        background: getTrustColor(staycation.trustScore),
                        color: "white",
                        borderRadius: "4px",
                        padding: "2px 6px",
                        lineHeight: "1.6",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.25)"
                    }}>
                        {staycation.trustScore}
                    </span>
                    {!expand && <ChevronDown size={20} strokeWidth={1.5} />}
                </div>
            </div>

            {expand === true && (
                <ul style={{ listStyle: "none", padding: "0 2px", margin: 0 }}>
                    {[
                        { text: "Xác thực thông tin liên hệ", verified: staycation.contactsVerified },
                        { text: "Xác thực địa chỉ", verified: staycation.addressVerified },
                        { text: "Xác thực hình ảnh", verified: staycation.imagesVerified },
                        ...(staycation.active === true ? [{
                            text: `Đã hoạt động được ${differenceInDays(new Date(), new Date(staycation.subscriptionStartedAt))} ngày`,
                            verified: true
                        }] : [{
                            text: `Chưa kích hoạt điểm uy tín`,
                            verified: false
                        }])
                    ].map((item, index, arr) => (
                        <li key={index} style={{
                            fontSize: "0.975rem",
                            padding: "12px 0",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "var(--text-secondary)",
                            borderBottom: index < arr.length - 1 ? "1px solid var(--border-light)" : "none"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", opacity: item.verified ? 1 : 0.6 }}>
                                {item.verified ? (
                                    <CircleCheck size={16} strokeWidth={2.5} color={"#059669"} />
                                ) : (
                                    <Ban size={16} strokeWidth={2.5} color={"#dc2626"} />
                                )}
                                <span style={{ textDecoration: item.verified ? "none" : "line-through" }}>
                                    {item.text}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {expand === true && (
                <div onClick={() => setExpanded((prev) => !prev)}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer",
                        paddingTop: "12px",
                        color: "var(--text-tertiary)"
                    }}>
                    <ChevronUp size={20} strokeWidth={1.5} />
                </div>
            )}
        </div>

    );

}
