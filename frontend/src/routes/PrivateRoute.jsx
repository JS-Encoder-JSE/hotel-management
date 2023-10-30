import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token");
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/" state={{ fromURL: location }}></Navigate>
  );
};

export default PrivateRoute;
