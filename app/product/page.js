"use client";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Tablo from "../../components/data/Tablo";
import Card from "../../components/mediacard/Card";

function Page() {
  // State برای مدیریت داده‌ها و صفحه فعلی
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; // تعداد آیتم‌ها در هر صفحه



  // محاسبه داده‌های صفحه فعلی
  const offset = currentPage * itemsPerPage;
  const currentItems = Tablo.slice(offset, offset + itemsPerPage);

  // تابع برای تغییر صفحه
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="mt-16 mb-5">
      {/* نمایش داده‌های صفحه فعلی */}
      <Card myfilter={currentItems} />

      {/* Pagination Component */}
      <ReactPaginate
        
        breakLabel="..."
        nextLabel="بعدی >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={Math.ceil(Tablo.length / itemsPerPage)}
        previousLabel="< قبلی"
        containerClassName="pagination flex justify-center mt-8 space-x-2"
        activeClassName="bg-blue-500 text-white rounded-full px-3 py-1"
        pageClassName="px-3 py-1 rounded-full hover:bg-blue-200"
        previousClassName="px-3 py-1 rounded-full hover:bg-blue-200"
        nextClassName="px-3 py-1 rounded-full hover:bg-blue-200"
      />
    </div>
  );
}

export default Page;
