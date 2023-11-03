import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import OwnerSettings from "./OwnerSettings.jsx";
import Modal from "../Modal.jsx";
import HotelLimitEdit from "../../pages/Admin/HotelLimitEdit.jsx";

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
      </div>

      {/*owner Table start */}

      <div className="card w-full bg-white shadow-xl mt-10">
        <div className="card-body">
          <h1 className="text-2xl text-center ">Hotel List</h1>
          <div className="overflow-x-auto mt-10">
            <table className="table border">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Hotel Name</th>
                  <th>Hotel Email</th>
                  <th>Action</th>
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
                      <td>jondoe@gmail.com</td>
                      <td className={`space-x-1.5`}>
                        <span
                          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                          onClick={() =>
                            navigate(`/dashboard/adminowner-view/${idx}`)
                          }
                        >
                          <FaEye />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center mt-10">
              <ReactPaginate
                containerClassName="join rounded-none"
                pageLinkClassName="join-item btn btn-md bg-transparent"
                activeLinkClassName="btn-active !bg-green-slimy text-white"
                disabledLinkClassName="btn-disabled"
                previousLinkClassName="join-item btn btn-md bg-transparent"
                nextLinkClassName="join-item btn btn-md bg-transparent"
                breakLinkClassName="join-item btn btn-md bg-transparent"
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>

      {/*owner Table End */}

      {/*transaction Table start */}

      <div className="card w-full bg-white shadow-xl mt-10">
        <div className="card-body">
          <h1 className="text-2xl text-center ">Transaction History</h1>
          <div className="overflow-x-auto mt-10">
            <table className="table border">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Date</th>
                  <th>Transaction Id</th>
                  <th>Payment Method</th>
                  <th>License Duration</th>
                  <th>Amount</th>
                  <th>Payment For</th>
                  {/*<th>Action</th>*/}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{new Date().toLocaleDateString()}</td>
                      <td>DSER-HGYT-GHTY-54564</td>
                      <td>Cash</td>
                      <td>{new Date().toLocaleDateString()} - {new Date().toLocaleDateString()}</td>
                      <td>25000</td>
                      <td>Renew</td>
                      {/*<td className={`space-x-1.5`}>*/}
                      {/*  <span*/}
                      {/*    className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}*/}
                      {/*    onClick={() =>*/}
                      {/*      navigate(`/dashboard/adminowner-view/${idx}`)*/}
                      {/*    }*/}
                      {/*  >*/}
                      {/*    <FaEye />*/}
                      {/*  </span>*/}
                      {/*</td>*/}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center mt-10">
              <ReactPaginate
                containerClassName="join rounded-none"
                pageLinkClassName="join-item btn btn-md bg-transparent"
                activeLinkClassName="btn-active !bg-green-slimy text-white"
                disabledLinkClassName="btn-disabled"
                previousLinkClassName="join-item btn btn-md bg-transparent"
                nextLinkClassName="join-item btn btn-md bg-transparent"
                breakLinkClassName="join-item btn btn-md bg-transparent"
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>

      {/*transaction Table End */}

      {/*consider Table start */}

      <div className="card w-full bg-white shadow-xl mt-10">
        <div className="card-body">
          <h1 className="text-2xl text-center ">Status History</h1>
          <div className="overflow-x-auto mt-10">
            <table className="table border">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Date</th>
                  <th>License Duration</th>
                  <th>Previous Status</th>
                  <th>Updated Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th> {++idx}</th>
                      <td>{new Date().toLocaleDateString()}</td>
                      <td>{new Date().toLocaleDateString()} - {new Date().toLocaleDateString()}</td>
                      <td>Active</td>
                      <td>Suspend</td>
                      <td>Consider 7 days</td>
                      {/*<td className={`space-x-1.5`}>*/}
                      {/*  <span*/}
                      {/*    className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}*/}
                      {/*    onClick={() =>*/}
                      {/*      navigate(`/dashboard/adminowner-view/${idx}`)*/}
                      {/*    }*/}
                      {/*  >*/}
                      {/*    <FaEye />*/}
                      {/*  </span>*/}
                      {/*</td>*/}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center mt-10">
              <ReactPaginate
                containerClassName="join rounded-none"
                pageLinkClassName="join-item btn btn-md bg-transparent"
                activeLinkClassName="btn-active !bg-green-slimy text-white"
                disabledLinkClassName="btn-disabled"
                previousLinkClassName="join-item btn btn-md bg-transparent"
                nextLinkClassName="join-item btn btn-md bg-transparent"
                breakLinkClassName="join-item btn btn-md bg-transparent"
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal id={`hle_modal`}>
        <HotelLimitEdit />
      </Modal>
      {/*consider Table End */}
    </>
  );
};

export default AdminOwnerView;
