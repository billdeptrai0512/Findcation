import { House, DoorOpen } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import { useListing } from "./listingContext"
import styles from "./listing.module.css"

export default function TypeOfHouse() {

    const {listing, uploadType} = useListing()
    const { setStepValidity, currentStep, setOpenSuggestions } = useOutletContext();

    useEffect(() => {
        setStepValidity((prev) => ({
          ...prev,
          [currentStep]: listing.type !== ""
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing.type]);

    return (
        <div className={styles.pageContent}>
            <h1 style={{marginBottom: "4px", fontSize: "1.68rem"}}>Khách sẽ được sử dụng loại chổ ở nào?</h1>
            <div className={styles.house_type_box}>
                <div className={styles.house_type_option} onClick={() => uploadType("house")} 
                    style={{boxShadow: listing.type === "house" && "rgb(34, 34, 34) 0px 0px 0px 2px"}}>
                    <div>
                        <h2>Toàn bộ nhà</h2>
                        <div>Khách được sử dụng riêng toàn bộ chổ ở này</div>
                    </div>
                    <House size={32} className={styles.house_type_icon} />
                </div>
                <div className={`${styles.house_type_option}`} onClick={() => uploadType("room")}
                    style={{boxShadow: listing.type === "room" && "rgb(34, 34, 34) 0px 0px 0px 2px"}}>
                    <div>
                        <h2>Một căn phòng</h2>
                        <div>Khách sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung</div>
                    </div>
                    <DoorOpen size={32} className={styles.house_type_icon} />
                </div>
                <div style={{display: "flex", justifyContent: 'flex-end'}}>
                    <button onClick={() => setOpenSuggestions(true)} className={styles.button} >
                        Bạn có câu hỏi ?
                    </button>
                </div>
            </div>
        </div>
    )
}