"use client";

import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/Context.jsx";
import api from "../../../components/Services/Confgaxios.js";
import { Toaster } from "react-hot-toast";
import { TileLayer, useMapEvents } from "react-leaflet";
import dynamic from "next/dynamic";

import "mapbox-gl/dist/mapbox-gl.css";

export default function EditBillboard() {
  const { id } = useParams();
  const router = useRouter();
  const { accessToken } = useContext(UserContext);

  const [center, setCenter] = useState([35.8327, 50.9915]);

  const [mapCenter, setMapCenter] = useState(center);
  const [formData, setFormData] = useState({
    avatar: [],
    province: "",
    city: "",
    size: "",
    address: "",
    price: "",
    lat: "",
    lng: "",
    mediatype: "",
    light: "",
    description: "",
    isActive: true,
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MapWrapper = dynamic(() => import("../components/Mapwrapper.js"), {
    ssr: false,
  });

  //const MapContainerNoSSR = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });

  useEffect(() => {
    const fetchBillboard = async () => {
      try {
        const response = await api.get(`readonebilboard/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = response.data;


        console.log(data)
        setFormData({
          avatar: data.avatar || [],
          province: data.province || "",
          city: data.city || "",
          size: data.size || "",
          address: data.address || "",
          price: data.price || "",
          lat: data.lat || "",
          lng: data.lng || "",
          mediatype: data.mediatype || "",
          light: data.light || "",
          description: data.description || "",
          isActive: data.isActive ?? true,
          image: null,
        });
        setCenter([data.lat || 35.8327, data.lng || 50.9915]);
      } catch (error) {
        console.error("Error fetching billboard:", error);
        setError("بیلبورد پیدا نشد");
      } finally {
        setLoading(false);
      }
    };

    if (id && accessToken) {
      fetchBillboard();
    }
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        avatar: Array.isArray(formData.avatar)
          ? formData.avatar
          : [formData.avatar],
      };

      const response = await api.put(`editbilboard/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        alert("بیلبورد با موفقیت ویرایش شد");
        router.push("/bilboards");
      }
    } catch (error) {
      console.error("Error updating billboard:", error);
      setError("خطا در ویرایش بیلبورد");
    }
  };

  if (loading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <>
      <Toaster />
      <div
        className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full"
        dir="rtl"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          ویرایش اطلاعات تابلو
        </h3>

        <form onSubmit={handleSubmit} className="w-[50%]">
          {/* شهر */}
          <label className="block mt-7 mb-2 text-sm font-medium text-gray-900">
            لیست شهرها
          </label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={handleChange}
            value={formData.city}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />

          {/* استان */}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            استان
          </label>
          <input
            type="text"
            id="province"
            name="province"
            onChange={handleChange}
            value={formData.province}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />

          {/* ابعاد */}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            ابعاد
          </label>
          <input
            type="text"
            id="size"
            name="size"
            onChange={handleChange}
            value={formData.size}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />

          {/* آدرس */}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            آدرس
          </label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            value={formData.address}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />

          {/* قیمت */}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            قیمت
          </label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={handleChange}
            value={formData.price}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />

          {/* نقشه */}
          {/*<div className="relative mt-4">
            <div dir="ltr" className="w-full h-[300px] rounded-lg overflow-hidden">
              <MapContainerNoSSR
                center={center}
                zoom={17}
                className="w-full h-full"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
              </MapContainerNoSSR>
            </div>


            <div
              className="absolute left-1/2 top-1/2 z-10 transform -translate-x-1/2 -translate-y-full pointer-events-none"
              style={{ marginTop: "-20px" }}
            >
              <FaLocationDot size={30} color="red" />
            </div>
          </div>*/}
          <MapWrapper
            center={center}
            setCenter={setCenter}
            formData={formData}
            setFormData={setFormData}
          />
          {/* نوع رسانه */}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            نوع رسانه
          </label>
          <select
            id="mediatype"
            name="mediatype"
            onChange={handleChange}
            value={formData.mediatype}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          >
            <option value="">انتخاب کنید</option>
            <option value="استرابورد">استرابورد</option>
            <option value="بیلبورد">بیلبورد</option>
            <option value="پروژکتوری">پروژکتوری</option>
            <option value="بنر مناسبتی">بنر مناسبتی</option>
          </select>

          {/* نور تابلو */}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            نور تابلو
          </label>
          <select
            id="light"
            name="light"
            onChange={handleChange}
            value={formData.light}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          >
            <option value="">انتخاب کنید</option>
            <option value="دارد">دارد</option>
            <option value="ندارد">ندارد</option>
          </select>

          {/* وضعیت */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              وضعیت تابلو
            </label>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
              className={`px-4 py-2 rounded-lg text-white transition-all ${
                formData.isActive ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {formData.isActive ? "فعال" : "غیرفعال"}
            </button>
          </div>

          {/* توضیحات */}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            توضیحات
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={formData.description}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            rows={3}
          />

          {/* عکس های قبلی */}
          {formData.avatar.length > 0 && (
            <div className="mt-4">
              <p className="text-sm mb-2">عکس‌های فعلی:</p>
              <div className="flex gap-4">
                {formData.avatar.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="آواتار"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* آپلود عکس جدید */}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            آپلود عکس جدید
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.files }))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            accept="image/*,video/mp4"
            multiple
          />

          <button
            className="bg-blue-700 mt-7 text-white px-4 py-3 rounded-lg"
            type="submit"
          >
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </>
  );
}
