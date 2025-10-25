"use client";
import React, { useState, useEffect, useContext } from "react";
import { OtpInput } from "reactjs-otp-input";
import { IoMdTime } from "react-icons/io";
import { useRouter } from "next/navigation";
import api from "../Services/Confgaxios";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/Context";

function Otpform({ setdisplay, phone }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(120);
const {setAccessToken}=useContext(UserContext)
  const handleChange = (inputOtp) => {
    setOtp(inputOtp);
  };

  const verifyOtp = async () => {
    if (otp.length !== 4) {
      toast.error("لطفاً کد ۴ رقمی را کامل وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(
        "verifycode",
        {
          phoneNumber: phone,
          code: otp,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.accessToken) {
        setAccessToken(res.data.accessToken); // اینجا از context استفاده کنید
        router.push("/dashboard");
      } else {
        toast.error("خطا در احراز هویت، لطفاً مجدداً تلاش کنید");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(
        error.response?.data?.message || "کد وارد شده معتبر نیست"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    if (count > 0) return;

    setCount(120);
    // Add your resend code logic here
    toast.success("کد جدید ارسال شد");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;
  return (
    <>
      <Toaster />
      <div className={`m-auto ${setdisplay} h-screen w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 font-vazir`}>
        <div className="mt-20 flex h-[600px] w-full max-w-md flex-col items-center rounded-t-[50px] bg-primary shadow-xl">
          <div className="mt-12 flex w-[90%] items-start justify-center">
            <h3 className="text-lg font-medium text-secondary">{`کد تایید به شماره ${phone} ارسال شد`}</h3>
          </div>
          
          <div className="mt-8 flex w-[90%] justify-center">
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={4}
              inputStyle={{
                width: "60px",
                height: "60px",
                margin: "15px",
                fontSize: "24px",
                borderRadius: "12px",
                border: "2px solid #E2E8F0",
                backgroundColor: "#FFFFFF",
                color: "#1E293B",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              focusStyle={{
                border: "2px solid #6366F1",
                outline: "none",
                boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.3)",
              }}
              containerStyle={{
                justifyContent: "center",
              }}
            />
          </div>
  
          <div className="mt-6 flex w-full max-w-xs justify-between px-6">
            <div className="flex items-center">
              <a href="/auth" className="group flex items-center">
                <p className="text-sm text-blue-400 transition-colors duration-200 group-hover:text-blue-600">
                  ویرایش شماره
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 transition-colors duration-200 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </a>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <IoMdTime className="h-5 w-5 text-secondary" />
              <h1 className="text-blue-400">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </h1>
              <button 
                onClick={handleResendCode}
                disabled={count > 0}
                className={`text-sm ${count > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-secondary hover:text-blue-600'}`}
              >
                دریافت مجدد کد
              </button>
            </div>
          </div>
          
          <div className="mt-12">
            <button
              onClick={verifyOtp}
              disabled={loading || otp.length !== 4}
              className={`flex h-14 w-64 items-center justify-center rounded-2xl shadow-md transition-all duration-300 ${
                loading || otp.length !== 4 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              <p className="text-xl font-medium text-white">
                {loading ? (
                  <span className="flex items-center">
                    <svg className="ml-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    در حال ورود ...
                  </span>
                ) : "ارسال کد"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otpform;