import { useLocation, Navigate } from "react-router-dom";
import useAuth from "./UseAuth";
import Loading from "../Loading";

const RequireAuth = ({ children }) => {
  const { refreshTokenLoading, user, access } = useAuth();

  if (refreshTokenLoading && !access) {
    return <Loading />;
  }

  if (!access) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default RequireAuth;
