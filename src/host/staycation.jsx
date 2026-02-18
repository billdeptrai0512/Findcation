import { useParams, useNavigate } from "react-router-dom";
import { useHost } from "./hostContext";
import { ChevronRight } from "lucide-react";
import styles from "./host.module.css"
import DeleteButton from "./footer/delete";

export default function Staycation() {

    const navigate = useNavigate();
    const { host } = useHost()
    const { staycationId } = useParams();

    const staycation = host?.staycations.find(
        (s) => s.id === parseInt(staycationId, 10)
    );

    const totalImage = () => {
        if (!staycation) return 0;

        const defaultImages = Array.isArray(staycation.images) ? staycation.images.length : 0;

        const roomImages = Array.isArray(staycation.rooms)
            ? staycation.rooms.reduce((total, room) => {
                const count = Array.isArray(room.images) ? room.images.length : 0;
                return total + count;
            }, 0)
            : 0;

        return defaultImages + roomImages;
    }

    if (!staycation) return null;

    return (
        <div className={styles.pageContent}>

            <div className={styles.staycation_card} onClick={() => navigate(`title`)}>
                <div className={styles.staycation_card_row}>
                    <div>
                        <span className={styles.staycation_card_label}>Tiêu đề</span>
                        <div className={styles.staycation_card_value}>
                            {staycation.name}
                        </div>
                    </div>
                    <ChevronRight size={20} color="#6A6A6A" />
                </div>
            </div>

            <div className={styles.staycation_card} onClick={() => navigate(`images`)}>
                <div className={styles.staycation_cover}>
                    {staycation.images?.[0] && (
                        <img
                            src={`${import.meta.env.VITE_IMAGEKIT_URL}${staycation.images[0]}`}
                            alt="cover"
                            className={styles.staycation_cover_img}
                        />
                    )}
                </div>
                <div className={styles.staycation_card_details}>
                    <div className={styles.staycation_card_info}>
                        <span>{totalImage()} hình ảnh</span>
                        <ChevronRight size={18} />
                    </div>
                </div>
            </div>



            {/* Cover Image Card */}


            {/* Info Cards */}

            <div className={styles.staycation_card} onClick={() => navigate(`type`)}>
                <div className={styles.staycation_card_row}>
                    <div>
                        <span className={styles.staycation_card_label}>Cho thuê</span>
                        <div className={styles.staycation_card_value}>
                            {staycation.type === "room" ? `${staycation.numberOfRoom} phòng riêng` : `Toàn bộ căn nhà`}
                        </div>
                    </div>
                    <ChevronRight size={20} color="#6A6A6A" />
                </div>
            </div>

            <div className={styles.staycation_card} onClick={() => navigate(`prices`)}>
                <div className={styles.staycation_card_row}>
                    <div>
                        <span className={styles.staycation_card_label}>Bảng giá</span>
                        <div className={styles.staycation_card_value}>
                            {formatPrice(staycation.prices.min)} ~ {formatPrice(staycation.prices.max)}
                        </div>
                    </div>
                    <ChevronRight size={20} color="#6A6A6A" />
                </div>
            </div>

            <div className={styles.staycation_card} onClick={() => navigate(`features`)}>
                <div className={styles.staycation_card_row}>
                    <div>
                        <span className={styles.staycation_card_label}>Tiện nghi</span>
                        <div className={styles.staycation_card_value}>
                            Đang có {staycation.features.length}
                        </div>
                    </div>
                    <ChevronRight size={20} color="#6A6A6A" />
                </div>
            </div>

            <div className={styles.staycation_card} onClick={() => navigate(`location`)}>
                <div className={styles.staycation_card_row}>
                    <div>
                        <span className={styles.staycation_card_label}>Vị trí</span>
                        <div className={styles.staycation_card_value}>
                            {`${staycation.location.details.street}, ${staycation.location.details.ward}, ${staycation.location.details.city}`}
                        </div>
                    </div>
                    <ChevronRight size={20} color="#6A6A6A" />
                </div>
            </div>

        </div>
    );
}

const formatPrice = (price) => {
    if (!price) return "";
    return parseInt(price, 10).toLocaleString("vi-VN") + "đ";
};

