"use client";
import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import Tablo from "../data/Tablo";
import Card from "../mediacard/Card";

function Mydata({ filteredData, filterPrice }) {
  const getRandomItems = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomTablo = getRandomItems(Tablo, 8);
  console.log("filterPrice:", filterPrice);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const offset = currentPage * itemsPerPage;
  const currentItems = Tablo.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="w-[95%] m-auto  ">
      <div className="w-full flex flex-row-reverse items-center justify-around">
        <h2 className="text-right w-[40%] sm:w-[15%] md:w-[20%] 2xl:w-[12%]  ">
          پیشنهادی های این ماه
        </h2>
        <hr className="border-slate-600 w-[50%] sm:w-[85%] md:w-[77%] 2xl:w-[88%] h-[1px]" />
      </div>

      <Card myfilter={randomTablo} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={Math.ceil(Tablo.length / itemsPerPage)}
        previousLabel="< "
        containerClassName="pagination flex  justify-center mt-8 space-x-2"
        activeClassName="bg-blue-700 text-white rounded-lg px-3 py-1"
        pageClassName="px-3 py-1 bg-blue-300 rounded-lg text-blue-100 hover:bg-blue-200"
        previousClassName="px-3 py-1 rounded-full bg-gray-300  hover:bg-blue-200 "
        nextClassName="px-3 py-1 rounded-full bg-gray-300 hover:bg-blue-200 "
      />

      <Card
        myfilter={filterPrice && Array.isArray(filterPrice) ? filterPrice : []}
      />
    </div>
  );
}

export default Mydata;
