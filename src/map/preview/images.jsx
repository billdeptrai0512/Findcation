import { Swiper, SwiperSlide } from "swiper/react";
import { CircleChevronLeft , CircleChevronRight } from 'lucide-react';
import "swiper/css";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Images({ listing }) {
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

  console.log(listing.images)

  return (
    <div style={{ margin: "1rem auto", maxWidth: isMobile ? "300px" : "400px", maxHeight: isMobile ? "200px" : "260px", width: "100%"}}>
      {/* Image Slider */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrent(swiper.activeIndex)}
        loop={false}
        style={{
            width: "100%",
            borderRadius: "8px",
            alignItems: "center",
        }}
        >
        {listing.images.map((image, index) => (
            <SwiperSlide key={index} style={{display: "flex", minHeight: "200px"}}>
            <img
                src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
                alt={`image-${index}`}
                style={{
                width: "100%",
                maxHeight: "300px",
                justifyContent: "center",
                objectFit: "contain",
                borderRadius: "8px",
                display: "flex",
                }}
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
