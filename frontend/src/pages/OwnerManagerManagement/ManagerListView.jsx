import React from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StatusSettings from "./StatusSettings.jsx";
import Modal from "../../components/Modal.jsx";

const ManagerListView = () => {
  const navigate = useNavigate();
  return (
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

        <h1 className="text-2xl text-center ">Manager Information</h1>
        <div className="card-body grid md:grid-cols-2 gap-4">
          <div className="">
            <h2 className="card-title mb-3"> Infomation </h2>
            <h6> Name : Jon Doe</h6>
            <h6> Address : Kolkata</h6>
            <h6> Number : +98812554</h6>
            <h6> Email : jondoe@gmail.com</h6>
          </div>
          <div className="">
            <h2 className="card-title mb-3"> Other Information </h2>
            <h6>  Joint Date :12-10-2023 </h6>
            <h6>  Salary :12-10-2023 </h6>
            <h6 className={`flex space-x-1.5`}>
              <span>Status : Active</span>
              <span className={`cursor-pointer hover:text-green-slimy`} onClick={() => window.ol_modal.showModal()}><FaEdit /></span>
            </h6>
          </div>
        </div>
      </div>
      <Modal id={`ol_modal`}>
        <StatusSettings />
      </Modal>
    </div>
  );
};

export default ManagerListView;
