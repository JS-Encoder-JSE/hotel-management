import React from "react";
import { FaEdit, FaStreetView, FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const RenewList = () => {
  const navigate = useNavigate();

  return (
    <div className={`space-y-8 bg-white p-10 rounded-2xl`}>
      <div className={`text-2xl text-center`}>
    Renew List
      </div>
      <div className="overflow-x-auto">
        <table className="table border">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((_, idx) => {
              return (
                <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                  <th>{++idx}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                      </div>
                      <div>
                        <div className="font-bold">Jon Doe</div>
                      </div>
                    </div>
                  </td>
                  <td>JonDoe@gmail.com</td>
                  <td className={`space-x-1.5`}>
                    <span
                     className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                      onClick={() => navigate(`/dashboard/renew-view/${idx}`)}
                    >
                      <GrView />
                    </span>
                    <span
                      className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case`}
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
    </div>
  );
};

export default RenewList;
