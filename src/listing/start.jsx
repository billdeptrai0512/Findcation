import styles from "./listing.module.css"

export default function StartPage() {
    return (
        <div className={styles.pageContent}>
            <h1>Bắt đầu trên Findcation rất dễ dàng</h1>
            <section className={styles.contentSection}>
                <h2>1</h2>
                <div className={styles.intrustion} style={{paddingBottom: "32px", borderBottom: "1px solid #ccc"}}>
                    <h2>Thông tin cơ bản </h2>
                    <p>Đặt tên và chọn loại chổ ở mà bạn cho thuê.</p>
                </div>
            </section>
            <section className={styles.contentSection}>
                <h2>2</h2>
                <div className={styles.intrustion} style={{paddingBottom: "32px", borderBottom: "1px solid #ccc"}}>
                    <h2>Hình ảnh và tiện nghi</h2>
                    <p>Thêm từ 3 - 5 ảnh và đánh dấu những tiện ích sở hữu.</p>
                </div>
            </section>
            <section className={styles.contentSection}>
                <h2>3</h2>
                <div className={styles.intrustion}>
                    <h2>Xuất hiện trên bản đồ</h2>
                    <p>Cài đặt địa chỉ, vị trí, giá thuê và thông tin liên lạc của bạn.</p>
                </div>
            </section>
        </div>
    )
}