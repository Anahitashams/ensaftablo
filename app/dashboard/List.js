    import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Context";
import api from "../../components/Services/Confgaxios";
import { useRouter } from "next/navigation";

const List = () => {

  const router = useRouter();


  const { accessToken } = useContext(UserContext);
  const [billboards, setBillboards] = useState([]);

  const generateNonce = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  useEffect( () => {
    const res =  api.get("readbilboard", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        nonce: generateNonce(),
      },
      withCredentials: true,
    }).then((res)=>{
        console.log(res);
        setBillboards(res.data)

    }).catch((err)=>{
        console.log(err);
    })

  }, []);

  const handleEdit = (id) => {
    router.push(`/Editbilboard/${id}`);
    // یا برای اطمینان بیشتر:
    // router.push(`/Editbilboard/${id}`, undefined, { shallow: true });
  };

  const handleDelete = async (id) => { 
    const confirmDelete = confirm("آیا از حذف این تابلو مطمئن هستید؟"); 
    if (confirmDelete) { 
      try {
        await api.delete(`deletebilboard/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            nonce: generateNonce(),
          },
          withCredentials: true,
        });
  
        // حذف از state بعد از موفقیت
        setBillboards(billboards.filter((item) => item._id !== id));
      } catch (error) {
        console.error("خطا در حذف تابلو:", error);
        alert("خطایی در حذف تابلو رخ داد");
      }
    }
  };
  

  return (
    <div className=" text-right mx-auto ">
      <h2 className="text-xl font-semibold mb-6 text-black">
        لیست تابلوهای ثبت شده
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-gray-100 rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-[#1d4ed8] text-white text-sm">
              <th className="px-3 py-2">تصویر</th>
              <th className="px-3 py-2">نوع رسانه</th>
              <th className="px-3 py-2">وضعیت</th>
              <th className="px-3 py-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {billboards.map((item) => (
              <tr
                key={item._id}
                className="border-t border-gray-100text-sm hover:bg-gray-800 transition"
              >
                <td className="px-3 py-2">
                  <img
                    src={item.avatar[0]}
                    alt="تابلو"
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>

                <td className="px-3 py-2">{item.mediatype}</td>
                <td className="px-3 py-2">
                  {item.isActive ? (
                    <span className="text-green-400">فعال</span>
                  ) : (
                    <span className="text-red-400">غیرفعال</span>
                  )}
                </td>
                <td className="px-3 py-2 space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
            {billboards.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-400">
                  هیچ تابلویی یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
