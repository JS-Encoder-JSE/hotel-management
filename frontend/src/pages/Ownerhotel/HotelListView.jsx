import React from "react";
import { FaArrowLeft, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import ChangeShift from "../OwnerManagerManagement/ChangeShift";


const HotelListView = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="card w-full bg-white shadow-xl p-5">
        {/* Back button */}
        <div>
          <span
            className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </span>
        </div>

        <h1 className="text-2xl text-center ">Hotel - information</h1>
        <div className="card-body grid md:grid-cols-2 gap-4">
          <div className="">
            <h2 className="card-title mb-3">Hotel Description </h2>
            <h6> Name : Jon Doe</h6>
            <h6> Address : Kolkata</h6>
            <h6> Number : +98812554</h6>
            <h6> Email : jondoe@gmail.com</h6>
          </div>
          <div className="">
            <h2 className="card-title mb-3">Other information </h2>
            <h6> Branch Name : Branch 1 </h6>
            <h6> Hotel License Number :GH-DHF-DJ-2354546</h6>
            <h6>Manager Name : Manager 1</h6>
            <h6>Shift : Mornig</h6>
            {/* <h6 className={`flex space-x-1.5`}>
              <span>Status : Active</span>
              <span className={`cursor-pointer hover:text-green-slimy`} onClick={() => window.ol_modal.showModal()}><FaEdit /></span>
            </h6> */}
          </div>
        </div>
      </div>
      {/* <Modal id={`ol_modal`}>
        <StatusSettings />
      </Modal> */}
      <div className="card w-full bg-white shadow-xl p-5 mt-8">
        <div className="card-body">
          <h1 className="text-center text-2xl mb-4">Assign Manager</h1>
          <div className="overflow-x-auto">
            <table className="table border">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Manager Name</th>
                  <th>Shift</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th> {++idx}</th>
                      <td className="font-bold">Jon Doe</td>
                      <td>Morning</td>
                    
                    </tr>
              
                  );
                })}
              </tbody>
            </table>
          </div>
             <h6 className={`flex space-x-1.5 justify-end`}>
            <button
            className="btn btn-md bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[7rem]"
            onClick={() => window.ol_modal.showModal()}
            >Change Shift</button>
            </h6>
            <Modal id={`ol_modal`}>
             <ChangeShift/>
            </Modal>
        </div>
      </div>
    </div>
  );
};

export default HotelListView;
