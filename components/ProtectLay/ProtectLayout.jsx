import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/Context.jsx";
import api from "../components/Services/Confgaxios.js";

const [loading, setLoading] = useState(true);
const { accessToken, setAccessToken, setUserRole } = useContext(UserContext);
const router = useRouter();

const generateNonce = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const refreshAccessToken = async (currentToken) => {
  try {
    const response = await api.post(
      "/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
        withCredentials: true,
      }
    );

    if (response.status === 200 && response.data.accessToken) {
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      setAccessToken(newAccessToken);
      console.log("new token", newAccessToken);
      return newAccessToken;
    }
    throw new Error("Invalid refresh token response");
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
};

useEffect(() => {
  const validateAuth = async () => {
    try {
      let token = accessToken || localStorage.getItem("accessToken");
      console.log("yes tokin is correct ", accessToken);
      if (!token) {
        throw new Error("No token found");
      }

      try {
        const validationRes = await api.get("isvalidtoken", {
          headers: {
            Authorization: `Bearer ${token}`,
            nonce: generateNonce(),
          },
          withCredentials: true,
        });
        console.log(validationRes.data.user.role);
        if (validationRes.status === 200) {
          const role = validationRes.data.user.role;
          setUserRole(role); // 👈 نقش کاربر را ست می‌کنیم
          localStorage.setItem("userRole", role);
          setLoading(false);
          return;
        }
        
      } catch (validationError) {
        if (validationError.response?.status === 401) {
          token = await refreshAccessToken(token);
          console.log(token);
          const revalidationRes = await api.get("isvalidtoken", {
            headers: {
              Authorization: `Bearer ${token}`,
              nonce: generateNonce(),
            },
            withCredentials: true,
          });

          if (revalidationRes.status === 200) {
            const role = revalidationRes.data.user.role;
            setUserRole(role);
            localStorage.setItem("userRole", role);
            setLoading(false);
            return;
          }
          
        }
        throw validationError;
      }
    } catch (error) {
      console.error("Authentication failed:", error);

      setAccessToken(null);
      localStorage.removeItem("accessToken");

      if (error.response?.status === 403) {
        router.push("/auth?error=session_expired");
      } else {
        router.push("/auth");
      }
    } finally {
      setLoading(false);
    }
  };

  validateAuth();
}, [accessToken, router, setAccessToken]);

if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }