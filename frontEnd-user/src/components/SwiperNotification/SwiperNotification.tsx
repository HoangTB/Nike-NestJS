import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./SwiperNotification.css";
import "swiper/css";
const SwiperNotification: React.FC = () => {
  return (
    <div className="swiper-resp">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        className="swiper-notification"
      >
        <SwiperSlide>New Styles on Sale: Up to 40% Off</SwiperSlide>
        <SwiperSlide>
          <span className="notification-link">
            Hello Nike App Download the app to access everything Nike. Get Your
            Great
          </span>
        </SwiperSlide>
        {/* Add more SwiperSlides for additional notifications */}
      </Swiper>
    </div>
  );
};

export default SwiperNotification;
