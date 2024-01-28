import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getMissions } from "../services/missions";
import type { Doc } from "../types/apiTypes";

export function Carousel() {
  const [rockets, setRockets] = useState<Doc[]>();

  useEffect(() => {
    const getRockets = async () => {
      const response = await getMissions();
      setRockets(response);
    };
    getRockets();
  }, []);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {rockets?.map((rocket) => (
          <SwiperSlide
            key={rocket.name}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0, 0, 0, 0.39)",
              padding: "30px",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
            }}
          >
            <img
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              src={rocket.links.patch.small}
              alt={rocket.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
