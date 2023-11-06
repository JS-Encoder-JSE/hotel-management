import React from "react";
import { useFormik } from "formik";
// import BookingLists from "../../components/room/BookingLists.jsx";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal.jsx";
// import AddBooking from "../../components/room/AddBooking.jsx";
import AddBookingSwimming from "../../components/LifeStyle/AddBookingSwimming.jsx";
import SwimmingLists from "../../components/LifeStyle/SwimmingLists.jsx";

const SwimmingBooking = () => {
  const formik = useFormik({
    initialValues: {
      filter: "",
      search: "",
    },
  });

  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl`}>
      <div className={`flex justify-end gap-4`}>
        {/* <div>
          <select
            name="filter"
            className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.filter}
            onChange={formik.handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">InActive</option>
            <option value="booked">Booked</option>
          </select>
        </div> */}
        <div className={`flex gap-1.5 `}>
          <button
            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
            onClick={() => window.ab_modal.showModal()}
          >
            <FaPlus />
            <span>Swimming Pool Booking</span>
          </button>
          <div className={`relative sm:min-w-[20rem]`}>
            <input
              type="text"
              placeholder="Search by phone number..."
              name="search"
              className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
              value={formik.values.search}
              onChange={formik.handleChange}
            />
            <button
              type="button"
              className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <SwimmingLists />
      <Modal id={`ab_modal`}>
        <AddBookingSwimming />
      </Modal>
    </div>
  );
};

export default SwimmingBooking;
