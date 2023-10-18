import React from "react";
import { Link } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineMeetingRoom,
} from "react-icons/md";

const ManagerSbItems = ({ handleSBItems, category, itemName, to }) => {
  return (
    <li className={`group`} onClick={(e) => handleSBItems(e)}>
      <div
        className={`flex justify-between hover:text-green-slimy cursor-pointer transition-colors duration-500`}
      >
        <div className={`flex`}>
          <MdOutlineMeetingRoom />
          <span className={`-mt-0.5`}>{category}</span>
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
            to={`/dashboard/${to}`}
            className={`hover:text-green-slimy transition-colors duration-500`}
          >
            {itemName}
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default ManagerSbItems;
