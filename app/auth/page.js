"use client";

import React, { useEffect } from "react";
import Phoneforme from "../../components/Logins/Phoneforme";
import useAuth from "../../components/util/Auth";
import Spin from "../../components/util/Spin";
function page() {
  // const { isLoading, isAuthenticated } = useAuth(); // استفاده از useAuth در داخل تابع کامپوننت

  // if (isLoading) {
  //   return <><Spin/></>; // نمایش لودینگ تا زمان اتمام احراز هویت
  // }

  // if (!isAuthenticated) {
  //   window.location.href = "/auth"; // در صورتی که کاربر احراز هویت نشده باشد
  //   return <div>Redirecting to authentication...</div>; // نمایش پیام ریدایرکت
  // }

  return (
    <section className="max-w-[600px] m-auto flex justify-center items-center">
      <Phoneforme />
    </section>
  );
}

export default page;
