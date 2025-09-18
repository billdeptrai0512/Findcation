// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import styles from "./listing.module.css"


export default function StartPage() {
    return (
        <motion.div className={styles.pageContent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            >
                <h1>Bắt đầu trên Findcation rất đơn giản</h1>
                <section className={styles.start_content_section} style={{borderBottom: "1px solid #ccc"}}>
                    <div className={styles.number}>1</div>
                    <div className={styles.intrustion} >
                        <h2>Đặt tên và chọn loại chổ ở mà bạn cho thuê.</h2>
                    </div>
                </section>
                <section className={styles.start_content_section} style={{borderBottom: "1px solid #ccc"}}>
                    <div className={styles.number}>2</div>
                    <div className={styles.intrustion} >
                        <h2>Thêm 3 - 5 ảnh và đánh dấu những tiện nghi sở hữu.</h2>
                    </div>
                </section>
                <section className={styles.start_content_section} style={{borderBottom: "1px solid #ccc"}}>
                    <div className={styles.number}>3</div>
                    <div className={styles.intrustion} >
                        <h2>Cài đặt định vị, giá thuê và thông tin liên lạc.</h2>
                    </div>
                </section>
                <section className={styles.start_content_section}>
                    <div className={styles.number}>4</div>
                    <div className={styles.intrustion}>
                        <h2>Xuất hiện trên bản đồ</h2>
                    </div>
                </section>
        </motion.div>
    )
}