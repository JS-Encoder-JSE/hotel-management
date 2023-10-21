import React from "react";
import { useFormik } from "formik";
import RoomLists from "../../components/room/RoomLists.jsx";
import BookingLists from "../../components/room/BookingLists.jsx";
import { FaPlus, FaTrash } from "react-icons/fa";

const ManageBooking = () => {
  const formik = useFormik({
    initialValues: {
      filter: "",
      search: "",
    },
  });

  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl mx-10`}>
      <div className={`flex justify-end gap-1.5`}>
        <button
          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
        >
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="Search by room number..."
          name="search"
          className="input input-sm input-bordered border-green-slimy rounded focus:outline-none"
          value={formik.values.search}
          onChange={formik.handleChange}
        />
      </div>
      <BookingLists />
    </div>
  );
};

export default ManageBooking;
