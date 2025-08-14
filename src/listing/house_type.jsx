import { House, DoorOpen } from "lucide-react"
import { useListing } from "./listingContext"
import styles from "./listing.module.css"

export default function TypeOfHouse() {

    const {listing, uploadType} = useListing()

    return (
        <div className={styles.pageContent}>
            <h1 style={{marginBottom: "4px"}}>Khách sẽ được sử dụng loại chổ ở nào?</h1>
            <div className={styles.house_type_box}>
                <div className={styles.house_type_option} onClick={() => uploadType("house")} 
                    style={{boxShadow: listing.type === "house" && "rgb(34, 34, 34) 0px 0px 0px 2px"}}>
                    <div>
                        <h4>Toàn bộ nhà</h4>
                        <p>Khách được sử dụng riêng toàn bộ chổ ở này</p>
                    </div>
                    <House size={32} className={styles.house_type_icon} />
                </div>
                <div className={`${styles.house_type_option}`} onClick={() => uploadType("room")}
                    style={{boxShadow: listing.type === "room" && "rgb(34, 34, 34) 0px 0px 0px 2px"}}>
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