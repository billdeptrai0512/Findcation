import { useEffect } from "react";
import { useListing } from "../listingContext";
import styles from "./location.module.css";


export default function PublicToggle() {

    const { listing , editLocationPublic} = useListing()

    useEffect(() => {   

    }, [listing])

    const checked = listing.location.public

    return (

        <div className={styles.public_options}>
            <div >
                <h2 style={{marginBottom: 0, fontSize: "1.175rem"}}>Công khai địa chỉ</h2>
                <p style={{ fontSize: "0.875rem", color: "#6A6A6A"}}>Mặc định chỉ hiển thị vị trí của staycation trên bản đồ.</p>
            </div>
            <label className={styles.toggle}>
                <input type="checkbox" checked={checked} onChange={() => editLocationPublic()}/>
                <span className="slider"> </span>
            </label>
        </div>
                

    )
}
