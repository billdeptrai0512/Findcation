import { useState, useEffect } from "react";
import { Ellipsis, Image } from "lucide-react"
import styles from "../../host.module.css"


export default function Photo({ image, cover, index, removeImage, addImage, arrangeImage }) {

    const [extend, setExtend] = useState(false)

    useEffect(() => {

        setExtend(false)

    }, [image])

    if (!image) return (
        <div className={styles.empty}>
            <label style={{ display: "block", width: "100%", height: "100%", cursor: "pointer" }}>
                <input type="file" name="image" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => addImage(e.target.files)} />
                <div >
                    <Image size={35} />
                </div>
            </label>
        </div>
    )

    return (
        <div style={{ position: "relative", width: "100%" }} >

            <img src={typeof image === "string" ? `${import.meta.env.VITE_IMAGEKIT_URL}${image}` : image.url} alt="" className={styles.photo} />

            {cover === true && <span className={styles.cover_photo}>Ảnh bìa </span>}

            <div tabIndex={0} onBlur={(e) => { if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) return setExtend(false) }}>

                <Ellipsis size={20} className={styles.ellipsis} onClick={() => setExtend(prev => !prev)} />

                {extend === true &&

                    <div tabIndex={0} className={styles.ellipsis} style={{ display: "flex", flexDirection: "column", alignItems: "start", padding: "16px", borderRadius: "8px", marginTop: "64px", gap: "16px" }}>

                        {cover === false && <span style={{ cursor: "pointer", width: "100%" }} onClick={() => arrangeImage(index)} > Đặt làm ảnh bìa </span>}

                        <span style={{ cursor: "pointer", width: "100%" }} onClick={() => removeImage(index)} >Xóa</span>

                    </div>
                }

            </div>
        </div>
    )
}
