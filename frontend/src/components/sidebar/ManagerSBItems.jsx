import React from "react";
import { Link } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineFoodBank,
  MdOutlineInventory2,
  MdOutlineMeetingRoom,
} from "react-icons/md";

const ManagerSbItems = ({ handleSBItems }) => {
  return (
    <>
      <li className={`group`}>
        <div
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
          onClick={(e) => handleSBItems(e)}
        >
          <div className={`flex`}>
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
        <ul className={`group-[.active]:block hidden ml-5`}>
          <li>
            <Link
              to={`/dashboard/add-room`}
              className={`hover:text-green-slimy transition-colors duration-500`}
            >
              Add Room
            </Link>
          </li>
          <li>
            <Link
              to={`/dashboard/manage-room`}
              className={`hover:text-green-slimy transition-colors duration-500`}
            >
              Manage Room
            </Link>
          </li>
        </ul>
      </li>
      <li className={`group`}>
        <div
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
          onClick={(e) => handleSBItems(e)}
        >
          <div className={`flex`}>
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
        <ul className={`group-[.active]:block hidden ml-5`}>
          <li>
            <Link
              to={`/dashboard/add-food`}
              className={`hover:text-green-slimy transition-colors duration-500`}
            >
              Add Food
            </Link>
          </li>
          <li>
            <Link
              to={`/dashboard/Foodcard`}
              className={`hover:text-green-slimy transition-colors duration-500`}
            >
              Manage Food
            </Link>
            <li>
              <Link
                to={`/dashboard/inventoryFood`}
                className={`hover:text-green-slimy transition-colors duration-500`}
              >
                Food Inventory
              </Link>
            </li>
          </li>
        </ul>
      </li>
      <li className={`group`}>
        <div
          onClick={(e) => handleSBItems(e)}
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
        >
          <div className={`flex`}>
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
        <ul className={`group-[.active]:block hidden ml-5`}>
          <li>
            <Link
              to={`/dashboard/add-inventory`}
              className={`hover:text-green-slimy transition-colors duration-500`}
            >
              Add Items
            </Link>
          </li>
          <li>
            <Link
              to={`/dashboard/all-inventory`}
              className={`hover:text-green-slimy transition-colors duration-500`}
            >
              All Items
            </Link>
          </li>
        </ul>
      </li>
      <li className={`group`}>
        <div
          className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
          onClick={(e) => handleSBItems(e)}
        >
          <div className={`flex`}>
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
        <ul className={`group-[.active]:block hidden ml-5`}>
          <li>
            <Link
              to={`/dashboard/add-employee`}
              className={`hover:text-green-slimy transition-colors duration-500`}
            >
              Add Employee
            </Link>
          </li>
          <li>
            <Link
              to={`/dashboard/manage-employee`}
              className={`hover:text-green-slimy transition-colors duration-500`}
            >
              Manage Employee
            </Link>
          </li>
        </ul>
      </li>
    </>
  );
};

export default ManagerSbItems;
