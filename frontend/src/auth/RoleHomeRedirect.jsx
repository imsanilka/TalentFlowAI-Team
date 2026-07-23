import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";
import { getRoleHome } from "./authContext";

export default function RoleHomeRedirect() {
  const { isAuthenticated, user } = useAuth();
  return <Navigate to={isAuthenticated ? getRoleHome(user.role) : "/login"} replace />;
}
