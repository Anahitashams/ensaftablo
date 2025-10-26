import React from "react";

function User() {



  
  return (
    <>
      <li>
        <button
          className="inline-flex items-center px-4 py-3 rounded-lg bg-purple-700 text-white w-full"
          onClick={() => alert("پنل مدیریت")}
        >
          پنل مدیریت
        </button>
      </li>
      <li>
        <button
          className="inline-flex items-center px-4 py-3 rounded-lg bg-purple-100 text-purple-800 w-full"
          onClick={() => alert("گزارش‌گیری")}
        >
          گزارش‌ها
        </button>
      </li>
    </>
  );
}

export default User;
