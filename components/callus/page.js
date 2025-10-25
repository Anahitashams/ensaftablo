"use client";

import { useState } from "react";

import { FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";



function CallUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
    dir="rtl"
    className="flex flex-col md:flex-row justify-center px-5 pb-10 bg-gray-50 dark:bg-gray-900"
  >
    <div className="w-full sm:w-[50%] h-full md:w-[70%] lg:w-[50%] overflow-hidden flex flex-col rounded-3xl items-center md:items-start justify-around bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl p-6">
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="sm:flex sm:flex-row sm:w-full gap-6">
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-700 font-semibold mb-1">نام:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="rounded-xl px-4 py-2 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-700 font-semibold mb-1">نام خانوادگی:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="rounded-xl px-4 py-2 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
  
        <div className="sm:flex sm:flex-row sm:w-full gap-6">
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-700 font-semibold mb-1">آدرس:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="rounded-xl px-4 py-2 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-700 font-semibold mb-1">ایمیل:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-xl px-4 py-2 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
  
        <div className="w-full">
          <label className="text-sm text-gray-700 font-semibold mb-1 block">پیام:</label>
          <textarea
            placeholder="متن خود را وارد کنید"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-[150px] rounded-xl px-4 py-2 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>
  
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-xl font-medium shadow-md transition-colors"
          >
            ثبت
          </button>
        </div>
      </form>
    </div>
  
    <div className="md:mr-10 mt-10 space-y-6">
      <ul className="space-y-6">
        <li className="bg-white dark:bg-gray-800 border border-blue-200 shadow-md items-center p-4 rounded-xl flex gap-4">
          <span className="bg-blue-600 text-white w-[50px] h-[50px] flex justify-center items-center rounded-full">
            <FaPhone className="w-[25px] h-[25px]" />
          </span>
          <div>
            <div className="text-gray-700 dark:text-white font-semibold">تلفن تماس:</div>
            <div className="text-sm">0992068721</div>
          </div>
        </li>
  
        <li className="bg-white dark:bg-gray-800 border border-blue-200 shadow-md items-center p-4 rounded-xl flex gap-4">
          <span className="bg-blue-600 text-white w-[50px] h-[50px] flex justify-center items-center rounded-full">
            <IoLocationSharp className="w-[30px] h-[30px]" />
          </span>
          <div>
            <div className="text-gray-700 dark:text-white font-semibold">آدرس:</div>
            <div className="text-sm">البرز - کرج - عظیمیه</div>
          </div>
        </li>
  
        <li className="bg-white dark:bg-gray-800 border border-blue-200 shadow-md items-center p-4 rounded-xl flex gap-4">
          <span className="bg-blue-600 text-white w-[50px] h-[50px] flex justify-center items-center rounded-full">
            <TfiEmail className="w-[25px] h-[25px]" />
          </span>
          <div>
            <div className="text-gray-700 dark:text-white font-semibold">ایمیل:</div>
            <div className="text-sm">ensafanTablo@gmal.com</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  
  );
  
}

export default CallUs;
