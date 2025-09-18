import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Images({ listing }) {
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const isUnder400px = useMediaQuery({ query: '(max-width: 400px)' });

  return (
    <div style={{ margin: "0 auto", maxWidth: isUnder400px ? "300px" : "400px", maxHeight: "250px", padding: "16px ", minWidth: "200px",}}>
      {/* Image Slider */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrent(swiper.activeIndex)}
        loop={false}
        style={{ width: "100%", borderRadius: "16px", position: "relative" }}
      >
        {listing.images.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              maxHeight: "250px",
              minHeight: "250px",
              height: "100%",
            }}
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
              alt={`image-${index}`}
              style={{ width: "100%", objectFit: "cover", borderRadius: "16px" }}
            />
          </SwiperSlide>
        ))}

        {/* Dots inside the Swiper */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "3px",
            background: "rgba(0,0,0,0.4)",
            padding: "4px 8px",
            borderRadius: "12px",
            zIndex: 2,
          }}
        >
          {listing.images.map((_, index) => (
            <span
              key={index}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: index === current ? "#333" : "#bbb",
                display: "inline-block",
              }}
            />
          ))}
        </div>
      </Swiper>

      {/* Custom Controls (under image) */}



      
    </div>
  );
}
