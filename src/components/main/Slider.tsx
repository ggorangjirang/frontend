"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./styles.css";
import SwiperCore from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

// import required modules

export default function Slider() {
  SwiperCore.use([Navigation, Autoplay]);
  return (
    <Swiper
      navigation={true}
      pagination={true}
      loop={true} // 슬라이드 루프
      autoplay={true}
      spaceBetween={50} // 슬라이스 사이 간격
      slidesPerView={1} // 보여질 슬라이스 수
      modules={[Navigation, Pagination, Autoplay]}
    >
      <SwiperSlide className="swiper-slide">
        <Image src={"/slides/slide1.png"} alt="slide1" width={1140} height={420} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={"/slides/slide2.png"} alt="slide2" width={1140} height={420} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={"/slides/slide3.png"} alt="slide3" width={1140} height={420} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={"/slides/slide4.png"} alt="slide4" width={1140} height={420} />
      </SwiperSlide>
    </Swiper>
  );
}
