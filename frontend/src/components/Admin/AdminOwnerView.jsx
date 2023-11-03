import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../Modal.jsx";
import HotelLimitEdit from "../../pages/Admin/HotelLimitEdit.jsx";
import HotelList from "./HotelList.jsx";
import TransactionHistory from "./TransactionHistory.jsx";
import StatusHistory from "./StatusHistory.jsx";

const AdminOwnerView = () => {
  const navigate = useNavigate();
  const [roomsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

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
              <h6>Client Name : Jon Dow</h6>
              <h6>Hotel Address : Kolkata</h6>
              <h6>Contact Number : +98812554</h6>
              <h6>Client Email : jondoe@gmail.com</h6>
            </div>
            <div className="">
              <h2 className="card-title mb-3">License Information </h2>
              <h6> License Key : DSER-HGYT-GHTY-54564 </h6>
              <h6> Purchase Date :12-10-2023 </h6>
              <h6> Renew Date :12-10-2023 </h6>
              <h6> Expire Date : 14-10-2023</h6>
              <h6> Remaining Days: 15 Days</h6>
              <h6>Status : Active</h6>
              <div className="flex gap-1.5">
                <h6>Number Of Hotels : 05</h6>
                <span
                  className={`cursor-pointer`}
                  onClick={() => window.hle_modal.showModal()}
                >
                  <FaEdit />
                </span>
              </div>
            </div>
          </div>
        </div>
        <HotelList />
        <TransactionHistory />
        <StatusHistory />
      </div>
      <Modal id={`hle_modal`}>
        <HotelLimitEdit />
      </Modal>
    </>
  );
};

export default AdminOwnerView;
