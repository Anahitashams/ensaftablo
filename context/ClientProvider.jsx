// context/ClientProvider.js
"use client";

import { useState, useEffect } from "react";
import { UserContext } from "./Context.jsx";

export function ClientProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");
    if (token) {
      setAccessToken(token);
    }
    if (role) {
      setUserRole(role);
    }
  }, []);

  const updateAccessToken = (token) => {
    setAccessToken(token);
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  const updateUserRole = (role) => {
    setUserRole(role);
    if (role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  };

  return (<>
    <UserContext.Provider value={{ accessToken, setAccessToken: updateAccessToken, userRole, setUserRole: updateUserRole }}>
      {children}
    </UserContext.Provider>
  </>

  );
}
