"use client"; // فقط برای Next.js 13+

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../Services/Confgaxios";

const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // اطمینان از آماده بودن router
    if (!router.isReady) return;

    const accessToken = localStorage.getItem("accessToken");

    // اگر توکن وجود نداشت، به صفحه احراز هویت برو
    if (!accessToken) {
      router.push("/");
      setIsLoading(false);
      return;
    }

    const validateToken = async () => {
      try {
        const res = await api.get("isvalidtoken", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            nonce: Math.round(Math.random() * 8).toString(),
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          try {
            const refreshRes = await api.post(
              "/refresh-token",
              {},
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
              }
            );

            if (refreshRes.status === 200) {
              localStorage.setItem("accessToken", refreshRes.data.accessToken);
              setIsAuthenticated(true);
            } else {
              router.push("/auth");
            }
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            router.push("/auth");
          }
        } else {
          console.error("Error validating token:", error);
          router.push("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();

    validateToken();
  }, [router.isReady]); // وابستگی به آماده بودن router

  return { isAuthenticated, isLoading };
};

export default useAuth;
