import React from "react";
import { Navigate } from "react-router-dom";
import { useUserQuery } from "../redux/auth/authAPI.js";

const AdminRoute = ({ children }) => {
  const { isLoading, data: user } = useUserQuery();

  return !isLoading ? (
    user?.data?.role === "admin" || user?.data?.role === "subadmin" ? (
      children
    ) : (
      <Navigate to="/dashboard"></Navigate>
    )
  ) : null;
};

export default AdminRoute;
