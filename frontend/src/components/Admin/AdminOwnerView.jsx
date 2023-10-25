import React from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const AdminOwnerView = () => {
  const navigate = useNavigate();
  return (
    <>
       <div>
      <div className="card w-full bg-white shadow-xl p-5">
       <div>
       
       <span
          className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </span>
       </div>
       
       <h1 className="text-2xl text-center ">Client Information</h1>
        <div className="card-body grid md:grid-cols-4 gap-4">
          <div className="">
            <h2 className="card-title mb-3">Client Information </h2>
            <h6>Client Name : Jon Dow</h6>
            <h6>Hotel Address : Kolkata</h6>
            <h6>Contact Number : +98812554</h6>
            <h6>Client Email : jondoe@gmail.com</h6>
          </div>

          <div className="">
            <h2 className="card-title mb-3">Bill Information </h2>
            <h6>Bill From Date :12-10-2023 </h6>
            <h6>Bill To Date : 14-10-2023</h6>
          </div>
          <div className="">
            <h2 className="card-title mb-3">Bill Information </h2>
            <h6>Cash : $5000 </h6>
            <h6>Card : $00</h6>
            <h6>Mobile Banking : $00</h6>
          </div>
          <div className="">
            <h2 className="card-title mb-3">Bill Information </h2>
            <h6>Number Of Hotels : 02</h6>
            <h6>Status : Active</h6>
          </div>
        </div>
      </div>
    </div>

{/*  Table */}
      <div className="overflow-x-auto mt-10">
        <table className="table border">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number Of <br /> Hotels</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, idx) => {
              return (
                <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                  <th> {++idx}</th>
                  <td className="font-bold">Jon Doe</td>
                  <td>jondoe@gmail.com</td>
                  <td>02</td>
                  <td className={`space-x-1.5`}>
                    <span
                      className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                      onClick={() =>
                        navigate(`/dashboard/adminowner-view/${idx}`)
                      }
                    >
                      <GrView />
                    </span>
                    <span
                      className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case mt-2`}
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
    </>
  );
};

export default AdminOwnerView;
