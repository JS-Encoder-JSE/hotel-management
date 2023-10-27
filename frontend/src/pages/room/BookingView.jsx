import React from "react";
import { FaArrowLeft, FaDoorOpen, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EditBooking from "../../components/room/EditBooking.jsx";
import Modal from "../../components/Modal.jsx";

const BookingView = () => {
  const navigate = useNavigate();

  return (
    <div className={`bg-white p-10 rounded-2xl space-y-8`}>
      <div className={`space-x-1.5`}>
        <div
          className={`inline-flex bg-green-slimy text-white border border-green-slimy items-center space-x-1.5 hover:bg-transparent hover:text-green-slimy cursor-pointer px-3 py-1 rounded transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </div>
        <span
          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
          title={`Check In`}
        >
          <FaDoorOpen />
        </span>
        <span
          className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
          title={`Edit`}
          onClick={() => window.eb_modal.showModal()}
        >
          <FaEdit />
        </span>
      </div>
      <div className={`flex flex-col lg:flex-row gap-10`}>
        <div>
          <h3 className={`text-2xl font-semibold mb-3`}>
            Customer Information
          </h3>
          <table>
            <tbody>
              <tr>
                <th className={`text-start`}>Name:</th>
                <td>S.M. Khalid Mahmud</td>
              </tr>
              <tr>
                <th className={`text-start`}>Phone:</th>
                <td>01715738573</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className={`text-2xl font-semibold mb-3`}>Booking Information</h3>
          <table>
            <tbody>
              <tr>
                <th className={`text-start`}>Booking No:</th>
                <td>1</td>
              </tr>
              <tr>
                <th className={`text-start`}>Booking Date:</th>
                <td>10.10.23 10:12:34</td>
              </tr>
              <tr>
                <th className={`text-start`}>Room No:</th>
                <td>1</td>
              </tr>
              <tr>
                <th className={`text-start`}>Check In:</th>
                <td>10.10.23 10:12:34</td>
              </tr>
              <tr>
                <th className={`text-start`}>Check Out:</th>
                <td>10.10.23 10:12:34</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Modal id={`eb_modal`}>
        <EditBooking />
      </Modal>
    </div>
  );
};

export default BookingView;
