import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AppRoutes } from "../constants";

const NotFound = () => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }
  return <div className="text-center mt-10 text-xl">404 - Page Not Found</div>;
};

export default NotFound;
