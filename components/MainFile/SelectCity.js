"use client";
import { useState } from "react";
import Mydata from "../main/Mydata";
import Tablo from "../data/Tablo";
import Searchdata from "../main/Searchdata";
import Filterdata from "../main/Filterdata";

function SelectCity() {
  const [selectedCity, setSelectedCity] = useState("کرج");
  const [selectedMediaType, setSelectedMediaType] = useState("عرشه پل");
  const [filteredData, setFilteredData] = useState([]);
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [filterPrice, setFilterPrice] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // تابع فرمت‌بندی عدد به صورت سه رقم سه رقم
  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  function handleSearch() {
    const filteredData = Tablo.filter(
      (mamad) =>
        mamad.city === selectedCity && mamad.mediatype === selectedMediaType
    );

    const last = filteredData.slice(-10);
    console.log(last);
    setFilteredData(last);
    setIsDataVisible(true);
  }

  function handlePriceFilter() {
    const min = Number(minPrice.replace(/,/g, "")); // حذف کاما برای محاسبات
    const max = Number(maxPrice.replace(/,/g, "")); // حذف کاما برای محاسبات

    const filterPrice = Tablo.filter(
      (item) => item.price >= min && item.price <= max
    );

    setFilteredData(filterPrice);
    setIsDataVisible(true);
  }

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setIsDataVisible(false);
  };

  const handleMediaTypeChange = (e) => {
    setSelectedMediaType(e.target.value);
    setIsDataVisible(false);
  };

  return (
    <div dir="rtl" className="w-full px-4 sm:px-8">
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-xl rounded-3xl p-6 mt-20 mb-6 space-y-8 transition-all duration-300">
      
      {/* فیلتر شهر و رسانه */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="flex flex-col gap-2 w-full sm:w-[30%]">
          <label className="text-sm font-semibold text-blue-900 dark:text-white">انتخاب شهر</label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from(new Set(Tablo.map((m) => m.city))).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
  
        <div className="flex flex-col gap-2 w-full sm:w-[30%]">
          <label className="text-sm font-semibold text-blue-900 dark:text-white">انتخاب رسانه</label>
          <select
            value={selectedMediaType}
            onChange={handleMediaTypeChange}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from(new Set(Tablo.map((m) => m.mediatype))).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
  
        <button
          onClick={handleSearch}
          className="w-full sm:w-[150px] h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium shadow-md transition-colors"
        >
          جستجو
        </button>
      </div>
  
      <hr className="border-t border-gray-300 dark:border-gray-700 my-4" />
  
      {/* فیلتر قیمت */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="flex flex-col gap-2 w-full sm:w-[30%]">
          <label className="text-sm font-semibold text-blue-900 dark:text-white">حداقل قیمت</label>
          <input
            type="text"
            inputMode="numeric"
            value={minPrice}
            onChange={(e) => setMinPrice(formatNumber(e.target.value))}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="flex flex-col gap-2 w-full sm:w-[30%]">
          <label className="text-sm font-semibold text-blue-900 dark:text-white">حداکثر قیمت</label>
          <input
            type="text"
            inputMode="numeric"
            value={maxPrice}
            onChange={(e) => setMaxPrice(formatNumber(e.target.value))}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <button
          onClick={handlePriceFilter}
          className="w-full sm:w-[150px] h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium shadow-md transition-colors"
        >
          فیلتر قیمت
        </button>
      </div>
    </div>
  
    {isDataVisible && <Searchdata filteredData={filteredData} />}
    <Filterdata filterPrice={filterPrice} />
  </div>
  
  );
  
}

export default SelectCity;