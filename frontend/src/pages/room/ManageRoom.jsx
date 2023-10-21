import React from "react";
import { useFormik } from "formik";
import RoomLists from "../../components/room/RoomLists.jsx";

const ManageRoom = () => {
  const formik = useFormik({
    initialValues: {
      filter: "",
      search: ""
    }
  });

  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl mx-10`}>
      <div
        className={`flex flex-col-reverse sm:flex-row gap-3 sm:justify-between`}
      >
        <div className="flex flex-col gap-3">
          <select
            name="filter"
            className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
            value={formik.values.filter}
            onChange={formik.handleChange}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by room number..."
            name="search"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.search}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <RoomLists />
    </div>
  );
};

export default ManageRoom;
