import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Images({ listing }) {
  const swiperRef = useRef(null);
  const [, setCurrent] = useState(0);
  const isUnder400px = useMediaQuery({ query: '(max-width: 400px)' });

  return (
    <div style={{ margin: "0 auto", maxWidth: isUnder400px ? "300px" : "400px", maxHeight: "250px", padding: "16px 0 ", minWidth: "200px",}}>
      {/* Image Slider */}
      <Swiper onSwiper={(swiper) => (swiperRef.current = swiper)} onSlideChange={(swiper) => setCurrent(swiper.activeIndex)} loop={false} style={{ width: "100%", borderRadius: "16px"}}>
        {listing.images.map((image, index) => (
            <SwiperSlide key={index} style={{display: "flex", maxHeight: "250px", minHeight: "250px", height: "100%"}}>
            <img
                src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
                alt={`image-${index}`}
                style={{ width: "100%", objectFit: "contain"}}
            />
            </SwiperSlide>
        ))}
    </Swiper>   

      {/* Custom Controls (under image) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          height:"auto",
          marginTop: "8px",
        }}
      >
        {/* Prev Button */}
        {/* {!isMobile && (
            <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={current === 0}
                style={{
                    background: "white",
                    border: "none",
                    borderRadius: "50%",
                    cursor: current === 0 ? "not-allowed" : "pointer",
                    opacity: current === 0 ? 0.4 : 1,
                }}
                >
                <CircleChevronLeft size={35} strokeWidth={1.6}/>
            </button>
        )} */}


        {/* Dots */}
        {/* <div style={{ display: "flex", gap: "6px" }}>
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
        </div> */}

        {/* Next Button */}
        {/* {!isMobile && (
            <button
                onClick={() => swiperRef.current?.slideNext()}
                disabled={current === listing.images.length - 1}
                style={{
                    background: "white",
                    border: "none",
                    cursor:
                    current === listing.images.length - 1 ? "not-allowed" : "pointer",
                    opacity: current === listing.images.length - 1 ? 0.4 : 1,
                }}
                >
                <CircleChevronRight size={35} strokeWidth={1.6}/>
            </button>
        )} */}
      </div>


      
    </div>
  );
}
