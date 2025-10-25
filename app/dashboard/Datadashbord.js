"use client";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { TileLayer, useMapEvents } from "react-leaflet";
import { FaLocationDot } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";
import toast, { Toaster } from "react-hot-toast";
import api from "../../components/Services/Confgaxios";
import { UserContext } from "../../context/Context";

// Dynamic import برای MapContainer
const MapContainerNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

function Datadashbord() {
  const { accessToken } = useContext(UserContext);
  const [center, setCenter] = useState([35.8327, 50.9915]);
  const [mapCenter, setMapCenter] = useState(center);
  const [formdata, setFormdata] = useState({
    city: "",
    size: "",
    address: "",
    price: "",
    mediaType: "",
    image: null,
    rewPrice: 0,
    isActive: true, // وضعیت
    description: "", // توضیحات
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "price") {
      const numericValue = value.replace(/[^\d]/g, "");

      const formatted = new Intl.NumberFormat("en-US").format(numericValue);

      setFormdata((prevData) => ({
        ...prevData,
        price: formatted,
        rawPrice: numericValue,
      }));
    } else {
      setFormdata((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const generateNonce = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (formdata.image && formdata.image.length > 0) {
      for (let i = 0; i < formdata.image.length; i++) {
        formData.append("avatar", formdata.image[i]);
      }
    } else {
      toast.error("لطفاً حداقل یک تصویر انتخاب کنید.");
      return;
    }

    // افزودن سایر اطلاعات فرم
    formData.append("province", formdata.province || "تهران"); // فرضی
    formData.append("city", formdata.city);
    formData.append("size", formdata.size);
    formData.append("address", formdata.address);
    formData.append("price", formdata.rewPrice);
    formData.append("mediatype", formdata.mediaType);
    formData.append("light", formdata.light || "دارد");
    formData.append("lat", parseFloat(mapCenter[0]));
    formData.append("lng", parseFloat(mapCenter[1]));
    formData.append("role", formdata.role || "any");
    formData.append("description", String(formdata.description || ""));
    formData.append("isActive", formdata.isActive ? "true" : "false");

    try {
      const res = await api.post("/createbilboard", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          nonce: generateNonce(),
        },
        withCredentials: true,
      });

      toast.success("تابلو با موفقیت ثبت شد");
      console.log("✅ res", res.data);
      setFormdata({
        city: "",
        size: "",
        address: "",
        price: "",
        mediaType: "",
        image: null,
        description: "",
        isActive: true,
      });

      setMapCenter([35.8327, 50.9915]);
      document.getElementById("image_upload").value = null;
    } catch (err) {
      console.error("❌ خطا در ارسال فرم:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("خطا در ارسال اطلاعات");
      }
    }
  };

  // ردیابی حرکت نقشه
  function LocationMarker() {
    useMapEvents({
      moveend: (e) => {
        const map = e.target;
        const newCenter = map.getCenter();
        setMapCenter([newCenter.lat, newCenter.lng]);
      },
    });
    return null;
  }

  return (
    <>
      <Toaster />
      <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          ثبت اطلاعات تابلو
        </h3>

        <form onSubmit={submitHandler} className="w-[50%]">
          <label className="block mt-7 mb-2 text-sm font-medium text-gray-900 ">
            لیست شهرها
          </label>
          <input
            type="text"
            id="city"
            onChange={handleChange}
            value={formdata.city}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="کرج"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            ابعاد
          </label>
          <input
            type="text"
            id="size"
            onChange={handleChange}
            value={formdata.size}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="6x2.5"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            آدرس{" "}
          </label>
          <input
            type="text"
            id="address"
            onChange={handleChange}
            value={formdata.address}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=" مثال: خیابان راه آهن، نرسیده به میدان بسیج "
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            قیمت{" "}
          </label>
          <input
            type="text"
            id="price"
            onChange={handleChange}
            value={formdata.price}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=" مثال: 25/000/000 میلیون تومان "
            required
          />

          <div className="relative">
            <MapContainerNoSSR
              center={center}
              zoom={17}
              className="w-full h-[300px] relative z-0"
              style={{ height: "300px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainerNoSSR>

            {/* پین ثابت در مرکز نقشه */}
            <div
              className="absolute left-1/2 top-[50%] z-10 transform -translate-x-1/2 -translate-y-full pointer-events-none"
              style={{ marginTop: "-20px" }}
            >
              <FaLocationDot size={30} color="red" />
            </div>
          </div>

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            نوع رسانه
          </label>
          <select
            id="mediaType"
            onChange={handleChange}
            value={formdata.mediaType}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">انتخاب کنید</option>
            <option value="استرابورد">استرابورد</option>
            <option value="بیلبورد">بیلبورد</option>
            <option value="پروژکتوری">پروژکتوری</option>
            <option value="بنر مناسبتی">بنر مناسبتی</option>
          </select>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              وضعیت تابلو
            </label>
            <button
              type="button"
              onClick={() =>
                setFormdata((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
              className={`px-4 py-2 rounded-lg text-white transition-all ${
                formdata.isActive ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {formdata.isActive ? "فعال" : "غیرفعال"}
            </button>
          </div>
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            توضیحات
          </label>
          <textarea
            id="description"
            onChange={handleChange}
            value={formdata.description}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            rows={3}
            placeholder="توضیحات اضافی درباره موقعیت، شرایط، یا ویژگی‌های تابلو"
          ></textarea>

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            آپلود عکس
          </label>
          <input
            type="file"
            id="image_upload"
            onChange={(e) =>
              setFormdata({ ...formdata, image: e.target.files })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            accept="image/*,video/mp4"
            required
            multiple
          />

          <button
            className="bg-blue-700 mt-7 text-white px-4 py-3 rounded-lg"
            type="submit"
          >
            ثبت اطلاعات
          </button>
        </form>
      </div>
    </>
  );
}

export default Datadashbord;
