import React from "react";
import { FaEdit, FaEye, FaFileInvoice, FaPlusCircle, FaTrash } from "react-icons/fa";

const FoodLists = () => {
  return (
    <div className="overflow-x-auto border">
      <table className="table">
        <thead>
          <tr className={`text-lg`}>
            <th>Name</th>
            <th>Stock</th>
            <th>Use</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, idx) => {
            return (
              <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                <td>Bed Sheet</td>
                <td>20</td>
                <td>12</td>
                <td className={`space-x-1.5`}>
                    <span
                      className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                    >
                      <FaEdit />
                    </span>
                  <span
                    className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
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

export default FoodLists;
