"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
function Card({ myfilter }) {
  console.log(myfilter);
  return (
    <div className="w-full flex flex-wrap justify-center gap-6 px-4 py-6">
    {myfilter.map((card) => (
      <Link
        href={`/product/${card.id}`}
        key={card.id}
        className="w-80 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
      >
        <Image
          className="w-full h-52 object-cover rounded-t-3xl"
          src={card.avatar}
          alt={card.mediatype}
          width={1500}
          height={1500}
        />
  
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="flex flex-wrap justify-center gap-2 mb-2 text-xs font-medium">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {card.province} / {card.city}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {card.size}
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              {card.mediatype}
            </span>
          </div>
  
          <div className="flex flex-wrap justify-center gap-2 text-xs mb-3">
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
              روشنایی: {card.light}
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
              ارگان: {card.owner}
            </span>
          </div>
  
          <p className="text-center text-sm text-gray-600 mb-2">{card.address}</p>
  
          <p className="text-center text-lg font-semibold text-blue-700 mb-4">
            {card.price.toLocaleString("fa-IR")} تومان
          </p>
  
          <div className="w-full flex justify-center">
            <button className="text-white rounded-xl h-9 w-32 bg-blue-600 hover:bg-blue-700 transition-colors">
              جزئیات
            </button>
          </div>
        </div>
      </Link>
    ))}
  </div>
  
  );
}

export default Card;
