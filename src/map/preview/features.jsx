
import { useState } from "react";
import { featureIconMap } from "../../assets/featureIcons";
import { ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import styles from "./preview.module.css";

export default function Features({ staycation }) {

    const [expand, setExpanded] = useState(true);

    return (

        <div className={styles.detail_card}>
            <div
                onClick={() => setExpanded((prev) => !prev)}
                className={styles.detail_card_header}
                style={{ cursor: "pointer", marginBottom: expand ? "12px" : "0" }}
            >
                <Sparkles size={20} strokeWidth={2} />
                <h2 className={styles.detail_card_title}>Tiện nghi</h2>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
                    {!expand && <span style={{ fontSize: "0.9rem", color: "var(--text-tertiary)" }}>{staycation.features.length}</span>}
                    {!expand && <ChevronDown size={20} strokeWidth={1.5} />}
                </div>
            </div>

            {expand === true && staycation.features.map((feature, index) => (
                <div key={index}
                    style={{
                        fontSize: "0.975rem",
                        padding: "12px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "var(--text-secondary)",
                        borderBottom: index < staycation.features.length - 1 ? "1px solid var(--border-light)" : "none"
                    }}
                >
                    <span>{feature}</span>
                    <span>{featureIconMap[feature]}</span>
                </div>

            ))}

            {expand === true &&

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

            }

        </div>

    );


}
