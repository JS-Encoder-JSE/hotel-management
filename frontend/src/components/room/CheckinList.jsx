import React, { useEffect, useState } from "react";
import { FaDoorOpen, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { MdOutlineCancel, MdOutlineHail } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";
import EditBooking from "./EditBooking.jsx";
import { useUpdateBookingMutation } from "../../redux/room/roomAPI.js";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import CheckInModal from "../../pages/room/CheckInModal.jsx";
import CheckInDyn from "../../pages/room/CheckInDyn.jsx";
import { GiDoorHandle } from "react-icons/gi";
import { FaRegEdit } from "react-icons/fa";
import { BiSolidDoorOpen } from "react-icons/bi";

const CheckinList = ({ checkinList, page, handlePageClick }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("checkinList", checkinList);
  //   const [updateBooking, { isLoading: isCancelledLoading, error }] =
  //     useUpdateBookingMutation();
  //   // const [bookingPerPage] = useState(10);
  //   // const [pageCount, setPageCount] = useState(0);
  //   const handlePageClick = ({ selected: page }) => {
  //     setCurrentPage(page);
  //   };

  //   const handleDelete = (id) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "Booking will be Cancel.",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#35bef0",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, Cancel it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         Swal.fire({
  //           position: "center",
  //           icon: "success",
  //           title: "Deleted!",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         }).then(() => {
  //           updateBooking({ id, data: { status: "Canceled" } });
  //         });
  //       }
  //     });
  //   };

console.log(checkinList,"checkinglist form chekinpersioninfo")


//   const [updateBooking, { isLoading: isCancelledLoading, error }] =
//     useUpdateBookingMutation();
//   // const [bookingPerPage] = useState(10);
//   // const [pageCount, setPageCount] = useState(0);
//   const handlePageClick = ({ selected: page }) => {
//     setCurrentPage(page);
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Booking will be Cancel.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#35bef0",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Cancel it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Deleted!",
//           showConfirmButton: false,
//           timer: 1500,
//         }).then(() => {
//           updateBooking({ id, data: { status: "Canceled" } });
//         });
//       }
//     });
//   };

//   const [editBookedData, setEditBookedData] = useState(null);

//   useEffect(() => {
//     if (data && modalOpen) {
//       window.ci_modal.showModal();
//       setModalOpen(false);
//     }
//   }, [modalOpen]);
if(!checkinList){
    return <p>Loading</p>
}

  return (
    <div>
      <div className="overflow-x-auto border">
        <table className="table">
          <thead>
            <tr className={`text-lg`}>
              <th>
                Guest <br /> Name
              </th>
              <th>
                Room <br />
                Number
              </th>
              <th>
                Phone <br />
                Number
              </th>
              {/* <th>Booking <br />Date
              </th> */}
              <th>From</th>
              <th>To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
        {checkinList?.map((item,idx)=>{
            return (
                <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{item.guestName}</div>
                        {/* <div className="text-sm opacity-50">
                          Rooms: {item?.room_ids?.map((i) => i.roomNumber)}
                        </div> */}
                      </div>
                    </div>
                  </td>
                  <td>{item?.room_id?.roomNumber}</td>
                  <td>{item?.mobileNumber}</td>
                  {/* <td>{item?.paid_amount}</td> */}
                  {/* <td>{new Date(item?.createdAt).toLocaleString()}</td> */}
                  <td>{new Date(item?.from).toLocaleString()}</td>
                  <td>{new Date(item?.to).toLocaleString()}</td>

                  <td className={`flex flex-wrap gap-1.5`}>
                    <span
                      className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                      title={`View`}
                      onClick={() => navigate(`${item._id}`)}
                    >
                      <FaEye />
                    </span>

                    <Link
                      onClick={()=> navigate(`/dashboard/checkout?room=${item?.room_id?._id}`)}
                      className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                    >
                      <MdOutlineHail />
                    </Link>
                    <span
                      className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                    >
                      <FaEdit />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
          pageCount={page}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          renderOnZeroPageCount={null}
        />
      </div>
      {/* <Modal id={`eb_modal`}>
        {editBookedData && <EditBooking data={editBookedData} />}
      </Modal>
      <Modal id={`ci_modal`}>
        <CheckInDyn data={data} />
      </Modal> */}
    </div>
  );
};

export default CheckinList;
