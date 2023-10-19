import React from "react";
import { Link } from "react-router-dom";
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdOutlineInventory2,
} from "react-icons/md";


const ManageInventoryItems = ({ handleSBItems }) => {
    return (
        <li className={`group`} >
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
    );
};

export default ManageInventoryItems;