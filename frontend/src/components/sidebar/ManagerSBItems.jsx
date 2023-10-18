import React from "react";
import { Link } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineMeetingRoom,
} from "react-icons/md";

const ManagerSbItems = ({ handleSBItems }) => {
  return (
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
  );
};

export default ManagerSbItems;
