"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/Context";

function Header() {
  const { accessToken } = useContext(UserContext);
  const [buttonText, setButtonText] = useState("ورود و ثبت نام");

  useEffect(() => {
    setButtonText(accessToken ? "داشبورد" : "ورود و ثبت نام");
  }, [accessToken]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 shadow-md h-[70px] flex justify-between items-center px-6 sm:px-16" dir="rtl">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/img/logo.png" height={48} width={48} alt="لوگو" />
        <span className="hidden sm:inline-block text-xl font-bold text-blue-900">انصاف تابلو</span>
      </Link>
  
      <nav className="hidden sm:flex gap-6 text-sm font-medium text-blue-800">
        <Link href="/" className="hover:text-blue-900 hover:underline transition-all duration-200">
          صفحه اصلی
        </Link>
        <Link href="/product" className="hover:text-blue-900 hover:underline transition-all duration-200">
          همه محصولات
        </Link>
        <Link href="/callus" className="hover:text-blue-900 hover:underline transition-all duration-200">
          تماس با ما
        </Link>
        <Link href="/about" className="hover:text-blue-900 hover:underline transition-all duration-200">
          درباره ما
        </Link>
      </nav>
  
      <Link
        href={accessToken ? "/dashboard" : "/auth"}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl shadow-md transition-all duration-200 text-sm font-semibold"
      >
        {buttonText}
      </Link>
    </header>
  );
  
}

export default Header;
