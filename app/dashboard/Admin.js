"use client";

import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import api from "../../components/Services/Confgaxios";

import { useRouter } from "next/navigation";
import Spin from "../../components/util/Spin";
import ProtectedLayout from "../ProtectedLayout";
import { UserContext } from "../../context/Context";
import RoleGuard from "../RoleGuard";
import List from "./List";
// Dynamic import برای غیرفعال کردن SSR برای کامپوننت نقشه
const DatadashbordNoSSR = dynamic(() => import("./Datadashbord"), {
  ssr: false,
});
function Admin() {
  const [event, setEvent] = useState("create");
  const exitHandler = async () => {
    try {
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            nonce: generateNonce(),
          },
          withCredentials: true,
        }
      );
      localStorage.removeItem("accessToken");
      setAccessToken(null);
      setUserRole(null);
      router.push("/auth");
    } catch (error) {
      console.error("خطا در خروج:", error);
      alert("خطایی در خروج رخ داد");
    }
  };

  return (
    <>
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
        <li>
          <button
            href="#"
            className={`inline-flex items-center px-4 py-3 rounded-lg ${
              event === "create"
                ? "text-white bg-blue-700"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            } w-full`}
            aria-current="page"
            onClick={() => setEvent("create")}
          >
            ثبت تابلو
          </button>
        </li>
        <li>
          <button
            onClick={() => setEvent("List")}
            href="#"
            className={`inline-flex items-center px-4 py-3 rounded-lg ${
              event === "List"
                ? "text-white bg-blue-700"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            } w-full`}
          >
            لیست تابلوها
          </button>
        </li>
        <li>
          <button
            href="#"
            className={`inline-flex items-center px-4 py-3 rounded-lg ${
              event === "reseve"
                ? "text-white bg-blue-700"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            } w-full`}
            onClick={() => setEvent("reseve")}
          >
            رزرو شده
          </button>
        </li>
        <li>
          <button
            href="#"
            className={`inline-flex items-center px-4 py-3 rounded-lg ${
              event === "accept"
                ? "text-white bg-blue-700"
                : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            } w-full`}
            onClick={() => setEvent("accept")}
          >
            تایید شده
          </button>
        </li>
        <li>
          <button
            onClick={exitHandler}
            className="inline-flex cursor-pointer items-center px-4 py-3 text-red-400 rounded-lg bg-gray-50 w-full"
          >
            خروج
          </button>
        </li>
      </ul>
      {event === "create" && <DatadashbordNoSSR />}
      {event === "List" && <List />}
    </>
  );
}

export default Admin;
