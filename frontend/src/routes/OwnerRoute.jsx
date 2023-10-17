import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const OwnerRoute = ({ children }) => {
  const { isUserLoading, user } = useAuth();

  return !isUserLoading ? (
    user.status === "owner" ? (
      children
    ) : (
      <Navigate to="/dashboard"></Navigate>
    )
  ) : null;
};

export default OwnerRoute;
