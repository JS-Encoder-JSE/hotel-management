import React from "react";
import { FaEye, FaFileInvoice, FaPlusCircle } from "react-icons/fa";

const InventoryLists = () => {
  return (
    <div className="overflow-x-auto border">
      <table className="table">
        <thead>
          <tr className={`text-lg`}>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, idx) => {
            return (
              <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">Menu 1</div>
                    </div>
                  </div>
                </td>
                <td>20</td>
                <td>$12</td>
                <th>
                  <span
                    className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                  >
                    <FaPlusCircle />
                  </span>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryLists;
