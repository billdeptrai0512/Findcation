import { useState } from "react"
import { House, DoorOpen, MapPin } from "lucide-react"
import styles from "./listing.module.css"
import Header from "./header"
import Footer from "./footer"
import RegisterMap from "./location/addressMap"
import LocationListing from "./location/main"

export default function Listing() { // PageContent

    //form listing context 
    //page - step - direction 


    return (
        <div className={styles.listingContainer}>
            <Header />

            {/* { renderStartPage() } */}
            <LocationListing />
            {/* { renderLocationOfHouse() } */}
            <Footer />
        </div>   
    )
}
// air bnb ask for title after asking for image
// title + type of house / address + location 

const renderStartPage = () => {
    return (
        <div className={styles.pageContent}>
            <h1>Bắt đầu trên Findcation rất dễ dàng</h1>
            <section className={styles.contentSection}>
                <h2>1</h2>
                <div className={styles.intrustion} style={{paddingBottom: "32px", borderBottom: "1px solid #ccc"}}>
                    <h2>Thông tin cơ bản của home</h2>
                    <p>như là tên, địa chỉ và số lượng khách có thể ở tại đó.</p>
                </div>
            </section>
            <section className={styles.contentSection}>
                <h2>2</h2>
                <div className={styles.intrustion} style={{paddingBottom: "32px", borderBottom: "1px solid #ccc"}}>
                    <h2>Càng chi tiết càng nổi bật</h2>
                    <p>Thêm từ 3 ảnh trở lên cùng những tiện ích mô tả – tụi mình sẽ giúp bạn thực hiện.</p>
                </div>
            </section>
            <section className={styles.contentSection}>
                <h2>3</h2>
                <div className={styles.intrustion}>
                    <h2>Xuất hiện lên bản đồ</h2>
                    <p>Chọn giá khởi điểm, xác minh một vài thông tin, sau đó đăng mục cho thuê của bạn.</p>
                </div>
            </section>
        </div>
    )
}

const renderTitlePage = () => { //max 32 words

    return (
        <div className={styles.pageContent}>
            <h1 style={{marginBottom: "4px"}}>Đầu tiên, hãy đặt tên cho chổ ở của bạn</h1>
            <div className={styles.intrustion} style={{paddingBottom: "24px", color: "#6A6A6A"}}>
                Tên ngắn gọn có hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay đổi sau.
            </div>
            <textarea className={styles.textarea} rows={5}></textarea>
            <div className={styles.words_limit} >
                0 / 32
            </div>
        </div>
    )
}

const renderTypeOfHouse = () => { // 2 options: house or apartment

    //TODO - Click behaivor - style border -> boxShadow
    return (
        <div className={styles.pageContent}>
            <h1 style={{marginBottom: "4px"}}>Khách sẽ được sử dụng loại chổ ở nào?</h1>
            <div className={styles.house_type_box}>
                <div className={styles.house_type_option}>
                    <div>
                        <h4>Toàn bộ nhà</h4>
                        <p>Khách được sử dụng riêng toàn bộ chổ ở này</p>
                    </div>
                    <House size={32} className={styles.house_type_icon} />
                </div>
                <div className={styles.house_type_option}>
                    <div>
                        <h4>Một căn phòng</h4>
                        <p>Khách sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung</p>
                    </div>
                    <DoorOpen size={32} className={styles.house_type_icon} />
                </div>
            </div>
        </div>
    )
}
