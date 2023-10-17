import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown, MdOutlineMeetingRoom } from "react-icons/md";

const ManagerSbItems = () => {
  return (
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
  );
};

export default ManagerSbItems;
