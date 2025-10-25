import React from "react";
import Image from "next/image";

function notfoud() {
  return (
    <div dir="rtl" className="w-[100%] h-[100%] flex flex-col">
      <div className="flex justify-center items-center flex-col">
        <Image
          alt="یافت نشد"
          src="/img/error.jpg"
          width="500"
          height="500"
          className="mt-32"
        ></Image>
        <h1>صفحه مورد نظر یافت نشد!</h1>
      </div>
    </div>
  );
}

export default notfoud;