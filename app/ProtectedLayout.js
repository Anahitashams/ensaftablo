import ProtectedLayoutClient from "./ProtectedLayoutClient";

export default function ProtectedLayout({ children }) {
  return <ProtectedLayoutClient>{children}</ProtectedLayoutClient>;
}
