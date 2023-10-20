import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdBarChart,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineFoodBank,
  MdOutlineInventory2,
  MdOutlineMeetingRoom
} from "react-icons/md";

const ManagerSbItems = ({ handleSBItems }) => {
  return (
    <>
      <li className={`group p-2`}>
        <div
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
          onClick={(e) => handleSBItems(e)}
        >
          <div className={`flex space-x-1.5`}>
            <MdOutlineMeetingRoom />
            <span className={`-mt-0.5`}>Rooms</span>
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
              to={`/dashboard/add-room`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Room
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/manage-room`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Manage Room
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={`group p-2`}>
        <div
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
          onClick={(e) => handleSBItems(e)}
        >
          <div className={`flex space-x-1.5`}>
            <MdOutlineFoodBank />
            <span className={`-mt-0.5`}>Food</span>
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
              to={`/dashboard/add-food`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/Foodcard`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Manage Food
            </NavLink>
            <li>
              <NavLink
                to={`/dashboard/inventoryFood`}
                className={({ isActive }) =>
                  "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                  (isActive ? " bg-gray-300" : "")
                }
              >
                Food Inventory
              </NavLink>
            </li>
          </li>
        </ul>
      </li>
      <li className={`group p-2`}>
        <div
          onClick={(e) => handleSBItems(e)}
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
        >
          <div className={`flex space-x-1.5`}>
            <MdOutlineInventory2 />
            <span className={`-mt-0.5`}>Inventory</span>
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
              to={`/dashboard/add-inventory`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/all-inventory`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              All Items
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={`group p-2`}>
        <div
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
          onClick={(e) => handleSBItems(e)}
        >
          <div className={`flex space-x-1.5`}>
            <MdOutlineMeetingRoom />
            <span className={`-mt-0.5`}>Employee</span>
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
              to={`/dashboard/add-employee`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/manage-employee`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Manage Employee
            </NavLink>
          </li>
        </ul>
      </li>
      <li>
        <NavLink
          to={`/dashboard/report`}
          className={({ isActive }) =>
            "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500" +
            (isActive ? " bg-gray-300" : "")
          }
        >
          <div className={`flex space-x-1.5`}>
            <MdBarChart />
            <span>Report</span>
          </div>
        </NavLink>
      </li>
    </>
  );
};

export default ManagerSbItems;
