import React from "react";
import { Navigate } from "react-router-dom";
import { useUserQuery } from "../redux/auth/authAPI.js";

const ManagerRoute = ({ children }) => {
  const { isLoading, data: user } = useUserQuery();

  return !isLoading ? (
    user?.data?.role === "manager" ? (
      children
    ) : (
      <Navigate to="/dashboard"></Navigate>
    )
  ) : null;
};

export default ManagerRoute;
