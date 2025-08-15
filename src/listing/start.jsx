import styles from "./listing.module.css"

export default function StartPage() {
    return (
        <div className={styles.pageContent}>
            <h1>Bắt đầu trên Findcation rất đơn giản</h1>
            <section className={styles.start_content_section} style={{borderBottom: "1px solid #ccc"}}>
                <div className={styles.number}>1</div>
                <div className={styles.intrustion} >
                    <h2>Thông tin cơ bản </h2>
                    <h3>Đặt tên và chọn loại chổ ở mà bạn cho thuê.</h3>
                </div>
            </section>
            <section className={styles.start_content_section} style={{borderBottom: "1px solid #ccc"}}>
                <div className={styles.number}>2</div>
                <div className={styles.intrustion} >
                    <h2>Hình ảnh và tiện ích</h2>
                    <h3>Thêm 3 - 5 ảnh và đánh dấu những tiện nghi sở hữu.</h3>
                </div>
            </section>
            <section className={styles.start_content_section}>
                <div className={styles.number}>3</div>
                <div className={styles.intrustion}>
                    <h2>Xuất hiện trên bản đồ</h2>
                    <h3>Công khai vị trí, giá thuê và thông tin liên lạc.</h3>
                </div>
            </section>
        </div>
    )
}