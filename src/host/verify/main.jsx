import { useParams, useNavigate } from "react-router-dom";
import { Eye, Zap, MapPin, Phone, ChevronDown, ChevronUp, Mail } from "lucide-react";
import styles from "./verify.module.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHost } from "../hostContext";
import Contacts from "./contacts";

export default function VerifyStaycation() {
    const navigate = useNavigate();
    const { staycationId } = useParams();
    const { host } = useHost();

    const [openCard, setOpenCard] = useState(null); // |'contact' | 'address' | 'business'
    const [emailCode, setEmailCode] = useState("");
    const [codeSent, setCodeSent] = useState(false);

    const staycation = host?.staycations.find(s => s.id === parseInt(staycationId));

    if (!staycation) return null;

    const address = staycation.location?.details;
    const addressString = address
        ? `${address.street}, ${address.ward}, ${address.city}`
        : "Chưa có địa chỉ";

    const toggle = (card) => setOpenCard(prev => prev === card ? null : card);

    return (
        <div className={styles.pageContent}>
            {/* Page Title */}
            <div className={styles.page_header}>
                <h1 className={styles.page_title}>Xác thực</h1>
                <p className={styles.page_subtitle}>Chứng minh bạn là chủ staycation và thông tin liên hệ là của bạn</p>
            </div>

            {/* ── Card 1: Địa chỉ & Liên hệ ── */}
            <div className={styles.section_card}>
                <div className={styles.card_header} onClick={() => toggle("contact")}>
                    <div className={styles.card_header_left}>
                        <div className={styles.card_icon_box}>
                            <Phone size={18} />
                        </div>
                        <div>
                            <span className={styles.card_title}>Thông tin liên hệ</span>
                            <div className={styles.card_badges}>
                                <span className={styles.status_badge_unverified}>Chưa xác thực</span>

                            </div>
                        </div>
                    </div>
                    <div className={styles.card_chevron}>
                        {openCard === "contact" ? <ChevronUp size={18} color="#6A6A6A" /> : <ChevronDown size={18} color="#6A6A6A" />}
                    </div>
                </div>

                <AnimatePresence>
                    {openCard === "contact" && (
                        <motion.div
                            className={styles.card_body}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className={styles.card_body_scroll}>
                                <div className={styles.divider} />

                                {/* ── Sub-section: Contacts ── */}
                                <div className={styles.sub_section}>
                                    <div className={styles.sub_label_row} style={{ justifyContent: "center" }}>
                                        <Mail size={15} color="#6A6A6A" />
                                        <span className={styles.email_address}>{host.email}</span>
                                    </div>

                                    <div className={styles.email_action_box}>

                                        <Contacts setOpenContactEditor={() => { }} />

                                        <button
                                            className={styles.send_code_btn}
                                            onClick={() => setCodeSent(true)}
                                        >
                                            Tạo mã
                                        </button>
                                        <div className={styles.email_row}>

                                        </div>
                                        {/* flow
                                        1. send code to host email // to their social media 
                                        2. host receive email and use their social media to send code to Findcation fanpage or instagram or zalo
                                        3. host input code */}
                                        {/* {!codeSent ? (
                                       
                                        ) : (
                                            <div className={styles.code_input_row}>
                                                <input
                                                    className={styles.code_input}
                                                    type="text"
                                                    placeholder="Mã 6 chữ số"
                                                    maxLength={6}
                                                    value={emailCode}
                                                    onChange={e => setEmailCode(e.target.value)}
                                                />
                                                <button className={styles.confirm_code_btn}>
                                                    Xác nhận
                                                </button>
                                            </div>
                                        )} */}
                                    </div>

                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* we use websocket to automate confirm payment from host. */}

            {/* ── Card 2: Địa chỉ ── */}
            <div className={styles.section_card}>
                <div className={styles.card_header} onClick={() => toggle("address")}>
                    <div className={styles.card_header_left}>
                        <div className={styles.card_icon_box}>
                            <MapPin size={18} />
                        </div>
                        <div>
                            <span className={styles.card_title}>Địa chỉ</span>
                            <div className={styles.card_badges}>
                                <span className={styles.status_badge_unverified}>Chưa xác thực</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card_chevron}>
                        {openCard === "address" ? <ChevronUp size={18} color="#6A6A6A" /> : <ChevronDown size={18} color="#6A6A6A" />}
                    </div>
                </div>

                <AnimatePresence>
                    {openCard === "address" && (
                        <motion.div
                            className={styles.card_body}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className={styles.sub_divider} />


                            {/* ── Sub-section: Address ── */}
                            <div className={styles.sub_section}>
                                <div className={styles.sub_label_row} style={{ justifyContent: "center" }}>
                                    {/* <MapPin size={18} /> */}
                                    <span className={styles.email_address} style={{ maxWidth: "80%", textAlign: "center" }}>{addressString}</span>
                                </div>

                                <div className={styles.payment_box}>
                                    <div className={styles.payment_price_row}>
                                        <span className={styles.payment_price}>512.000 VNĐ</span>
                                        <span className={styles.payment_price_note}>· một lần</span>
                                    </div>
                                    <div className={styles.qr_wrap}>
                                        <img
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=AddressVerification512000"
                                            alt="QR thanh toán địa chỉ"
                                            className={styles.qr_img}
                                        />
                                    </div>
                                    <p className={styles.payment_note}>Findcation sẽ đến để xác thực địa chỉ staycation của bạn.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Card 2: Đang hoạt động ── */}
            <div className={styles.section_card}>
                <div className={styles.card_header} onClick={() => toggle("business")}>
                    <div className={styles.card_header_left}>
                        <div className={styles.card_icon_box}>
                            <Zap size={18} />
                        </div>
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
                        <motion.div
                            className={styles.card_body}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
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
                                    <img
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=BusinessVerification51200"
                                        alt="QR thanh toán hoạt động"
                                        className={styles.qr_img}
                                    />
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
