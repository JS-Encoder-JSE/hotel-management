import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdBarChart,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineFoodBank,
  MdOutlineInventory2,
  MdOutlineKitchen,
  MdOutlineMeetingRoom,
  MdPool,
  MdOutlineSportsGymnastics,
} from "react-icons/md";
import { FaGlassMartini, FaUsers } from "react-icons/fa";
import { SiMomenteo } from "react-icons/si";
import { TbToolsKitchen2 } from "react-icons/tb";

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
            <span className={`-mt-0.5`}>Room</span>
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
          <li>
            <NavLink
              to={`/dashboard/manage-booking`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Manage Booking
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/checkin`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Check In
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/checkout`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Check Out
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
            <TbToolsKitchen2 />
            <span className={`-mt-0.5`}>Restaurant</span>
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
              to={`/dashboard/restaurant-dashboard`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Restaurant Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/add-table`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Table
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/add-food`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Food / Beverage
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/add-order`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Order
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/current-order-list`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Current Order List
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/order-list`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Order List
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/add-expense`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Expense
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/show-all-sell`}
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
              to={`/dashboard/show-all-expense`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Restaurant Expenses
            </NavLink>
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
            <span className={`-mt-0.5`}>Inventory/Hotel Expense</span>
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
              Add Item
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
              Manage Items
            </NavLink>
          </li>  
          <li>
            <NavLink
              to={`/dashboard/add-hotel-expense`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Hotel Expense
            </NavLink>
          </li> 
          <li>
            <NavLink
              to={`/dashboard/all-hotel-expenses`}
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
              to={`/dashboard/hotel-dashboard`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Hotel Dashboard
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
            <FaUsers />
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

      {/* Bar item */}
      {/* <li className={`group p-2`}>
        <div
          onClick={(e) => handleSBItems(e)}
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
        >
          <div className={`flex space-x-1.5`}>
            <FaGlassMartini />
            <span className={`-mt-0.5`}>Bar</span>
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
              to={`/dashboard/add-bar`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Add Bar
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/bar-order`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Order Bar Item
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/dashboard/baritem-list`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Bar Item List
            </NavLink>
          </li>
        </ul>
      </li> */}

      {/* Order Bar Item */}
      {/*<li className={`group p-2`}>*/}
      {/*  <div*/}
      {/*    className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}*/}
      {/*    onClick={(e) => handleSBItems(e)}*/}
      {/*  >*/}
      {/*    <div className={`flex space-x-1.5`}>*/}
      {/*      <FaGlassMartini />*/}
      {/*      <span className={`-mt-0.5`}>Manage Bar</span>*/}
      {/*    </div>*/}
      {/*    <span className={`group-[.active]:hidden`}>*/}
      {/*      <MdKeyboardArrowDown />*/}
      {/*    </span>*/}
      {/*    <span className={`hidden group-[.active]:inline`}>*/}
      {/*      <MdKeyboardArrowUp />*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*  <ul className={`group-[.active]:block hidden`}>*/}
      {/*    <li>*/}
      {/*      <NavLink*/}
      {/*        to={`/dashboard/order-bar-item`}*/}
      {/*        className={({ isActive }) =>*/}
      {/*          "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +*/}
      {/*          (isActive ? " bg-gray-300" : "")*/}
      {/*        }*/}
      {/*      >*/}
      {/*        Order Bar Item*/}
      {/*      </NavLink>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <NavLink*/}
      {/*        to={`/dashboard/order-bar-list`}*/}
      {/*        className={({ isActive }) =>*/}
      {/*          "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +*/}
      {/*          (isActive ? " bg-gray-300" : "")*/}
      {/*        }*/}
      {/*      >*/}
      {/*        Order List*/}
      {/*      </NavLink>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</li>*/}
      {/* Gym Reservation */}
      <li>
        <NavLink
          to={`/dashboard/gym-booking`}
          className={({ isActive }) =>
            "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500" +
            (isActive ? " bg-gray-300" : "")
          }
        >
          <div className={`flex space-x-1.5`}>
            <MdOutlineSportsGymnastics />
            <span>Gym Reservation</span>
          </div>
        </NavLink>
      </li>

      {/* Swimming Pool sidebar */}
      {/* <li className={`group p-2`}>
        <div
          onClick={(e) => handleSBItems(e)}
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
        >
          <div className={`flex space-x-1.5`}>
            <MdPool />
            <span className={`-mt-0.5`}>Swimming Pool</span>
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
              to={`/dashboard/add-swimming-pool`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
             Add Swimming Pool
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/swimming-booking`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Pool Reservation
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/swimming-pool-list`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Swimming Pool List
            </NavLink>
          </li>

        </ul>
      </li> */}

      {/* Gym Sideber */}
      {/* <li className={`group p-2`}>
        <div
          onClick={(e) => handleSBItems(e)}
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
        >
          <div className={`flex space-x-1.5`}>
            <MdOutlineSportsGymnastics />
            <span className={`-mt-0.5`}>Gym</span>
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
              to={`/dashboard/add-gym`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
             Add Gym
            </NavLink>
          </li>

          <li>
        <NavLink
          to={`/dashboard/gym-booking`}
          className={({ isActive }) =>
            "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500" +
            (isActive ? " bg-gray-300" : "")
          }
        >
          <div className={`flex space-x-1.5`}>
            <MdBarChart />
            <span>Gym Reservation</span>
          </div>
        </NavLink>
      </li>
          <li>
            <NavLink
              to={`/dashboard/gym-list`}
              className={({ isActive }) =>
                "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500 pl-5" +
                (isActive ? " bg-gray-300" : "")
              }
            >
              Gym List
            </NavLink>
          </li>

        </ul>
      </li> */}

      {/* Pool Reservation */}
      <li>
        <NavLink
          to={`/dashboard/pool-reservation`}
          className={({ isActive }) =>
            "block p-2 hover:text-green-slimy rounded-lg transition-colors duration-500" +
            (isActive ? " bg-gray-300" : "")
          }
        >
          <div className={`flex space-x-1.5`}>
            <MdPool />
            <span>Pool Reservation</span>
          </div>
        </NavLink>
      </li>

      {/* Report */}
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
            <span>Hotel Report</span>
          </div>
        </NavLink>
      </li>
    </>
  );
};

export default ManagerSbItems;
