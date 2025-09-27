// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import { useListing } from "./listingContext"
import { CircleMinus, CirclePlus, House, DoorOpen } from "lucide-react"
import styles from "./listing.module.css"

export default function TypeOfHouse() {

    const {listing, uploadType, uploadNumberOfRoom} = useListing()
    const { setStepValidity, currentStep } = useOutletContext();
    useEffect(() => {
        setStepValidity((prev) => ({
          ...prev,
          [currentStep]: listing.type !== ""
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing.type]);

    const decreaseNumberOfRoom = () => {

        if (listing.numberOfRoom === 1) return;

        uploadNumberOfRoom(listing.numberOfRoom - 1);

    };

    return (
        <motion.div className={styles.pageContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <h1 style={{marginBottom: "4px", fontSize: "1.68rem"}}>Khách sẽ được sử dụng loại chổ ở nào?</h1>
            <div className={styles.house_type_box}>
                <div className={styles.house_type_option} onClick={() => uploadType("house")} 
                    style={{boxShadow: listing.type === "house" && "rgb(34, 34, 34) 0px 0px 0px 2px"}}>
                    <div>
                        <h2>Toàn bộ căn nhà</h2>
                        <div>Khách được sử dụng riêng toàn bộ chổ ở này</div>
                    </div>
                    <House size={32} className={styles.house_type_icon} />
                </div>
                <div className={`${styles.house_type_option}`} onClick={() => uploadType("room")}
                    style={{boxShadow: listing.type === "room" && "rgb(34, 34, 34) 0px 0px 0px 2px"}}>
                    <div>
                        <h2>Phòng riêng</h2>
                        <div>Khách sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung</div>
                    </div>
                    <DoorOpen size={32} className={styles.house_type_icon} />
                </div>

                {/* depend how many room staycation have , we call api to create as much Rooms based on that staycationId */}
                {listing.type === "room" && (
                    <div style={{display:"flex", justifyContent: "space-between", margin: "12px", padding: "12px",  borderRadius: "8px", alignItems: "center",
                        boxShadow : "rgb(34, 34, 34) 0px 0px 0px 2px"
                    }}>
                        <h2 style={{margin: "4px 0", fontSize: "1.125rem", color: "#000000"}}>Số lượng:</h2>
                        <div style={{display:"flex", justifyContent: "space-between", gap:"16px", alignItems: "center"}}>
                            <CircleMinus onClick={() => decreaseNumberOfRoom()} color= {listing.numberOfRoom === 1 ? "#B0B0B0" : "#6A6A6A"}
                                size={35} strokeWidth={1} style={{ cursor: "pointer" }}/>
                            <p style={{color: "#000000"}}>{listing.numberOfRoom}</p>
                            <CirclePlus onClick={() => uploadNumberOfRoom(listing.numberOfRoom + 1)}
                                size={35} color="#6A6A6A" strokeWidth={1} style={{ cursor: "pointer" }}/>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}