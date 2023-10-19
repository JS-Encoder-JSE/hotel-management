import React from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import useAuth from "../hooks/useAuth.js";
import ManagerSBItems from "../components/sidebar/ManagerSBItems.jsx";
import Header from "../components/Header.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const { isHbMenu, setHbMenu } = useOutletContext();

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
            } bg-gray-200 text-lg w-36 md:w-auto h-full md:h-auto px-10 py-5 md:-my-10 z-30 transition-[left] duration-500`}
          >
            <figure className={`mb-10 max-w-[10rem] mx-auto`}>
              <img src="https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png" alt="" />
            </figure>
            <h3 className={`text-2xl mb-5 font-semibold text-green-slimy pl-3 border-2 border-transparent border-l-green-slimy`}>Manager</h3>
            <div
              className={`h-full md:h-[calc(100vh_-_2.5rem)] overflow-y-auto`}
            >
              <div
                className={`md:hidden w-fit mb-5 text-3xl cursor-pointer`}
                onClick={() => setHbMenu(!isHbMenu)}
              >
                <MdKeyboardArrowLeft />
              </div>
              <ul className={`space-y-3`}>
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
            </div>
          </div>

          <div>
            <div className={`-mt-10 mb-10`}>
              <Header isHbMenu={isHbMenu} setHbMenu={setHbMenu} />
            </div>
            <div className={`px-3`}>
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
