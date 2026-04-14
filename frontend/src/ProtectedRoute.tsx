import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import type { ReactNode } from "react";

type Role = "USER" | "ADMIN" | "HOST";

interface Props {
  children: ReactNode;
  role?: Role | Role[];
}

const ProtectedRoute = ({ children, role }: Props) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role) {
    if (Array.isArray(role)) {
      if (!role.includes(user.role)) return <Navigate to="/" />;
    } else {
      if (user.role !== role) return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;