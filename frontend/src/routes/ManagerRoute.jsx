import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const ManagerRoute = ({ children }) => {
  const { isUserLoading, user } = useAuth();

  return !isUserLoading ? (
    user.status === "manager" ? (
      children
    ) : (
      <Navigate to="/dashboard"></Navigate>
    )
  ) : null;
};

export default ManagerRoute;
