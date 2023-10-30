import React from "react";
import UserDashBoard from "../components/UserDashBoard/UserDashBoard.jsx";
import { useUserQuery } from "../redux/auth/authAPI.js";

const DashboardRoot = () => {
  const { isLoading, data: user } = useUserQuery();

  return !isLoading ? (
    user?.data?.role === "admin" ? (
      <UserDashBoard />
    ) : user?.data?.role === "owner" ? (
      <UserDashBoard />
    ) : (
      <UserDashBoard />
    )
  ) : null;
};

export default DashboardRoot;
