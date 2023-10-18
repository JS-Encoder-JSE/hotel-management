import React from "react";
import { Link } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineMeetingRoom,
  MdOutlineFoodBank
} from "react-icons/md";

const ManagerFoodItems = ({ handleSBItems }) => {
  return (
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
            Food Inventory
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default ManagerFoodItems;
