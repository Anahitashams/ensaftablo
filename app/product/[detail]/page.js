"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Tablo from "../../../components/data/Tablo";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../../../components/mediacard/Card";
import "swiper/css";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { IoLocationSharp } from "react-icons/io5";
import { ImQrcode } from "react-icons/im";
import { GrMapLocation } from "react-icons/gr";
import { GiFilmProjector } from "react-icons/gi";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { GiPathDistance } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Shop from "../../buypage/page";

function MapComponent({ lat, lng, address }) {
  const customIcon = new L.Icon({
    iconUrl: "/img/location.png",
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const MapComponentDynamic = dynamic(
    () => import("../../../components/MapComponent"),
    {
      ssr: false,
      loading: () => <p>Loading Map...</p>,
    }
  );

  return (
    <div
      dir="rtl"
      className=" relative rounded my-5 md:my-0 h-[350px] w-[75%]  md:w-[260px]  
     md:mt-0 border border-solid border-[#8b8a8a] m-auto  -z-50 md:mr-8 lg:h-[400px] lg:mt-10   "
    >
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            {address}
            <IoLocationSharp />
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
export default function Page() {
  const [dis, setDis] = useState(true);
  const router = useRouter();
  const params = useParams();

  const detail = Tablo.filter((nil) => nil.id == params.detail);
  const mytype = Tablo.filter(
    (shayan) => shayan.mediatype == detail[0].mediatype
  );

  const reserveHandler = () => {
    router.push("/product/" + detail[0].id + "/" + detail[0].id);
    setDis(false);
  };

  const [dateRange, setDateRange] = useState([null, null]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [monthsDifference, setMonthsDifference] = useState(0);

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);

    // اگر تاریخ شروع و پایان انتخاب شده باشند، قیمت را محاسبه کنید
    if (newDateRange[0] && newDateRange[1]) {
      const startDate = dayjs(newDateRange[0]);
      const endDate = dayjs(newDateRange[1]);

      const months = endDate.diff(startDate, "month");
      setMonthsDifference(months);

      const price = detail[0]?.price || 0;

      const calculatedTotalPrice = price * months;
      setTotalPrice(calculatedTotalPrice);
    } else {
      setTotalPrice("لطفاً تاریخ‌ها را انتخاب کنید.");
    }
  };

  function PriceInput() {
    const [price, setPrice] = useState("");
    const [isValid, setIsValid] = useState(true);

    const validatePrice = (value, myprice) => {
      const numValue = parseInt(value.replace(/,/g, ""), 10);
      setIsValid(numValue >= myprice || value === "");
    };

    const handleChange = (e, price) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value === "") {
        setPrice("");
        setIsValid(true);
        return;
      }

      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      setPrice(value);
      validatePrice(value, price);
    };

    return (
      <div className="flex mt-10 flex-row justify-center  items-center  w-full">
        {detail.map((item) => (
          <label
            key={item.id}
            className="flex justify-center items-center flex-col w-full"
          >
            قیمت پیشنهادی برای تابلو :
            <input
              className={`w-[80%] border mt-3 rounded p-1 ${
                isValid ? "border-gray-400" : "border-red-500"
              }`}
              type="text"
              value={price}
              onChange={(e) => handleChange(e, item.price)}
              placeholder={`حداقل این تابلو ${item.price}`}
            />
            {!isValid && (
              <span className="text-red-500 text-sm">
                قیمت باید بالای {item.price.toLocaleString()} تومان باشد.
              </span>
            )}
          </label>
        ))}
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Shop display={dis ? "hidden" : "flex"} detail={detail[0]} />
      {detail.map((tablo) => (
        <div
          dir="rtl"
          key={tablo.id}
          className="flex justify-center flex-col md:flex-row lg:flex-row items-center lg:w-[100%] w-[75%] m-auto mt-20"
        >
          <div className="lg:flex">
            {/*  عکس بیلبورد */}
            <div className="">
              <Image
                src={tablo.avatar}
                alt={tablo.mediatype}
                className="rounded w-[360px] h-[350px] mb-3 lg:h-[500px] lg:w-[450px] lg:mt-10"
                height={400}
                width={400}
              />
            </div>

            <div className="flex flex-col w-[100%] lg:w-[60%] md:h-[500px] justify-center items-center md:mt-10">
              <p className="flex bg-blue-100 w-[100%] lg:w-[80%] h-[70px] pr-3 rounded items-center relative">
                <span className="pr-10"> کد تابلو : {tablo.id} </span>
                <ImQrcode className="absolute top-3 text-blue-800 size-6 " />
              </p>
              <p className="flex bg-blue-100 w-[100%] lg:w-[80%] h-[70px] mt-3 pr-3 rounded items-center relative">
                <span className="pr-10 md:pr-0 ml-2 md:mr-8 ">
                  {" "}
                  استان / شهر :{" "}
                </span>
                <GrMapLocation className="absolute top-3 text-blue-800 size-6 " />
                <span className="bg-gray-100 px-1 py-1 rounded ml-1 font-bold text-[14px]">
                  {tablo.city}
                </span>
                -
                <span className="bg-gray-100 px-3 py-1 rounded mr-1 font-bold text-[14px]">
                  {tablo.province}
                </span>
              </p>
              <p className="flex bg-blue-100 w-[100%] lg:w-[80%] h-[70px] mt-3 pr-3 rounded items-center relative">
                <span className="pr-10 ml-2 "> نوع رسانه : </span>
                <span className="bg-gray-100 px-3 py-1 rounded mr-2 font-bold text-[14px]">
                  {tablo.mediatype}
                </span>
                <GiFilmProjector className="absolute top-3 text-blue-800 size-6 " />
              </p>
              <p className="flex bg-blue-100 w-[100%] lg:w-[80%] h-[70px] mt-3 pr-3 rounded items-center relative">
                <span className="pr-10 ml-2 "> ابعاد : </span>
                <span className="pr-3"> {tablo.size} </span>
                <TfiRulerAlt2 className="absolute top-3 text-blue-800 size-6 " />
              </p>
              <p className="flex bg-blue-100 w-[100%] lg:w-[80%] h-[70px] mt-3 pr-3 rounded items-center relative">
                <span className="pr-10 ml-2 "> قیمت : </span>
                <span className="">
                  {tablo.price.toLocaleString("fa-IR")} میلیون تومان
                </span>
                <GiMoneyStack className="absolute top-3 text-blue-800 size-6 " />
              </p>

              <p className="flex h-[110px] bg-blue-100 w-[100%] lg:w-[80%] mt-3 pr-3 rounded items-center relative">
                <GiPathDistance className="absolute top-12 text-blue-800 size-6 " />
                <span className="pr-10 ml-2 "> آدرس: </span>
                <span className=""> {tablo.address} </span>
              </p>
            </div>
          </div>
          <div className="lg:flex">
            {/* نقشه */}
            <MapComponent
              className="z-10 md:w-[100%] absolute "
              lat={tablo.lat}
              lng={tablo.lng}
              address={tablo.address}
            />
            {/* تقویم */}
            <div className="w-[300px] h-[450px] md:mr-5 lg:mr-14 md:mt-10 border border-solid md:w-[280px] md:h-[500px] bg-blue-100 rounded">
              <div className="persian-date-picker m-auto fixed ">
                <div className="mt-5 absolute z-10 top-0 right-6">
                  <label className="flex flex-row justify-center">
                    تاریخ شروع:
                    <DatePicker
                      className="w-[50%] relative z-50  rounded mr-2 px-2"
                      calendar={persian}
                      locale={persian_fa}
                      format="YYYY/MM"
                      onlyMonthPicker={true}
                      value={dateRange[0]}
                      onChange={(date) =>
                        handleDateChange([date, dateRange[1]])
                      }
                      placeholder="تاریخ شروع"
                    />
                  </label>
                </div>
                <div className="mt-5 absolute z-0 top-12">
                  <label className="flex flex-row justify-center  mr-7 ">
                    تاریخ پایان:
                    <DatePicker
                      className="w-[51.5%] rounded mr-2 px-2"
                      calendar={persian}
                      locale={persian_fa}
                      format="YYYY/MM"
                      onlyMonthPicker={true}
                      value={dateRange[1]}
                      onChange={(date) =>
                        handleDateChange([dateRange[0], date])
                      }
                      placeholder="تاریخ پایان"
                    />
                  </label>
                </div>

                <div className="flex flex-row justify-center w-full pt-32">
                  <div className="flex items-center justify-end w-[50%] ">
                    قیمت:
                  </div>
                  <div className="w-full flex justify-center">
                    <span className="flex justify-start bg-gray-100 p-1 rounded">
                      {totalPrice.toLocaleString("fa-IR")} میلیون تومان
                    </span>
                  </div>
                </div>

                <PriceInput />
                <div className="flex justify-center mt-36 ">
                  <button
                    onClick={reserveHandler}
                    className="bg-blue-800 w-[150px] h-8 text-white rounded"
                  >
                    {" "}
                    ثبت{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <h3 className="flex justify-center mt-10"> بیلبورد های مشابه </h3>

      {/*   سوییپر    */}
      <div className="flex  justify-center my-10 ">
        <Swiper
          dir="rtl"
          className="w-full"
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            920: {
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
          }}
        >
          {mytype.map((x) => (
            <SwiperSlide className="w-full" key={x.id}>
              <Card myfilter={[x]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
