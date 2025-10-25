"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import Tablo from "../data/Tablo";
import Card from "../mediacard/Card";

function Searchdata({ filteredData }) {
  return (
    <>
      <div className="w-[95%] m-auto  ">
        <div className="w-full flex items-center justify-around">
          <h2 className="text-center w-[40%] sm:w-[15%] 2xl:w-[12%] ">
            {" "}
            جستجو{" "}
          </h2>
          <hr className="border-slate-600 w-[50%] sm:w-[85%] 2xl:w-[88%] h-[1px]" />
        </div>
        {filteredData.length === 0 ? (
          <div className="w-[350px] h-[70px] m-auto mt-5 ">
            <p className="text-center text-[24px] border border-black ">
              موردی یافت نشد
            </p>
          </div>
        ) : (
          <Swiper
            className="w-full "
            spaceBetween={10}
            slidesPerView={1}
            freeMode={true}
            grabCursor={true}
            autoplay={false}
            breakpoints={{
              320: { slidesPerView: 1.25 },
              640: { slidesPerView: 2 },
              700: { slidesPerView: 1.75 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 2.5 },
              1536: { slidesPerView: 3 },
            }}
          >
            {filteredData.map((mamad) => (
              <SwiperSlide className="" key={mamad.id}>
                <Card myfilter={[mamad]} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}

export default Searchdata;
