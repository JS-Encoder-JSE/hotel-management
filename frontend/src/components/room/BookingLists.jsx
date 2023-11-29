import React, { useEffect, useState } from "react";
import { FaDoorOpen, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";
import EditBooking from "./EditBooking.jsx";
import { useCancelBookingMutation, useUpdateBookingMutation } from "../../redux/room/roomAPI.js";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import CheckInModal from "../../pages/room/CheckInModal.jsx";
import CheckInDyn from "../../pages/room/CheckInDyn.jsx";

const BookingLists = ({ bookingList, setCurrentPage }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateBooking, { isLoading: isCancelledLoading, error }] =
    useUpdateBookingMutation();
    const [cancelBooking]=useCancelBookingMutation()
  // const [bookingPerPage] = useState(10);
  // const [pageCount, setPageCount] = useState(0);
  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Booking will be Cancel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#35bef0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Canceled!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          updateBooking({ id, data: { status: "Canceled" } });
        });
      }
    });
  };

  const [editBookedData, setEditBookedData] = useState(null);

  useEffect(() => {
    if (data && modalOpen) {
      window.ci_modal.showModal();
      setModalOpen(false);
    }
  }, [modalOpen]);

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
                Room <br /> Number
              </th>
              <th>Phone <br />Number</th>
              <th>
                Booking <br /> Date
              </th>
              <th>From</th>
              <th>To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookingList?.data.docs.map((item, idx) => {
              return (
                <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{item.guestName}</div>
                        <div className="text-sm opacity-50">
                          Rooms: {item.room_ids?.map((i) => i.roomNumber)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td> {item?.room_id?.roomNumber}</td>
                  <td>{item?.mobileNumber}</td>
                  {/* <td>{item?.paid_amount}</td> */}
                  <td>{new Date(item?.createdAt).toLocaleString()}</td>
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
                    {/* <span
                      className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                      title={`chekin`}
                    
                    >
                      <FaDoorOpen />
                    </span> */}
                    <span>
                      <button
                        title={`Check In`}
                        className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                        onClick={() => {
                          setData(item);
                          setModalOpen(true);
                        }}
                      >
                        <FaDoorOpen />
                      </button>
                    </span>
                    <span
                      className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                      title={`Edit`}
                      onClick={() => {
                        setEditBookedData(item);
                        window.eb_modal.showModal();
                      }}
                    >
                      <FaEdit />
                    </span>
                    <button
                      onClick={() => {
                        handleDelete(item?._id);
                      }}
                      className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
                      title={`Cancel`}
                    >
                      <MdOutlineCancel className="text-[17px]" />
                    </button>
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
          pageCount={bookingList?.data?.totalPages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          renderOnZeroPageCount={null}
        />
      </div>
      <Modal id={`eb_modal`}>
        {editBookedData && <EditBooking data={editBookedData} />}
      </Modal>
      <Modal id={`ci_modal`}>
        <CheckInDyn data={data} />
      </Modal>
    </div>
  );
};

export default BookingLists;
