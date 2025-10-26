// components/RoleGuard.jsx
import { useContext } from "react";
import { UserContext } from "../context/Context";

export default function RoleGuard({ allowedRoles, children }) {
  const { userRole } = useContext(UserContext);

  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        شما اجازه دسترسی به این بخش را ندارید.
      </div>
    );
  }

  return <>{children}</>;
}