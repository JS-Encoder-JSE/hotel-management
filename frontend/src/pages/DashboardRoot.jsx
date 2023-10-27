import React from "react";
import useAuth from "../hooks/useAuth.js";
import UserDashBoard from "../components/UserDashBoard/UserDashBoard.jsx";

const DashboardRoot = () => {
  const { user } = useAuth();

  return user.status === "admin" ? (
    <UserDashBoard />
  ) : user.status === "owner" ? (
    <UserDashBoard />
  ) : (
    <UserDashBoard />
  );
};

export default DashboardRoot;
