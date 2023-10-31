import React, { useState } from "react";
import { useFormik } from "formik";
import RoomLists from "../../components/room/RoomLists.jsx";
import { FaSearch } from "react-icons/fa";
import { useRoomsQuery } from "../../redux/room/roomAPI.js";
import { Rings } from "react-loader-spinner";

const ManageRoom = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, data: rooms } = useRoomsQuery(currentPage);

  const formik = useFormik({
    initialValues: {
      filter: "",
      search: "",
    },
  });
  console.log(rooms);
  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl mx-10`}>
      <div className={`flex justify-between gap-4`}>
        <div>
          <select
            name="filter"
            className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.filter}
            onChange={formik.handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="deactive">deActive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div className={`relative sm:min-w-[20rem]`}>
          <input
            type="text"
            placeholder="Search by name..."
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
      {!isLoading ? (
        <RoomLists setCurrentPage={setCurrentPage} rooms={rooms} />
      ) : (
        <Rings
          width="50"
          height="50"
          color="#37a000"
          wrapperClass="justify-center"
        />
      )}
    </div>
  );
};

export default ManageRoom;
