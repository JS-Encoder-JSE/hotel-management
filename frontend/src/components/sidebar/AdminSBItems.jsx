import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MdBarChart,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineKitchen,
  MdOutlineLockClock,
  MdOutlineMeetingRoom,
} from "react-icons/md";

const AdminSBItems = ({ handleSBItems }) => {
  const { isUserLoading, user } = useSelector((store) => store.authSlice);
  const [subAdmin, setSubAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === "subadmin") {
        setSubAdmin(true);
      } else {
        setSubAdmin(false);
      }
    }
  }, [user]);

  return (
    <>
      <li className={`group p-2`}>
        <div
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
          onClick={(e) => handleSBItems(e)}
        >
          <div className={`flex space-x-1.5`}>
            <MdOutlineMeetingRoom />
            <span className={`-mt-0.5`}>Software License and Sale </span>
          </div>
          <span className={`group-[.active]:hidden`}>
            <MdKeyboardArrowDown />
          </span>
          <span className={`hidden group-[.active]:inline`}>
            <MdKeyboardArrowUp />
          </span>
        </div>
        <ul className={`group-[.active]:block hidden`}>
          <li>
            <NavLink
              to={`/dashboard/new-license`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              New License
            </NavLink>
          </li>
          {!subAdmin && (
            <li>
              <NavLink
                to={`/dashboard/renew-list`}
                className={({ isActive }) =>
                  "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                  (isActive ? " bg-gray-300" : "")
                }
              >
                Renew List
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to={`/dashboard/adminowner-list`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Owner List
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={`group p-2`}>
        <NavLink
          to={`/dashboard/suspend-lock-list`}
          className={({ isActive }) =>
            "flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500 rounded-lg p-2" +
            (isActive ? " bg-gray-300" : "")
          }
        >
          <div className={`flex space-x-1.5`}>
            <MdOutlineLockClock />
            <span className={`-mt-0.5`}>Suspend & Lock List</span>
          </div>
        </NavLink>
      </li>
      {!subAdmin && (
        <li className={`group p-2`}>
          <div
            className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
            onClick={(e) => handleSBItems(e)}
          >
            <div className={`flex space-x-1.5`}>
              <MdOutlineKitchen />
              <span className={`-mt-0.5`}>Sub Admin Section</span>
            </div>
            <span className={`group-[.active]:hidden`}>
              <MdKeyboardArrowDown />
            </span>
            <span className={`hidden group-[.active]:inline`}>
              <MdKeyboardArrowUp />
            </span>
          </div>
          <ul className={`group-[.active]:block hidden`}>
            <li>
              <NavLink
                to={`/dashboard/add-sub-admin`}
                className={({ isActive }) =>
                  "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                  (isActive ? " bg-gray-300" : "")
                }
              >
                Add Sub Admin
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/dashboard/sub-admin-list`}
                className={({ isActive }) =>
                  "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                  (isActive ? " bg-gray-300" : "")
                }
              >
                Sub Admin List
              </NavLink>
            </li>
          </ul>
        </li>
      )}
      <li>
        <NavLink
          to={`/dashboard/admin-report`}
          className={({ isActive }) =>
            "flex p-2 hover:text-green-slimy rounded-lg transition-colors duration-500" +
            (isActive ? " bg-gray-300" : "")
          }
          end
        >
          <MdBarChart />
          <span className={`-mt-0.5`}>Report</span>
        </NavLink>
      </li>
    </>
  );
};

export default AdminSBItems;
