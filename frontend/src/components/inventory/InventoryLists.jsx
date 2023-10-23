import React from "react";
import {
  FaDoorOpen,
  FaEdit,
  FaEye,
  FaFileInvoice,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const InventoryLists = () => {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto border">
      <table className="table">
        <thead>
          <tr className={`text-lg`}>
            <th>Name</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>Use</th>
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
                <td>12</td>
                <td>8</td>
                <td className={`space-x-1.5`}>
                  <span
                    className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                    title={`Edit`}
                    onClick={() => navigate(`/dashboard/edit-inventory/${idx}`)}
                  >
                    <FaEdit />
                  </span>
                  <span
                    className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                    title={`Delete`}
                  >
                    <FaTrash />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryLists;
