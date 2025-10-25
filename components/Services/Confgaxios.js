'use client'

import axios from "axios";


const api=axios.create({baseURL:"http://localhost:9000/"})

export default api;




// اول درخواست رو با شماره تلفن ارسال کردم
// event.preventDefault();

// setLoader(true);
// const sendSms = async () => {
//   try {
//   const res = await api.get(`getNumberAndSnedSms?phoneNumber=${phone}`);
//   res.status == 200
//     ? toast.success("پیام با موفقیت ارسال شد") && setDisplay(false)
//     : toast.error("خطا در ارسال کد لطفا دوباره امتحان کنید");
//   } catch (error) {
//   console.error("Error:", error);
//   } finally {
//   setLoader(false);
//   }
// };

// sendSms();




// بعد اینجا توکن ثبت کردم ک داخل ریداکس ثبت میشه 
// setOtp(inputOtp); // تنظیم OTP در حالت محلی
// if (inputOtp.length === 4) {
//   setLoading(true);
//   api
//     .post(
//       "verifycode",
//       {
//         phoneNumber: phone,
//         code: inputOtp,
//       },
//       {
//         withCredentials: true,
//       }
//     )
//     .then((res) => {
//       const accessToken = res.data.accessToken; // دریافت توکن از پاسخ API

//       if (accessToken) {
//         // فراخوانی Action setToken با استفاده از توکن دریافتی
//         dispatch(setToken(accessToken));
//           router.push("/dashboard");
//         // ذخیره توکن در حالت محلی (اختیونی)
//         setAccesstoken(accessToken);
//       } else {
//         console.error("Access Token not found in API response:", res.data);
//         alert("خطا: توکن دسترسی در پاسخ API وجود ندارد!");
//       }
//     })
//     .catch((error) => {
//       console.error("Error verifying OTP:", error);
//       toast.error("کد وارد شده ن ا معتبر است");
//     });
// }
// };



// و اینجا هم رفرش توکن ثبت میشه 
// useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (accessToken) {
//       api
//         .get("isvalidtoken", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             nonce: Math.round(Math.random() * 8),
//           },
//           withCredentials: true,
//         })
//         .then((res) => {
//           if (res.status === 200) {
//             localStorage.setItem("accessToken", res.data.accessToken);
//             setLoading(false); // احراز هویت موفقیت‌آمیز است و بارگذاری تمام شده است
//           }
//         })
//         .catch((error) => {
//           if (
//             error.response &&
//             (error.response.status === 401 || error.response.status === 403)
//           ) {
//             api
//               .post(
//                 "/refresh-token",
//                 {}, // ارسال body خالی (اگر داده‌ای ندارید)
//                 {
//                   headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                   },
//                   withCredentials: true,
//                 }
//               )
//               .then((res) => {
//                 if (res.status === 200) {
//                   localStorage.setItem("accessToken", res.data.accessToken);
//                   setLoading(false); // احراز هویت موفقیت‌آمیز است
//                 }
//               })
//               .catch((error) => {
//                 console.error("Error refreshing token:", error);
//                 router.push("/auth"); // هدایت به صفحه احراز هویت در صورت خطا
//               });
//           } else {
//             console.error("Error validating token:", error);
//             router.push("/auth"); // هدایت به صفحه احراز هویت در صورت خطا
//           }
//         });
//     } else {
//       router.push("/auth"); // اگر توکن موجود نیست، به صفحه احراز هویت برو
//     }
//   }, [router]);