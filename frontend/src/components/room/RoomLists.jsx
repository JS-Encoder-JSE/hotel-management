import React from "react";
import {
  FaEdit,
  FaEye,
  FaFileInvoice,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RoomLists = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto border">
      <table className="table">
        <thead>
          <tr className={`text-lg`}>
            <th>Name</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Status</th>
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
                      <div className="mask mask-squircle w-16 h-16">
                        <img
                          src="https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Room 703</div>
                      <div className="text-sm opacity-50">Floor 2</div>
                    </div>
                  </div>
                </td>
                <td>$12</td>
                <td>4</td>
                <td>Available</td>
                <td className={`space-x-1.5`}>
                  <span
                    className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                    onClick={() => navigate(`/dashboard/manage-room/${idx}`)}
                    title={`View`}
                  >
                    <FaEye />
                  </span>
                  <span
                    className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                    onClick={() => navigate(`/dashboard/edit-room/${idx}`)}
                    title={`Edit`}
                  >
                    <FaEdit />
                  </span>
                  <span
                    className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
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

export default RoomLists;
