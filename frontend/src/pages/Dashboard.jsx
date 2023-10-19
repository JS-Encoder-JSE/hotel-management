import React, { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdOutlineDashboard,
  MdOutlineMeetingRoom,
  MdOutlineFoodBank, MdKeyboardArrowLeft
} from "react-icons/md";
import useAuth from "../hooks/useAuth.js";
import ManagerSBItems from "../components/sidebar/ManagerSBItems.jsx";
import ManagerFoodItems from "../components/sidebar/ManagerFoodItems.jsx";
import Header from "../components/Header.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const {isHbMenu, setHbMenu} = useOutletContext()

  const handleSBItems = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };

  return (
    <>
      <section className={`py-10`}>
        <div className={`grid grid-cols-1 md:grid-cols-[18rem_auto]`}>
          <div
            className={`md:self-start fixed md:sticky top-0 ${
              isHbMenu ? "-left-96" : "left-0"
            } bg-gray-500 text-white text-lg w-36 md:w-auto h-full md:h-auto px-2 py-5 md:-my-10 z-30 transition-[left] duration-500`}
          >
            <div
              className={`h-full md:h-[calc(100vh_-_2.5rem)] overflow-y-auto`}
            >
              <div className={`md:hidden w-fit mb-5 text-3xl cursor-pointer`} onClick={() => setHbMenu(!isHbMenu)}>
                <MdKeyboardArrowLeft />
              </div>
              <ul className={`space-y-1.5`}>
                <li>
                  <Link
                    to={`/dashboard`}
                    className={`flex hover:text-green-slimy transition-colors duration-500`}
                  >
                    <MdOutlineDashboard />
                    <span className={`-mt-0.5`}>Dashboard</span>
                  </Link>
                </li>

                {user.status === "manager" ? (
                  <ManagerSBItems handleSBItems={handleSBItems} />
                ) : null}
                {/* food */}
                {user.status === "manager" ? (
                  <ManagerFoodItems handleSBItems={handleSBItems} />
                ) : null}
              </ul>
            </div>
          </div>

  return (
    <section className={`py-10`}>
      <div className={`grid grid-cols-1 md:grid-cols-[18rem_auto]`}>
        <div
          className={`md:self-start fixed md:sticky top-0 ${isHbMenu ? "-left-96" : "left-0"
            } bg-gray-500 text-white text-lg w-36 md:w-auto h-full md:h-auto px-2 py-5 md:-my-10 z-30 transition-[left] duration-500`}
        >
          <div className={`h-full md:h-[calc(100vh_-_2.5rem)] overflow-y-auto`}>
            <ul className={`space-y-1.5`}>
              <li>
                <Link
                  to={`/dashboard`}
                  className={`flex hover:text-green-slimy transition-colors duration-500`}
                >
                  <MdOutlineDashboard />
                  <span className={`-mt-0.5`}>Dashboard</span>
                </Link>
              </li>
              {user.status === "manager" ? (
                <ManagerSBItems handleSBItems={handleSBItems} />
              ) : null}
            </ul>
          <div className={`px-3`}>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
