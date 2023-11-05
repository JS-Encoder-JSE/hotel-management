import React from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useGetUserQuery } from "../../redux/admin/subadmin/subadminAPI.js";

const RenewView = () => {
  const { id } = useParams();
  const { isLoading, data: user } = useGetUserQuery(id);
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

        <div className="card-body grid md:grid-cols-2 gap-4">
          <div className="">
            <h2 className="card-title mb-3">Client Information </h2>
            <h6>Client Name : {user?.name}</h6>
            <h6>Hotel Address : {user?.address}</h6>
            <h6>Contact Number : {user?.phone_no}</h6>
            <h6>Client Email : {user?.email}</h6>
          </div>
          <div>
            <h2 className="card-title mb-3">License Information</h2>
            {/*<h6>License Key : {user?.}</h6>*/}
            <h6>Purchase Date: {new Date().toLocaleDateString()}</h6>
            <h6>Renew Date: {new Date().toLocaleDateString()}</h6>
            <h6>Expire Date : {new Date().toLocaleDateString()}</h6>
            <h6>
              Remaining Days: {new Date() - new Date() / (1000 * 60 * 60 * 24)}
            </h6>
            <h6>Status : {user?.status}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewView;
