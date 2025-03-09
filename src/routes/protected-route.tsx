import { useAppSelector } from "@/lib/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const user = useAppSelector((state) => state.user.userAuthenticated); // sesuaikan dengan struktur state kamu
  const role = user?.role?.id;

  if (!role) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />; // atau ke halaman "Unauthorized"
  }

  return <Outlet />;
};

export default ProtectedRoute;
