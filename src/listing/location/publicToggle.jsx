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
                <h4 style={{marginBottom: 0}}>Công khai địa chỉ của home</h4>
                <p>Mặc định, bọn mình chỉ hiển thị vị trí của home trên bản đồ.</p>
            </div>
            <label className={styles.toggle}>
                <input type="checkbox" checked={checked} onChange={() => editLocationPublic()}/>
                <span className="slider"> </span>
            </label>
        </div>
                

    )
}
