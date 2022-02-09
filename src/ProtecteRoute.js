import { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthState } from "./AuthContext";

const ProtecteRoute = ({ allowedRoles }) => {
  let location = useLocation();
  const { currentUser } = useContext(AuthState);
  // console.log(currentUser?.roles?.find((role) => allowedRoles?.includes(role)));

  return currentUser?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : currentUser ? (
    <Navigate to="/unauthorized" state={{ from: location }} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );

  // return currentUser ? (
  //   children
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} />
  // );
};

export default ProtecteRoute;
