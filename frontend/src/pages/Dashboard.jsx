import React, { useEffect } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdOutlineDashboard, MdKeyboardArrowLeft } from "react-icons/md";
import { setUser } from "../redux/auth/authSlice.js";
import { useUserQuery } from "../redux/auth/authAPI.js";
import ManagerSBItems from "../components/sidebar/ManagerSBItems.jsx";
import Header from "../components/Header.jsx";
import OwnerSBItems from "../components/sidebar/OwnerSBItems.jsx";
import AdminSBItems from "../components/sidebar/AdminSBItems.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, data: user } = useUserQuery();
  const { isFullscreen, enterFullscreen, exitFullscreen, isHbMenu, setHbMenu } =
    useOutletContext();

  const handleSBItems = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };

  useEffect(() => {
    if (user) dispatch(setUser(user.data));
  }, [user]);

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
              <img
                src="https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png"
                alt=""
              />
            </figure>
            <h3
              className={`text-2xl mb-5 font-semibold text-green-slimy pl-3 border-2 border-transparent border-l-green-slimy capitalize`}
            >
              {user?.data?.role}
            </h3>
            <div
              className={`h-full md:h-[calc(100vh_-_14rem)] overflow-y-auto scrollbar-none`}
            >
              <div
                className={`md:hidden w-fit mb-5 text-3xl cursor-pointer`}
                onClick={() => setHbMenu(!isHbMenu)}
              >
                <MdKeyboardArrowLeft />
              </div>
              <ul className={`space-y-1.5`}>
                <li>
                  <NavLink
                    to={`/dashboard`}
                    className={({ isActive }) =>
                      "flex p-2 hover:text-green-slimy rounded-lg transition-colors duration-500" +
                      (isActive ? " bg-gray-300" : "")
                    }
                    end
                  >
                    <MdOutlineDashboard />
                    <span className={`-mt-0.5`}>Dashboard</span>
                  </NavLink>
                </li>
                {!isLoading ? (
                  user?.data?.role === "admin" ||
                  user?.data?.role === "subadmin" ? (
                    <AdminSBItems handleSBItems={handleSBItems} />
                  ) : user?.data?.role === "owner" ? (
                    <OwnerSBItems handleSBItems={handleSBItems} />
                  ) : (
                    <ManagerSBItems handleSBItems={handleSBItems} />
                  )
                ) : null}
              </ul>
            </div>
          </div>

          <div>
            <div className={`-mt-10 mb-10`}>
              <Header
                isFullscreen={isFullscreen}
                enterFullscreen={enterFullscreen}
                exitFullscreen={exitFullscreen}
                isHbMenu={isHbMenu}
                setHbMenu={setHbMenu}
              />
            </div>
            <div className={`px-10`}>
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
