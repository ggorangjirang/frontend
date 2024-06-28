"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./styles.css";
import SwiperCore from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

// import required modules

export default function Slider() {
  const router = useRouter();
  SwiperCore.use([Navigation, Autoplay]);

  const onClickHandler = (productId: number) => {
    router.push(`/products?productId=${productId}`);
  };

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
        <div onClick={() => onClickHandler(48)}>
          <Image src={"/slides/slide1.avif"} alt="slide1" width={1140} height={420} />
        </div>
      </SwiperSlide>
      <SwiperSlide onClick={() => onClickHandler(82)}>
        <Image src={"/slides/slide2.avif"} alt="slide2" width={1140} height={420} />
      </SwiperSlide>
      <SwiperSlide onClick={() => onClickHandler(2)}>
        <Image src={"/slides/slide3.avif"} alt="slide3" width={1140} height={420} />
      </SwiperSlide>
      <SwiperSlide onClick={() => onClickHandler(71)}>
        <Image src={"/slides/slide4.avif"} alt="slide4" width={1140} height={420} />
      </SwiperSlide>
    </Swiper>
  );
}
