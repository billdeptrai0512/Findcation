import { useMediaQuery } from "react-responsive";
import { Plus } from "lucide-react"
import { useListing } from "../listingContext";
import React from "react"
import Photo from "./photo"
import styles from "./image.module.css"

export default function Area() {

    const { listing, uploadImages } = useListing()

    const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

    const renderPhoto = (index) => {

        const img = listing.images[index]

        // Cover photo
        if (index === 0) return <Photo image={img} cover={true} index={index} /> 
        
        // Empty slots
        if (index === listing.images.length  && img === undefined) return renderEmptyLastImage(uploadImages) // empty with lasst

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
                    
                {[...Array(listing.images.length + 1)].map((_, i) => (
                  <React.Fragment key={i}>{renderPhoto(i)}</React.Fragment>
                ))}

            </div>
        </div>
    )

    const count = listing.images.length;
    const pairCount = Math.floor(Math.max(0, count - 1) / 2); // full pairs after cover
    const hasLeftover = (count - 1) % 2 === 1;
    
    return (
      <div className={styles.pageContent}>
        <h1 style={{marginBottom: "4px"}}>Bạn có thể đăng tối đa 5 bức ảnh.</h1>
        <div className={styles.intrustion} style={{paddingBottom: "8px", color: "#6A6A6A"}}>
          Chọn ảnh đẹp nhất làm ảnh bìa. Về sau, bạn có thể đăng thêm hoặc thay đổi ảnh.
        </div>
    
        <div className={styles.images_area}>
          {renderPhoto(0)} {/* cover */}
    
          {/* groups: (1,2), (3,4), (5,6)... */}
          {Array.from({ length: pairCount }).map((_, i) => {
            const left = 1 + i * 2;
            const right = left + 1;
            return (
              <div className={styles.group} key={i}>
                {renderPhoto(left)}
                {renderPhoto(right)}
              </div>
            );
          })}
    
          {/* leftover single image (odd count) shows immediately */}
          {hasLeftover && (
            <div className={styles.group}>
              {renderPhoto(count - 1)}        {/* last actual image */}
              {renderPhoto(count + 1)}        {/* plain empty placeholder (NOT add) */}
            </div>
          )}
    
          {/* always keep 2 slots at the bottom: blank + add */}
          <div className={styles.group}>
            {renderPhoto(count + 1)}
            {renderPhoto(count)}      {/* blank placeholder */}
                {/* + Thêm ảnh */}   
                       
          </div>
        </div>
      </div>
    );
}

