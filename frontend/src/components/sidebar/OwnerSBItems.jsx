import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdHistory,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdManageAccounts,
  MdOutlineKitchen,
  MdOutlineMeetingRoom,
} from "react-icons/md";

const OwnerSBItems = ({ handleSBItems,isHbMenu,setHbMenu }) => {
  return (
    <>
      <li className={`group p-2`}>
        <div
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
          onClick={(e) => handleSBItems(e)}
        >
          <div className={`flex space-x-1.5`}>
            <MdOutlineMeetingRoom />
            <span className={`-mt-0.5`}>Hotels</span>
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
              to={`/dashboard/add-hotel`}
              onClick={() => setHbMenu(!isHbMenu)}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Hotel
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/hotel-list`}
              onClick={() => setHbMenu(!isHbMenu)}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Hotel List
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
            <span className={`-mt-0.5`}>Expenses/Profit</span>
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
              to={`/dashboard/restaurants-analytics`}
              onClick={() => setHbMenu(!isHbMenu)}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
            Restaurant Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/hotel-analytics`}
              onClick={() => setHbMenu(!isHbMenu)}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
           Hotel Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/restaurant-expenses`}
              onClick={() => setHbMenu(!isHbMenu)}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Restaurant Expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/restaurant-sales`}
              onClick={() => setHbMenu(!isHbMenu)}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
             Restaurant Sales
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/hotel-expenses`}
              onClick={() => setHbMenu(!isHbMenu)}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
             Hotel Expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/hotel-sales`}
              onClick={() => setHbMenu(!isHbMenu)}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
             Hotel Sales
            </NavLink>
          </li>
        </ul>   
      </li>
      {/* <li className={`group p-2`}>
        <div
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
          onClick={(e) => handleSBItems(e)}
        >
          <div className={`flex space-x-1.5`}>
            <MdManageAccounts />
            <span className={`-mt-0.5`}>Manager Management</span>
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
              to={`/dashboard/add-manager`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Manager
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/manager-list`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Manager List
            </NavLink>
          </li>
        </ul>
      </li> */}
      <li className={``}>
        <NavLink
          to={`/dashboard/finance`}
          className={({ isActive }) =>
          "p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 flex space-x-1.5 cursor-pointer" +
            (isActive ? " bg-gray-300" : "")
          }
        >
          <MdOutlineKitchen />
          <span 
          onClick={() => setHbMenu(!isHbMenu)}
          className={`-mt-0.5`}>Monitor Finances</span>
        </NavLink>
      </li> 
      <li className={``}>
        <NavLink
            to={`/dashboard/license-history`}
            className={({ isActive }) =>
                "p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 flex space-x-1.5 cursor-pointer" +
                (isActive ? " bg-gray-300" : "")
            }
        >
          <MdHistory />
          <span 
          onClick={() => setHbMenu(!isHbMenu)}
          className={`-mt-0.5`}>License History</span>
        </NavLink>
      </li>
    </>
  );
};

export default OwnerSBItems;
