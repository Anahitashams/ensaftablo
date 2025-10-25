import React from "react";
import Image from "next/image";

function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8 mt-20">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">درباره ما</h1>
        <p dir="rtl" className="text-lg text-gray-600 max-w-2xl">
          در دنیای مدرن تبلیغات، دیده شدن در مکان مناسب می‌تواند تفاوت بزرگی در
          رشد و موفقیت کسب‌وکارها ایجاد کند. [انصاف تابلو] با هدف تسهیل فرآیند
          رزرو آنلاین بیلبورد، راهی سریع، شفاف و کارآمد را برای برندها،
          استارتاپ‌ها و شرکت‌ها فراهم کرده است. با پلتفرم ما، می‌توانید به صدها
          موقعیت تبلیغاتی برتر در سراسر کشور دسترسی داشته باشید، قیمت‌ها را
          مقایسه کنید و در چند کلیک ساده بیلبورد خود را رزرو کنید – بدون واسطه،
          بدون دردسر!
        </p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="bg-gray-50 rounded-2xl shadow-lg p-6 text-center">
          <Image
            src="/img/best-billboard-design.jpg"
            alt=""
            width={250}
            height={250}
            className="rounded-lg mx-auto mb-4"
          />
          <p className="text-gray-500">
            دسترسی به بیلبوردهای متنوع و استراتژیک
          </p>
        </div>
        <div className="bg-gray-50 rounded-2xl shadow-lg p-6 text-center">
          <Image
            src="/img/bilboard-takhasosi.webp"
            alt=""
            width={250}
            height={250}
            className="rounded-lg mx-auto mb-4"
          />
          <p className="text-gray-500">
            {" "}
            رزرو سریع و آنلاین بدون نیاز به تماس‌های متعدد
          </p>
        </div>
        <div className="bg-gray-50 rounded-2xl shadow-lg p-6 text-center">
          <Image
            src="/img/bill.jpg"
            alt=""
            width={250}
            height={250}
            className="rounded-lg mx-auto mb-4"
          />

          <p className="text-gray-500">
            شفافیت کامل در قیمت‌گذاری و اطلاعات دقیق موقعیت‌ها
          </p>
        </div>
      </section>
    </div>
  );
}
export default About;