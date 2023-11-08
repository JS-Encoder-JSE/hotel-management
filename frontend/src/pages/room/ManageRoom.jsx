import React, { useState } from "react";
import { useFormik } from "formik";
import RoomLists from "../../components/room/RoomLists.jsx";
import { FaSearch } from "react-icons/fa";
import { useRoomsQuery } from "../../redux/room/roomAPI.js";
import { Rings } from "react-loader-spinner";
import { useSelector } from "react-redux";

const ManageRoom = () => {
  const { user } = useSelector((store) => store.authSlice);
  const [keyword, setKeyword] = useState(null);
  const formik = useFormik({
    initialValues: {
      filter: "",
      search: "",
    },
    onSubmit: (values) => {
      setKeyword(values.search);
    },
  });

  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, data: rooms } = useRoomsQuery({
    id: user?.assignedHotel,
    cp: currentPage,
    filter: formik.values.filter,
    search: keyword,
  });

  const pressEnter = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      formik.handleSubmit();
    }
  };

  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl mx-10`}>
      <div className={`flex justify-between gap-4`}>
        <div>
          <select
            name="filter"
            className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
            value={formik.values.filter}
            onChange={formik.handleChange}
          >
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="CheckedIn">Checked In</option>
          </select>
        </div>
        <div className={`relative sm:min-w-[20rem]`}>
          <input
            type="text"
            placeholder="Search by room number..."
            name="search"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.search}
            onChange={formik.handleChange}
            onKeyUp={(e) => {
              e.target.value === "" ? formik.handleSubmit() : null;
            }}
            onKeyDown={(e) => pressEnter(e)}
          />
          <button
            type="button"
            className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            onClick={() => formik.handleSubmit()}
          >
            <FaSearch />
          </button>
        </div>
      </div>
      {!isLoading ? (
        rooms?.data?.docs?.length ? (
          <RoomLists setCurrentPage={setCurrentPage} rooms={rooms} />
        ) : (
          <h3>No data!</h3>
        )
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
