import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../Modal.jsx";
import HotelLimitEdit from "../../pages/Admin/HotelLimitEdit.jsx";
import HotelList from "./HotelList.jsx";
import TransactionHistory from "./TransactionHistory.jsx";
import StatusHistory from "./StatusHistory.jsx";
import { useGetUserQuery } from "../../redux/admin/subadmin/subadminAPI.js";
import store from "../../redux/store.js";

const AdminOwnerView = () => {
  const navigate = useNavigate();
  const [roomsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const user_id= store?.getState()?.authSlice?.user?._id
  const {id}= useParams()
  const { data, isLoading, error } = useGetUserQuery(id)

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  function calculateDays(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Math.abs(firstDate - secondDate);

    // Convert the difference to days
    const differenceInDays = Math.floor(differenceInMilliseconds / oneDay);

    return differenceInDays;
}

  return (
    <>
      <div className={`space-y-10`}>
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
          <div className="card-body grid md:grid-cols-2 gap-4">
            <div className="">
              <h2 className="card-title mb-3">Client Information </h2>
              <h6>Client Name : {data?.name}</h6>
              <h6>Hotel Address : { data?.address}</h6>
              <h6>Contact Number : {data?.phone_no}</h6>
              <h6>Emergency Contact: {data?.emergency_contact}</h6>
              <h6>Client Email : {data?.email}</h6>
            </div>
            <div className="">
              <h2 className="card-title mb-3">License Information </h2>
              <h6> License Key : { new Date(data?.bill_to).toLocaleDateString()}</h6>
              <h6> Purchase Date :{new Date(data?.createdAt).toLocaleDateString()} </h6>
              <h6> Renew Date :{ new Date(data?.renew_date).toLocaleDateString()} </h6>
              <h6> Expire Date : { new Date(data?.bill_to).toLocaleDateString()}</h6>
              <h6> Remaining Days: {calculateDays(data?.bill_to, Date.now())} Days</h6>
              <h6 className="capitalize">Status : {data?.status}</h6>
              <div className="flex gap-1.5">
                <h6>Number Of Hotels : {data?.maxHotels}</h6>
                {/* <span
                  className={`cursor-pointer`}
                  onClick={() => window.hle_modal.showModal()}
                >
                  <FaEdit />
                </span> */}
              </div>
            </div>
          </div>
        </div>

        <HotelList />
        <TransactionHistory />
        <StatusHistory />
      </div>
      <Modal id={`hle_modal`}>
        <HotelLimitEdit hotels={data?.maxHotels } />
      </Modal>
    </>
  );
};

export default AdminOwnerView;
