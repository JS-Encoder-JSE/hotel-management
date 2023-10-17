import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const AdminRoute = ({ children }) => {
  const { isUserLoading, user } = useAuth();

  return !isUserLoading ? (
    user.status === "admin" ? (
      children
    ) : (
      <Navigate to="dashboard"></Navigate>
    )
  ) : null;
};

export default AdminRoute;
