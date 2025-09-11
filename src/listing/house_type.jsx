import { House, DoorOpen } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { useListing } from "./listingContext"
import styles from "./listing.module.css"
import { CircleMinus, CirclePlus } from "lucide-react"

export default function TypeOfHouse() {

    const {listing, uploadType} = useListing()
    const { setStepValidity, currentStep } = useOutletContext();
    const [numberOfRoom, setNumberOfRoom] = useState(1)

    useEffect(() => {
        setStepValidity((prev) => ({
          ...prev,
          [currentStep]: listing.type !== ""
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing.type]);

    const decreaseNumberOfRoom = () => {

        if (numberOfRoom === 1) return

        setNumberOfRoom(number => number - 1)

    }

    return (
        <div className={styles.pageContent}>
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

                {listing.type === "room" && (
                    <div style={{display:"flex", justifyContent: "space-between", margin: "12px", padding: "12px",  borderRadius: "8px", alignItems: "center",
                        boxShadow : "rgb(34, 34, 34) 0px 0px 0px 2px"
                    }}>
                        <h2 style={{margin: "4px 0", fontSize: "1.125rem", color: "#000000"}}>Số lượng:</h2>
                        <div style={{display:"flex", justifyContent: "space-between", gap:"16px", alignItems: "center"}}>
                            <CircleMinus onClick={() => decreaseNumberOfRoom()} color= {numberOfRoom === 1 ? "#B0B0B0" : "#6A6A6A"}
                                size={35} strokeWidth={1} style={{ cursor: "pointer" }}/>
                            <p style={{color: "#000000"}}>{numberOfRoom}</p>
                            <CirclePlus onClick={() => setNumberOfRoom((number) => number + 1)}
                                size={35} color="#6A6A6A" strokeWidth={1} style={{ cursor: "pointer" }}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}