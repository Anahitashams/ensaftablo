"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Tablo from "../../../../components/data/Tablo";
function page() {
  const params = useParams();

  const myfilter = Tablo.filter((f) => f.id === params.cart);


  
  return (
    <>
      {" "}
      <div
        dir="rtl"
        className={`mt-40  flex-row justify-center items-start flex-wrap`}
      >
        <div className=" lg:w-[50%]  h-[200px] border border-gray-300  rounded-lg flex flex-col justify-start items-start ">
          <h1 className="font-bold text-[18px] px-6 py-3">سبد خرید شما</h1>
          <div className="flex flex-row justify-center items-center">
            <Image
              className="size-28 mt-[2%] mr-[6%] "
              alt="buy"
              src="/img/pic24.jpg"
              width="250"
              height="250"
            ></Image>
            <div className="flex flex-col ">
              <p className="w-[98%] text-start text-[15px] px-2">
                بلوار شهید بهشتی، نرسیده به میدان شهرداری
              </p>
              <h2 className="text-green-600 my-3 w-[40%] text-end">{""}</h2>
            </div>
          </div>
        </div>

        <div className="sm:w-full lg:w-[40%] lg:max-w-md bg-slate-400 lg:mr-4">
          <div
            dir="rtl"
            class=" bg-white border border-gray-200 p-4 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700"
          >
            <div class="flow-root">
              <ul
                role="list"
                class="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li class="py-3 sm:py-4">
                  <div class="flex items-center">
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        قیمت کالاها
                      </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {myfilter[0].price}
                    </div>
                  </div>
                </li>
                <li class="py-3 sm:py-4">
                  <div class="flex items-center ">
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        جمع سبد خرید
                      </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      295,000
                    </div>
                  </div>
                </li>
                <li class="py-3 sm:py-4">
                  <div class="flex items-center">
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-medium  text-blue-500 truncate dark:text-white">
                        سود شما از خرید
                      </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-blue-500 dark:text-white">
                      45,000
                    </div>
                  </div>
                </li>
                <li class="pt-3 pb-0 sm:pt-4 flex justify-center">
                  <button
                    type="button"
                    class=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    ثبت سفارش
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
