"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import api from "../Services/Confgaxios";
import toast, { Toaster } from "react-hot-toast";
import Otpform from "./Otpform";

function Phoneforme() {
  const [phone, setPhone] = useState("");
  const [regtest, setRegtest] = useState(false);
  const [zeronine, setZeronine] = useState(false);
  const [display, setDisplay] = useState(true);
  const [loader, setLoader] = useState(false);

  const regex = /^09\d{9}$/g;
  const zero = /^(?!09)/;

  useEffect(() => {
    setRegtest(regex.test(phone));
    if (phone === "" || phone === "0") {
      setZeronine(false);
    } else {
      setZeronine(zero.test(phone));
    }
  }, [phone]);

  const submitHandler = (event) => {
    event.preventDefault();

    setLoader(true);
    const sendSms = async () => {
      try {
      const res = await api.get(`getNumberAndSnedSms?phoneNumber=${phone}`);
      res.status == 200
        ? toast.success("پیام با موفقیت ارسال شد") && setDisplay(false)
        : toast.error("خطا در ارسال کد لطفا دوباره امتحان کنید");
      } catch (error) {
      console.error("Error:", error);
      } finally {
      setLoader(false);
      }
    };

    sendSms();
  };

  return (
    <>
      <Toaster />
      <Otpform setdisplay={`${display ? "hidden" : "flex"}`} phone={phone} />
  
      <div
        className={`min-h-screen w-full ${
          display ? "flex" : "hidden"
        } items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4 font-vazir`}
      >
        <div className="w-full max-w-md transform transition-all duration-500">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Decorative header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 w-full"></div>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-blue-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  لطفا شماره همراه خود را وارد کنید
                </h2>
                <p className="mt-2 text-gray-500 text-sm">
                  کد تایید به این شماره ارسال خواهد شد
                </p>
              </div>
  
              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <div className="relative">
                    <input
                      inputMode="numeric"
                      placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                      className={`w-full h-14 px-4 pr-12 text-center rounded-xl border-2 ${
                        zeronine ? "border-red-300" : "border-gray-200 focus:border-blue-500"
                      } bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                      type="text"
                      value={phone}
                      maxLength="11"
                      onChange={(e) => setPhone(e.target.value)}
                    />
               
                  </div>
                  <p
                    className={`mt-2 text-right text-sm text-red-600 transition-all duration-300 ${
                      zeronine ? "opacity-100 h-5" : "opacity-0 h-0"
                    }`}
                  >
                    شماره تلفن باید با ۰۹ شروع شود
                  </p>
                </div>
  
                <button
                  type="submit"
                  disabled={!regtest}
                  className={`w-full h-14 rounded-xl text-lg font-medium text-white transition-all duration-300 ${
                    regtest 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-200"
                      : "bg-gray-300 cursor-not-allowed"
                  } flex items-center justify-center`}
                >
                  {loader ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-3 border-white border-r-transparent rounded-full animate-spin"></div>
                      در حال ارسال...
                    </>
                  ) : (
                    "ارسال کد تایید"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  

}

export default Phoneforme;
