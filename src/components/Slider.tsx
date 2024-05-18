import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import slide1 from "@/assets/slide1.jpg";
import slide2 from "@/assets/slide2.jpg";
import slide3 from "@/assets/slide3.jpg";
import Image from "next/image";

const SliderComponent = () => {
  return (
    <div className="swiper-container my-5">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="">
          <Image
            className="mx-auto"
            src={slide1}
            height={500}
            width={900}
            sizes="50vw"
            alt="set logo"
          ></Image>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide flex items-center justify-center">
          <Image
            className="mx-auto"
            src={slide2}
            height={500}
            width={900}
            sizes="50vw"
            alt="set logo"
          ></Image>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide flex items-center justify-center">
          <Image
            className="mx-auto"
            src={slide3}
            height={500}
            width={900}
            sizes="50vw"
            alt="set logo"
          ></Image>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderComponent;
