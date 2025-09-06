import { useMediaQuery } from "react-responsive";
import { Plus } from "lucide-react"
import { useListing } from "../listingContext";
import React from "react"
import Photo from "./photo"
import styles from "./image.module.css"

export default function Area() {

    const { listing, uploadImages } = useListing()

    const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

    const getEmptySlotIndex = (length) => {
      if (length < 3) return 2
      if (length < 5) return 4
      if (length < 7) return 6
      return null
    }

    const renderPhoto = (index) => {

        const img = listing.images[index]
        const emptySlotIndex = getEmptySlotIndex(listing.images.length)

        // Cover photo
        if (index === 0) return <Photo image={img} cover={true} index={index} /> 
        
        // Empty slots
        if (index === emptySlotIndex && img === undefined) return renderEmptyLastImage(uploadImages) // empty with lasst

        return <Photo image={img} cover={false} index={index} />
    }
    
    const renderEmptyLastImage = (uploadImages) => {

        return (
            <div className={styles.empty}>
                <div className={`${styles.empty} ${styles.last_photo}`}>
                <label style={{ display: "block", width: "100%", height: "100%", cursor: "pointer" }}>
                    <input type="file" name="image" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => uploadImages(e.target.files)}/>
                    <div>
                        <Plus size={35} />
                        <span>Thêm ảnh</span>
                    </div>
                </label>
                </div>
            </div>
        )
    }

    if (isMobile) return (
        <div className={styles.pageContent}>
            <h1 style={{marginBottom: "4px", fontSize: "1.68rem"}}>Bạn có thể đăng tối đa 5 bức ảnh. </h1>
            <div className={styles.intrustion} style={{paddingBottom: "8px", color: "#6A6A6A"}}>
                Chọn ảnh đẹp nhất làm ảnh bìa. Về sau, bạn có thể đăng thêm hoặc thay đổi ảnh.
            </div>
            <div className={styles.mobile_images_area}>
                    
                {[...Array(6)].map((_, i) => (
                  <React.Fragment key={i}>{renderPhoto(i)}</React.Fragment>
                ))}

            </div>
        </div>
    )
    
    return (
      <div className={styles.pageContent}>
        <h1 style={{marginBottom: "4px"}}>Bạn có thể đăng tối đa 5 bức ảnh.</h1>
        <div className={styles.intrustion} style={{paddingBottom: "8px", color: "#6A6A6A"}}>
          Chọn ảnh đẹp nhất làm ảnh bìa. Về sau, bạn có thể đăng thêm hoặc thay đổi ảnh.
        </div>
    
        <div className={styles.images_area}>
          {renderPhoto(0)} {/* cover */}
    

          <div className={styles.group} >
            {renderPhoto(1)}
            {renderPhoto(2)}
          </div>

          {listing.images.length >= 3 && (
              <div className={styles.group} >
                {renderPhoto(3)}
                {renderPhoto(4)}
              </div>
          )}

          {listing.images.length >= 5 && (
            <div className={styles.group} >
              {renderPhoto(5)}
              {renderPhoto(6)}
            </div>
          )}

        </div>
      </div>
    );
}

