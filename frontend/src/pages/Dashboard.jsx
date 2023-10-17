import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdOutlineDashboard,
  MdOutlineMeetingRoom,
} from "react-icons/md";

const Dashboard = () => {
  const [isHbMenu, setHbMenu] = useState(true);

  const handleResize = () => {
    if (innerWidth >= 768) setHbMenu(false);
    else setHbMenu(true);
  };

  useEffect(() => {
    handleResize();

    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={`py-10`}>
      <div className={`grid grid-cols-1 md:grid-cols-[18rem_auto]`}>
        <div
          className={`md:self-start fixed md:sticky top-0 ${
            isHbMenu ? "-left-96" : "left-0"
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
              <li>
                <div
                  className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
                >
                  <div className={`flex`}>
                    <MdOutlineMeetingRoom />
                    <span className={`-mt-0.5`}>Rooms</span>
                  </div>
                  <MdKeyboardArrowDown />
                </div>
                <ul className={`ml-5`}>
                  <li>
                    <Link
                      to={`/dashboard/add-room`}
                      className={`hover:text-green-slimy transition-colors duration-500`}
                    >
                      Add Room
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className={`px-3`}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
